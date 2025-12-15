use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct BookChapterData {
    #[serde(serialize_with = "uuid::serde::simple::serialize")]
    pub(crate) id: Uuid,
    pub(crate) title: String,
}

impl BookChapterData {
    pub fn new(id: Uuid, title: &str) -> Self {
        Self {
            id,
            title: title.into(),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct BookManifest {
    #[serde(serialize_with = "uuid::serde::simple::serialize")]
    id: Uuid,
    chapters: Vec<BookChapterData>,
    #[serde(with = "chrono::serde::ts_seconds")]
    created_at: DateTime<Utc>,
    #[serde(with = "chrono::serde::ts_seconds")]
    modified_at: DateTime<Utc>,
}

impl BookManifest {
    pub fn new(id: Uuid) -> Self {
        let now = Utc::now();
        Self {
            id,
            chapters: Default::default(),
            created_at: now,
            modified_at: now,
        }
    }

    pub fn chapters(&self) -> &Vec<BookChapterData> {
        &self.chapters
    }

    pub fn set_chapters(&mut self, chapters: Vec<BookChapterData>) {
        self.chapters = chapters;
        self.modified_at = Utc::now();
    }

    pub fn add_chapter(&mut self, id: Uuid, title: &str) {
        let chapter = BookChapterData::new(id, title);
        if self.chapters.iter().any(|chapter| chapter.id == id) {
            self.update_chapter(chapter);
        } else {
            self.chapters.push(chapter);
            self.modified_at = Utc::now();
        }
    }

    pub fn update_chapter(&mut self, data: BookChapterData) {
        if let Some(chapter) = self
            .chapters
            .iter_mut()
            .find(|chapter| chapter.id == data.id)
            .filter(|chapter| chapter.title != data.title)
        {
            chapter.title = data.title;
            self.modified_at = Utc::now();
        } else {
            self.add_chapter(data.id, &data.title);
        }
    }

    pub fn remove_chapter(&mut self, id: Uuid) {
        self.chapters.retain(|chapter| chapter.id != id);
        self.modified_at = Utc::now();
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct BooksManifest {
    books: Vec<BookChapterData>,
    #[serde(with = "chrono::serde::ts_seconds")]
    created_at: DateTime<Utc>,
    #[serde(with = "chrono::serde::ts_seconds")]
    modified_at: DateTime<Utc>,
}

impl BooksManifest {
    pub fn books(&self) -> &Vec<BookChapterData> {
        &self.books
    }

    pub fn set_books(&mut self, books: Vec<BookChapterData>) {
        self.books = books;
        self.modified_at = Utc::now();
    }

    pub fn add_book(&mut self, id: Uuid, title: &str) {
        let book = BookChapterData::new(id, title);
        if self.books.iter().any(|book| book.id == id) {
            self.update_book(book);
        } else {
            self.books.push(book);
            self.modified_at = Utc::now();
        }
    }

    pub fn update_book(&mut self, data: BookChapterData) {
        if let Some(book) = self
            .books
            .iter_mut()
            .find(|book| book.id == data.id)
            .filter(|book| book.title != data.title)
        {
            book.title = data.title;
            self.modified_at = Utc::now();
        } else {
            self.add_book(data.id, &data.title);
        }
    }

    pub fn remove_book(&mut self, id: Uuid) {
        self.books.retain(|book| book.id != id);
        self.modified_at = Utc::now();
    }
}

impl Default for BooksManifest {
    fn default() -> Self {
        let now = Utc::now();
        Self {
            books: Default::default(),
            created_at: now,
            modified_at: now,
        }
    }
}
