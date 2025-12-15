use std::{
    fs,
    path::{Path, PathBuf},
};

use semver::Version;

use crate::{
    constants::{SCHEMA_VERSION, VERSION_FILE},
    error::KosmosResult,
    file::write_atomic_data,
};

pub struct VersionService {
    version: Version,
    file: PathBuf,
}

impl VersionService {
    pub fn version(&self) -> &Version {
        &self.version
    }

    pub fn update_data(&mut self, version: Version) -> KosmosResult<&Version> {
        write_atomic_data(&self.file, version.to_string())?;
        self.version = version;
        Ok(self.version())
    }

    pub fn set_path<P: AsRef<Path>>(&mut self, path: P) -> KosmosResult<()> {
        let path = path.as_ref();
        fs::create_dir_all(path)?;

        self.file = path.join(VERSION_FILE);
        if !self.file.exists() {
            fs::write(&self.file, self.version.to_string())?;
        } else {
            let data = fs::read_to_string(&self.file)?;
            self.version = Version::parse(&data)?;
        }

        Ok(())
    }
}

impl Default for VersionService {
    fn default() -> Self {
        Self {
            version: SCHEMA_VERSION,
            file: Default::default(),
        }
    }
}
