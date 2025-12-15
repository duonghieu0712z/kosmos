use std::{fs, path::Path};

use uuid::Uuid;

use crate::{error::KosmosResult, json::Json};

pub trait JsonFile: Json {
    #[inline]
    fn read_json<P: AsRef<Path>>(path: P) -> KosmosResult<Self> {
        let data = fs::read_to_string(path.as_ref())?;
        Ok(Self::from_json(&data)?)
    }

    #[inline]
    fn write_json<P: AsRef<Path>>(&self, path: P) -> KosmosResult<()> {
        let data = self.to_json()?;
        write_atomic_data(path, data)
    }
}

impl<T: Json> JsonFile for T {}

pub fn write_atomic_data<P: AsRef<Path>, D: AsRef<[u8]>>(file: P, data: D) -> KosmosResult<()> {
    let parent = file.as_ref().parent().unwrap_or_else(|| Path::new("."));
    let tmp_file = parent.join(format!(".{}.tmp", Uuid::now_v7().simple()));

    fs::write(&tmp_file, data)?;
    if let Err(err) = fs::rename(&tmp_file, file) {
        fs::remove_file(&tmp_file)?;
        return Err(err.into());
    }

    Ok(())
}
