use std::path::{Path, PathBuf};

use crate::{
    cache::{CacheData, CacheService},
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

    pub fn data(&self) -> &CacheData {
        self.service.data()
    }
}
