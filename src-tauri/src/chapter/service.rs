use std::{
    collections::HashMap,
    fs,
    path::{Path, PathBuf},
};

use uuid::Uuid;

use crate::{
    constants::{CHAPTERS_DIR, DOCUMENT_FILE, METADATA_FILE},
    error::{KosmosError, KosmosResult},
    file::{JsonFile, write_atomic_data},
};

use super::ChapterData;

#[derive(Default)]
pub struct ChaptersService {
    chapters: HashMap<Uuid, (ChapterData, String)>,
    path: PathBuf,
}

impl ChaptersService {
    pub fn chapter(&mut self, id: &Uuid) -> KosmosResult<&ChapterData> {
        if self.chapters.contains_key(id) {
            return Ok(&self.chapters[id].0);
        }
        Ok(&self.load_chapter(id)?.0)
    }

    fn load_chapter(&mut self, id: &Uuid) -> KosmosResult<&(ChapterData, String)> {
        let path = self.path(id);
        if !path.exists() {
            return Err(KosmosError::NotFound(format!(
                "Cannot open chapter because its directory does not exist for id: {}",
                id.simple()
            )));
        }

        let data_file = path.join(METADATA_FILE);
        if !data_file.exists() {
            return Err(KosmosError::NotFound(format!(
                "Cannot open chapter because its metadata file does not exist for id: {}",
                data_file.display()
            )));
        }

        let document_file = path.join(DOCUMENT_FILE);
        if !document_file.exists() {
            return Err(KosmosError::NotFound(format!(
                "Cannot open chapter because its document file does not exist for id: {}",
                document_file.display()
            )));
        }

        let data = ChapterData::read_json(&data_file)?;
        let document = fs::read_to_string(&document_file)?;
        self.chapters.insert(*id, (data, document));

        Ok(&self.chapters[id])
    }

    pub fn create_chapter(&mut self, title: &str, book_id: &Uuid) -> KosmosResult<&ChapterData> {
        let data = ChapterData::new(title, *book_id);
        let id = data.id;
        let document = String::new();
        self.chapters.insert(id, (data, document));
        self.save_chapter(&id)?;

        self.chapter(&id)
    }

    fn save_chapter(&mut self, id: &Uuid) -> KosmosResult<()> {
        let path = self.path(id);
        fs::create_dir_all(&path)?;

        let data_file = path.join(METADATA_FILE);
        self.chapter(id)?.write_json(&data_file)?;

        let document = self.document(id)?;
        let document_file = path.join(DOCUMENT_FILE);
        fs::write(&document_file, document)?;

        Ok(())
    }

    pub fn update_chapter(&mut self, data: ChapterData) -> KosmosResult<&ChapterData> {
        let id: Uuid = data.id;
        let data_file = self.path(&id).join(METADATA_FILE);
        if let Some(chapter) = self.chapters.get_mut(&id) {
            let mut new_data = chapter.0.clone();
            new_data.update(data)?;
            new_data.write_json(&data_file)?;
            chapter.0 = new_data;
        }

        self.chapter(&id)
    }

    pub fn delete_chapter(&mut self, id: &Uuid) -> KosmosResult<()> {
        let path = self.path(id);
        fs::remove_dir_all(&path)?;
        self.chapters.remove(id);

        Ok(())
    }

    pub fn document(&mut self, id: &Uuid) -> KosmosResult<&str> {
        if self.chapters.contains_key(id) {
            return Ok(&self.chapters[id].1);
        }
        Ok(&self.load_chapter(id)?.1)
    }

    pub fn update_document(&mut self, id: &Uuid, document: &str) -> KosmosResult<&str> {
        let document_file = self.path(id).join(DOCUMENT_FILE);
        if let Some(chapter) = self.chapters.get_mut(id) {
            write_atomic_data(&document_file, document)?;
            chapter.1 = document.into();
        }

        Ok(&self.chapters[id].1)
    }

    pub fn path(&self, id: &Uuid) -> PathBuf {
        self.path.join(id.simple().to_string())
    }

    pub fn set_path<P: AsRef<Path>>(&mut self, path: P) -> KosmosResult<()> {
        self.path = path.as_ref().join(CHAPTERS_DIR);
        fs::create_dir_all(&self.path)?;
        Ok(())
    }
}
