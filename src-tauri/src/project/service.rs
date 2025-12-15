use std::{
    fs,
    path::{Path, PathBuf},
};

use crate::{constants::PROJECT_FILE, error::KosmosResult, file::JsonFile};

use super::ProjectData;

#[derive(Default)]
pub struct ProjectService {
    data: ProjectData,
    file: PathBuf,
}

impl ProjectService {
    pub fn data(&self) -> &ProjectData {
        &self.data
    }

    pub fn update_data(&mut self, data: ProjectData) -> KosmosResult<&ProjectData> {
        let mut new_data = self.data.clone();
        new_data.update(data)?;
        new_data.write_json(&self.file)?;
        self.data = new_data;
        Ok(self.data())
    }

    pub fn set_path<P: AsRef<Path>>(&mut self, path: P) -> KosmosResult<()> {
        let path = path.as_ref();
        fs::create_dir_all(path)?;

        self.file = path.join(PROJECT_FILE);
        if !self.file.exists() {
            self.data.write_json(&self.file)?;
        } else {
            self.data = ProjectData::read_json(&self.file)?;
        }

        Ok(())
    }
}
