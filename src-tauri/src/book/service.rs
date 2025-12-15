use std::{
    collections::HashMap,
    fs,
    path::{Path, PathBuf},
};

use uuid::Uuid;

use crate::{
    constants::{BOOKS_DIR, MANIFEST_FILE, METADATA_FILE},
    error::{KosmosError, KosmosResult},
    file::JsonFile,
};

use super::{BookChapterData, BookData, BookManifest, BooksManifest};

#[derive(Default)]
pub struct BooksService {
    books: HashMap<Uuid, (BookData, BookManifest)>,
    manifest: BooksManifest,

    path: PathBuf,
    file: PathBuf,
}

impl BooksService {
    pub fn books(&self) -> &Vec<BookChapterData> {
        &self.manifest.books()
    }

    pub fn set_books(
        &mut self,
        books: Vec<BookChapterData>,
    ) -> KosmosResult<&Vec<BookChapterData>> {
        let mut new_manifest = self.manifest.clone();
        new_manifest.set_books(books);
        new_manifest.write_json(&self.file)?;
        self.manifest = new_manifest;
        Ok(self.books())
    }

    pub fn book(&mut self, id: &Uuid) -> KosmosResult<&BookData> {
        if self.books.contains_key(id) {
            return Ok(&self.books[id].0);
        }
        Ok(&self.load_book(id)?.0)
    }

    fn load_book(&mut self, id: &Uuid) -> KosmosResult<&(BookData, BookManifest)> {
        let path = self.path(id);
        if !path.exists() {
            return Err(KosmosError::NotFound(format!(
                "Cannot open book because its directory does not exist for id: {}",
                id.simple()
            )));
        }

        let data_file = path.join(METADATA_FILE);
        if !data_file.exists() {
            return Err(KosmosError::NotFound(format!(
                "Cannot open book because its metadata file does not exist for id: {}",
                data_file.display()
            )));
        }

        let manifest_file = path.join(MANIFEST_FILE);
        if !manifest_file.exists() {
            return Err(KosmosError::NotFound(format!(
                "Cannot open book because its manifest file does not exist for id: {}",
                manifest_file.display()
            )));
        }

        let data = BookData::read_json(&data_file)?;
        let manifest = BookManifest::read_json(&manifest_file)?;
        self.books.insert(*id, (data, manifest));

        Ok(&self.books[id])
    }

    pub fn create_book(&mut self, title: &str) -> KosmosResult<&BookData> {
        let data = BookData::new(title);
        let id = data.id;
        let manifest = BookManifest::new(id);
        self.books.insert(id, (data, manifest));
        self.save_book(&id)?;

        let mut new_manifest = self.manifest.clone();
        new_manifest.add_book(id, title);
        new_manifest.write_json(&self.file)?;
        self.manifest = new_manifest;

        self.book(&id)
    }

    fn save_book(&mut self, id: &Uuid) -> KosmosResult<()> {
        let path = self.path(id);
        fs::create_dir_all(&path)?;

        let data_file = path.join(METADATA_FILE);
        self.book(id)?.write_json(&data_file)?;

        let manifest_file = path.join(MANIFEST_FILE);
        self.books[id].1.write_json(&manifest_file)?;

        Ok(())
    }

    pub fn update_book(&mut self, data: BookData) -> KosmosResult<&BookData> {
        let id = data.id;
        let title = data.title.clone();

        let data_file = self.path(&id).join(METADATA_FILE);
        if let Some(book) = self.books.get_mut(&id) {
            let mut new_data = book.0.clone();
            new_data.update(data)?;
            new_data.write_json(&data_file)?;
            book.0 = new_data;
        }

        let mut new_manifest = self.manifest.clone();
        new_manifest.update_book(BookChapterData::new(id, &title));
        new_manifest.write_json(&self.file)?;
        self.manifest = new_manifest;

        self.book(&id)
    }

    pub fn delete_book(&mut self, id: &Uuid) -> KosmosResult<()> {
        let path = self.path(id);
        fs::remove_dir_all(&path)?;
        self.books.remove(id);

        let mut new_manifest = self.manifest.clone();
        new_manifest.remove_book(*id);
        new_manifest.write_json(&self.file)?;
        self.manifest = new_manifest;

        Ok(())
    }

    pub fn chapters(&mut self, id: &Uuid) -> KosmosResult<&Vec<BookChapterData>> {
        if self.books.contains_key(id) {
            return Ok(&self.books[id].1.chapters());
        }
        Ok(&self.load_book(id)?.1.chapters())
    }

    pub fn set_chapters(
        &mut self,
        id: &Uuid,
        chapters: Vec<BookChapterData>,
    ) -> KosmosResult<&Vec<BookChapterData>> {
        let manifest_file = self.path(id).join(MANIFEST_FILE);
        if let Some(book) = self.books.get_mut(id) {
            let mut new_manifest = book.1.clone();
            new_manifest.set_chapters(chapters);
            new_manifest.write_json(&manifest_file)?;
            book.1 = new_manifest;
        }

        self.chapters(id)
    }

    pub fn add_chapter(
        &mut self,
        id: &Uuid,
        chapter_id: &Uuid,
        title: &str,
    ) -> KosmosResult<&Vec<BookChapterData>> {
        let manifest_file = self.path(id).join(MANIFEST_FILE);
        if let Some(book) = self.books.get_mut(id) {
            let mut new_manifest = book.1.clone();
            new_manifest.add_chapter(*chapter_id, title);
            new_manifest.write_json(&manifest_file)?;
            book.1 = new_manifest;
        }

        self.chapters(id)
    }

    pub fn update_chapter(
        &mut self,
        id: &Uuid,
        data: BookChapterData,
    ) -> KosmosResult<&Vec<BookChapterData>> {
        let manifest_file = self.path(id).join(MANIFEST_FILE);
        if let Some(book) = self.books.get_mut(id) {
            let mut new_manifest = book.1.clone();
            new_manifest.update_chapter(data);
            new_manifest.write_json(&manifest_file)?;
            book.1 = new_manifest;
        }

        self.chapters(id)
    }

    pub fn delete_chapter(
        &mut self,
        id: &Uuid,
        chapter_id: &Uuid,
    ) -> KosmosResult<&Vec<BookChapterData>> {
        let manifest_file = self.path(id).join(MANIFEST_FILE);
        if let Some(book) = self.books.get_mut(id) {
            let mut new_manifest = book.1.clone();
            new_manifest.remove_chapter(*chapter_id);
            new_manifest.write_json(&manifest_file)?;
            book.1 = new_manifest;
        }

        self.chapters(id)
    }

    pub fn path(&self, id: &Uuid) -> PathBuf {
        self.path.join(id.simple().to_string())
    }

    pub fn set_path<P: AsRef<Path>>(&mut self, path: P) -> KosmosResult<()> {
        self.path = path.as_ref().join(BOOKS_DIR);
        fs::create_dir_all(&self.path)?;

        self.file = self.path.join(MANIFEST_FILE);
        if !self.file.exists() {
            self.manifest.write_json(&self.file)?;
        } else {
            self.manifest = BooksManifest::read_json(&self.file)?;
        }

        Ok(())
    }
}
