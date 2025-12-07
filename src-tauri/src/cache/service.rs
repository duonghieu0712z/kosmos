use std::path::PathBuf;

use tokio::fs::{read_to_string, write};

use crate::error::KosmosResult;

use super::data::CacheData;

#[allow(dead_code)]
pub struct CacheService {
    data: CacheData,
}

#[allow(dead_code)]
impl CacheService {
    pub async fn load(&mut self, path: &PathBuf) -> KosmosResult<()> {
        let data = read_to_string(path).await?;
        self.data = CacheData::from_json(&data)?;
        Ok(())
    }

    pub async fn save(&self, path: &PathBuf) -> KosmosResult<()> {
        let data = self.data.to_json()?;
        write(path, data).await?;
        Ok(())
    }

    pub fn data(&self) -> &CacheData {
        &self.data
    }

    pub fn data_mut(&mut self) -> &mut CacheData {
        &mut self.data
    }
}

impl Default for CacheService {
    fn default() -> Self {
        Self {
            data: Default::default(),
        }
    }
}
