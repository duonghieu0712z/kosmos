use std::path::{Path, PathBuf};

use crate::{
    cache::{CacheService, RecentProject},
    error::KosmosResult,
};

#[derive(Default)]
pub struct CacheManager {
    service: CacheService,
    cache_dir: PathBuf,
}

impl CacheManager {
    pub fn setup<P: AsRef<Path>>(&mut self, cache_dir: P) -> KosmosResult<()> {
        self.cache_dir = cache_dir.as_ref().to_path_buf();
        self.service.set_path(&self.cache_dir)
    }

    pub fn projects(&self) -> &Vec<RecentProject> {
        self.service.projects()
    }

    pub fn add_project(&mut self, name: &str, file: &str) -> KosmosResult<&Vec<RecentProject>> {
        self.service.add_project(name, file)
    }

    pub fn remove_project(&mut self, file: &str) -> KosmosResult<&Vec<RecentProject>> {
        self.service.remove_project(file)
    }
}
