use std::path::Path;

use tauri::{AppHandle, Manager};
use uuid::Uuid;

use crate::{
    book::{BookChapterData, BookData},
    cache::RecentProject,
    chapter::ChapterData,
    constants::{APP_EXTENSION, CACHE_DIR},
    error::KosmosResult,
    project::ProjectData,
};

use super::{cache::CacheManager, project::ProjectManager};

#[derive(Default)]
pub struct AppManager {
    cache_manager: CacheManager,
    project_manager: ProjectManager,
}

impl AppManager {
    pub fn new(handle: &AppHandle) -> KosmosResult<Self> {
        let cache_dir = handle.path().app_cache_dir()?.join(CACHE_DIR);

        let mut cache_manager = CacheManager::default();
        cache_manager.setup(&cache_dir)?;

        let mut project_manager = ProjectManager::default();
        project_manager.set_cache_dir(&cache_dir);

        Ok(Self {
            cache_manager,
            project_manager,
        })
    }

    pub fn create_project(&mut self, name: &str, path: &str) -> KosmosResult<&ProjectData> {
        let file = Path::new(path).join(format!("{}.{}", name, APP_EXTENSION));
        self.project_manager.create_project(&file)?;
        self.cache_manager
            .add_project(name, file.to_str().unwrap())?;

        let project = self.project_manager.project();
        Ok(project)
    }

    pub fn open_project(&mut self, file: &str) -> KosmosResult<&ProjectData> {
        self.project_manager.open_project(file)?;
        let name = self.project_manager.name();
        self.cache_manager.add_project(&name, file)?;

        let project = self.project_manager.project();
        Ok(project)
    }

    pub fn close_project(&mut self) -> KosmosResult<()> {
        self.project_manager.close_project()?;
        Ok(())
    }

    pub fn recent_projects(&self) -> &Vec<RecentProject> {
        self.cache_manager.projects()
    }

    pub fn books(&self) -> &Vec<BookChapterData> {
        self.project_manager.books()
    }

    pub fn book(&mut self, id: &Uuid) -> KosmosResult<&BookData> {
        self.project_manager.book(id)
    }

    pub fn chapters(&mut self, id: &Uuid) -> KosmosResult<&Vec<BookChapterData>> {
        self.project_manager.chapters(id)
    }

    pub fn chapter(&mut self, id: &Uuid) -> KosmosResult<&ChapterData> {
        self.project_manager.chapter(id)
    }
}
