use std::path::PathBuf;

use tauri::{AppHandle, Manager};
use tokio::fs::{File, create_dir_all, write};

use crate::{
    cache::{CacheData, CacheService},
    constants::{CACHE_FILE, CACHE_FOLDER},
    error::KosmosResult,
};

#[allow(dead_code)]
pub struct CacheManager {
    service: CacheService,
    path: PathBuf,
}

#[allow(dead_code)]
impl CacheManager {
    pub async fn new(handle: &AppHandle) -> KosmosResult<Self> {
        let path = handle.path().app_cache_dir()?.join(CACHE_FOLDER);
        if !path.exists() {
            create_dir_all(&path).await?;
        }

        let path = path.join(CACHE_FILE);
        if !path.exists() {
            File::create(&path).await?;
            write(&path, "{}").await?;
        }

        let mut service = CacheService::default();
        service.load(&path).await?;

        Ok(Self { service, path })
    }

    pub fn data(&self) -> &CacheData {
        self.service.data()
    }

    pub fn data_mut(&mut self) -> &mut CacheData {
        self.service.data_mut()
    }

    pub async fn save(&self) -> KosmosResult<()> {
        self.service.save(&self.path).await
    }
}
