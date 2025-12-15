use std::{
    fs,
    path::{Path, PathBuf},
};

use crate::{constants::CACHE_FILE, error::KosmosResult, file::JsonFile, project::ProjectCache};

use super::CacheData;

#[derive(Default)]
pub struct CacheService {
    data: CacheData,
    file: PathBuf,
}

impl CacheService {
    pub fn projects(&self) -> &Vec<ProjectCache> {
        &self.data.projects
    }

    pub fn add_project(&mut self, name: &str, file: &str) -> KosmosResult<&Vec<ProjectCache>> {
        let mut data = self.data.clone();
        data.add_project(name, file);
        data.write_json(&self.file)?;
        self.data = data;

        Ok(self.projects())
    }

    pub fn remove_project(&mut self, file: &str) -> KosmosResult<&Vec<ProjectCache>> {
        let mut data = self.data.clone();
        data.remove_project(file);
        data.write_json(&self.file)?;
        self.data = data;

        Ok(self.projects())
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
