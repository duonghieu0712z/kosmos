use std::{
    fs,
    path::{Path, PathBuf},
};

use crate::{constants::CACHE_FILE, error::KosmosResult, file::JsonFile};

use super::CacheData;

#[derive(Default)]
pub struct CacheService {
    data: CacheData,
    file: PathBuf,
}

impl CacheService {
    pub fn data(&self) -> &CacheData {
        &self.data
    }

    pub fn set_path<P: AsRef<Path>>(&mut self, path: P) -> KosmosResult<()> {
        let path = path.as_ref();
        fs::create_dir_all(path)?;

        self.file = path.join(CACHE_FILE);
        if !self.file.exists() {
            self.data.write_json(&self.file)?;
        } else {
            self.data = CacheData::read_json(&self.file)?;
        }

        Ok(())
    }
}
