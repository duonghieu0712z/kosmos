use std::{
    ffi::OsStr,
    fs,
    io::Write,
    path::{Path, PathBuf},
};

use tar::{Archive, Builder};
use uuid::Uuid;
use zstd::{Decoder, Encoder};

use crate::{
    book::{BookChapterData, BookData, BooksService},
    chapter::{ChapterData, ChaptersService},
    constants::{APP_EXTENSION, COMPRESS_LEVEL, SCHEMA_VERSION},
    error::{KosmosError, KosmosResult},
    project::{ProjectData, ProjectService},
    version::VersionService,
};

#[derive(Default)]
pub struct ProjectManager {
    version_service: VersionService,
    project_service: ProjectService,
    books_service: BooksService,
    chapters_service: ChaptersService,

    name: String,
    file: PathBuf,
    cache_project: PathBuf,
    cache_dir: PathBuf,
}

impl ProjectManager {
    pub fn create_project<P: AsRef<Path>>(&mut self, file: P) -> KosmosResult<()> {
        let file = file.as_ref();
        log::debug!("Creating project: {}", file.display());
        if file.is_file() {
            return Err(KosmosError::AlreadyExists(format!(
                "Cannot create new project file because it already exists: {}",
                file.display()
            )));
        }

        if file.extension() != Some(OsStr::new(APP_EXTENSION)) {
            return Err(KosmosError::Invalid(format!(
                "Invalid project file extension (expected .kosmos): {}",
                file.display()
            )));
        }

        let file_name = file.file_stem().ok_or_else(|| {
            KosmosError::Invalid(format!(
                "Invalid or missing project file name: {}",
                file.display()
            ))
        })?;

        self.cache_project = self
            .cache_dir
            .join(file_name)
            .join(Uuid::now_v7().simple().to_string());
        fs::create_dir_all(&self.cache_project)?;

        self.file = file.to_path_buf();
        self.name = file_name.to_os_string().into_string()?;

        self.reload_project()?;
        self.save_project()?;

        log::info!("Created project: {}", file.display());

        Ok(())
    }

    pub fn save_project(&mut self) -> KosmosResult<()> {
        log::debug!("Saving project: {}", self.file.display());

        if let Some(parent) = self.file.parent() {
            fs::create_dir_all(parent)?;
        }

        let parent = self.file.parent().unwrap_or_else(|| Path::new("."));
        let temp_name = format!(".{}.tmp", Uuid::now_v7().simple());
        let tmp_path = parent.join(temp_name);
        if tmp_path.exists() {
            fs::remove_file(&tmp_path)?;
        }

        let tmp_file = fs::File::create(&tmp_path)?;
        let encoder = Encoder::new(tmp_file, COMPRESS_LEVEL)?;
        let mut builder = Builder::new(encoder);
        builder.append_dir_all(".", &self.cache_project)?;

        let encoder = builder.into_inner()?;
        let mut tmp_file = encoder.finish()?;
        tmp_file.flush()?;
        tmp_file.sync_all()?;
        drop(tmp_file);

        if let Err(err) = fs::rename(&tmp_path, &self.file) {
            fs::remove_file(&tmp_path)?;
            return Err(err.into());
        }

        log::info!("Saved project: {}", self.file.display());

        Ok(())
    }

    pub fn open_project<P: AsRef<Path>>(&mut self, file: P) -> KosmosResult<()> {
        let file = file.as_ref();
        log::debug!("Opening project: {}", file.display());
        if !file.is_file() {
            return Err(KosmosError::NotFound(format!(
                "Project file not found or is not a valid file: {}",
                file.display()
            )));
        }

        if file.extension() != Some(OsStr::new(APP_EXTENSION)) {
            return Err(KosmosError::Invalid(format!(
                "Invalid project file extension (expected .kosmos): {}",
                file.display()
            )));
        }

        let file_name = file.file_stem().ok_or_else(|| {
            KosmosError::Invalid(format!(
                "Invalid or missing project file name: {}",
                file.display()
            ))
        })?;

        self.cache_project = self
            .cache_dir
            .join(file_name)
            .join(Uuid::now_v7().simple().to_string());
        fs::create_dir_all(&self.cache_project)?;

        self.file = file.to_path_buf();
        self.name = file_name.to_os_string().into_string()?;

        self.load_project()?;

        log::info!("Opened project: {}", file.display());

        Ok(())
    }

    pub fn load_project(&mut self) -> KosmosResult<()> {
        log::debug!("Loading project: {}", self.file.display());

        if self.cache_project.exists() {
            fs::remove_dir_all(&self.cache_project)?;
        }
        fs::create_dir_all(&self.cache_project)?;

        let file = fs::File::open(&self.file)?;
        let decoder = Decoder::new(file)?;
        let mut archive = Archive::new(decoder);
        archive.unpack(&self.cache_project)?;

        self.reload_project()?;

        log::info!("Loaded project: {}", self.file.display());

        Ok(())
    }

    pub fn reload_project(&mut self) -> KosmosResult<()> {
        log::debug!("Reloading project: {}", self.file.display());

        self.version_service = Default::default();
        self.version_service.set_path(&self.cache_project)?;
        let version = self.version_service.version();
        log::info!("Project version: {version}");
        if version != &SCHEMA_VERSION {
            // todo: migrate project, not yet implemented
            return Err(KosmosError::Invalid(format!(
                "Project schema version mismatch (expected {}, found {})",
                SCHEMA_VERSION, version,
            )));
        }

        self.project_service = Default::default();
        self.project_service.set_path(&self.cache_project)?;

        self.books_service = Default::default();
        self.books_service.set_path(&self.cache_project)?;

        self.chapters_service = Default::default();
        self.chapters_service.set_path(&self.cache_project)?;

        log::info!("Reloaded project: {}", self.file.display());

        Ok(())
    }

    pub fn delete_project(&mut self) -> KosmosResult<()> {
        log::debug!("Deleting project: {}", self.file.display());
        if self.file.exists() {
            fs::remove_file(&self.file)?;
            self.close_project()?;
        }
        log::info!("Deleted project: {}", self.file.display());
        Ok(())
    }

    pub fn close_project(&mut self) -> KosmosResult<()> {
        log::debug!("Closing project: {}", self.file.display());
        if self.cache_project.exists() {
            fs::remove_dir_all(&self.cache_project)?;

            self.version_service = Default::default();
            self.project_service = Default::default();
            self.books_service = Default::default();
            self.chapters_service = Default::default();

            self.file = Default::default();
            self.cache_project = Default::default();
        }
        log::info!("Closed project: {}", self.file.display());
        Ok(())
    }

    pub fn name(&self) -> String {
        self.name.clone()
    }

    pub fn set_cache_dir<P: AsRef<Path>>(&mut self, path: P) {
        self.cache_dir = path.as_ref().to_path_buf();
    }

    pub fn project(&self) -> &ProjectData {
        log::debug!("Getting project data");
        let project = self.project_service.data();
        log::info!("Got project data");
        project
    }

    pub fn update_project(&mut self, data: ProjectData) -> KosmosResult<&ProjectData> {
        log::debug!("Updating project data");
        let project = self.project_service.update_data(data)?;
        log::info!("Updated project data");
        Ok(project)
    }

    pub fn books(&self) -> &Vec<BookChapterData> {
        log::debug!("Getting list of books");
        let books = self.books_service.books();
        log::info!("Got list of books");
        books
    }

    pub fn update_books(
        &mut self,
        books: Vec<BookChapterData>,
    ) -> KosmosResult<&Vec<BookChapterData>> {
        log::debug!("Updating list of books");
        let books = self.books_service.set_books(books)?;
        log::info!("Updated list of books");
        Ok(books)
    }

    pub fn book(&mut self, id: &Uuid) -> KosmosResult<&BookData> {
        log::debug!("Getting book with {}", id.simple());
        let book = self.books_service.book(id)?;
        log::info!("Got book with {}", id.simple());
        Ok(book)
    }

    pub fn create_book(&mut self, title: &str) -> KosmosResult<&BookData> {
        log::debug!("Creating book: {title}");
        let book = self.books_service.create_book(title)?;
        log::info!("Created book: {title}");
        Ok(book)
    }

    pub fn update_book(&mut self, data: BookData) -> KosmosResult<&BookData> {
        let id = data.id;
        log::debug!("Updating book with {}", id.simple());
        let book = self.books_service.update_book(data)?;
        log::info!("Updated book with {}", id.simple());
        Ok(book)
    }

    pub fn delete_book(&mut self, id: &Uuid) -> KosmosResult<()> {
        log::debug!("Deleting book with {}", id.simple());
        self.books_service.delete_book(id)?;
        log::info!("Deleted book with {}", id.simple());
        Ok(())
    }

    pub fn chapters(&mut self, id: &Uuid) -> KosmosResult<&Vec<BookChapterData>> {
        log::debug!("Getting list of chapters for book with {}", id.simple());
        let chapters = self.books_service.chapters(id)?;
        log::info!("Got list of chapters for book with {}", id.simple());
        Ok(chapters)
    }

    pub fn update_chapters(
        &mut self,
        id: &Uuid,
        chapters: Vec<BookChapterData>,
    ) -> KosmosResult<&Vec<BookChapterData>> {
        log::debug!("Updating list of chapters for book with {}", id.simple());
        let chapters = self.books_service.set_chapters(id, chapters)?;
        log::info!("Updated list of chapters for book with {}", id.simple());
        Ok(chapters)
    }

    pub fn chapter(&mut self, id: &Uuid) -> KosmosResult<&ChapterData> {
        log::debug!("Getting chapter with {}", id.simple());
        let chapter = self.chapters_service.chapter(id)?;
        log::info!("Got chapter with {}", id.simple());
        Ok(chapter)
    }

    pub fn create_chapter(&mut self, title: &str, book_id: &Uuid) -> KosmosResult<&ChapterData> {
        log::debug!("Creating chapter: {title}");
        let chapter = self.chapters_service.create_chapter(title, book_id)?;
        self.books_service
            .add_chapter(book_id, &chapter.id, title)?;
        log::info!("Created chapter: {title}");
        Ok(chapter)
    }

    pub fn update_chapter(&mut self, data: ChapterData) -> KosmosResult<&ChapterData> {
        let id = data.id;
        let book_id = data.parent_id;
        let title = data.title.clone();
        log::debug!("Updating chapter with {}", id.simple());
        let chapter = self.chapters_service.update_chapter(data)?;
        self.books_service
            .update_chapter(&book_id, BookChapterData::new(id, &title))?;
        log::info!("Updated chapter with {}", id.simple());
        Ok(chapter)
    }

    pub fn delete_chapter(&mut self, id: &Uuid) -> KosmosResult<()> {
        log::debug!("Deleting chapter with {}", id.simple());
        let book_id = self.chapters_service.chapter(id)?.parent_id;
        self.chapters_service.delete_chapter(id)?;
        self.books_service.delete_chapter(&book_id, id)?;
        log::info!("Deleted chapter with {}", id.simple());
        Ok(())
    }

    pub fn chapter_document(&mut self, id: &Uuid) -> KosmosResult<&str> {
        log::debug!("Getting chapter document with {}", id.simple());
        let document = self.chapters_service.document(id)?;
        log::info!("Got chapter document with {}", id.simple());
        Ok(document)
    }

    pub fn update_chapter_document(&mut self, id: &Uuid, document: &str) -> KosmosResult<&str> {
        log::debug!("Updating chapter document with {}", id.simple());
        let document = self.chapters_service.update_document(id, document)?;
        log::info!("Updated chapter document with {}", id.simple());
        Ok(document)
    }
}
