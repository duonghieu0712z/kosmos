use std::fs;
use std::io;
use std::path::Path;

use chrono::{DateTime, Utc};
use semver::Version;
use serde::{Deserialize, Serialize};
use specta::Type;
use uuid::Uuid;
use zip::write::SimpleFileOptions;
use zip::{ZipArchive, ZipWriter};

use crate::constants::COMPRESSION_LEVEL;
use crate::error::KosmosResult;

#[derive(Debug, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct ProjectMetadata {
    #[specta(type = String)]
    #[serde(serialize_with = "uuid::serde::simple::serialize")]
    pub id: Uuid,
    pub name: String,
    pub schema_version: u32,
    #[specta(type = String)]
    pub app_version: Version,
    #[serde(with = "chrono::serde::ts_seconds")]
    #[specta(type = f64)]
    pub created_at: DateTime<Utc>,
    #[serde(with = "chrono::serde::ts_seconds")]
    #[specta(type = f64)]
    pub updated_at: DateTime<Utc>,
}

pub fn pack<P: AsRef<Path>>(source_dir: P, dest_file: P) -> KosmosResult<()> {
    let source_dir = source_dir.as_ref();
    let dest_file = dest_file.as_ref();

    let file = fs::File::create(dest_file)?;
    let mut zip = ZipWriter::new(file);
    let options = SimpleFileOptions::default()
        .compression_method(zip::CompressionMethod::Zstd)
        .compression_level(Some(COMPRESSION_LEVEL));

    fn walk_dir_recursive(
        root: &Path,
        current: &Path,
        zip: &mut ZipWriter<fs::File>,
        options: SimpleFileOptions,
    ) -> KosmosResult<()> {
        let entries = fs::read_dir(current)?;
        for entry in entries {
            let entry = entry?;
            let path = entry.path();
            let name = path.strip_prefix(root)?;

            if path.is_file() {
                zip.start_file(name.to_string_lossy(), options)?;
                let mut f = fs::File::open(path)?;
                io::copy(&mut f, zip)?;
            } else if path.is_dir() {
                zip.add_directory(name.to_string_lossy(), options)?;
                walk_dir_recursive(root, &path, zip, options)?;
            }
        }
        Ok(())
    }

    walk_dir_recursive(source_dir, source_dir, &mut zip, options)?;
    zip.finish()?;
    Ok(())
}

pub fn unpack<P: AsRef<Path>>(source_file: P, dest_dir: P) -> KosmosResult<()> {
    let source_file = source_file.as_ref();
    let dest_dir = dest_dir.as_ref();

    let file = fs::File::open(source_file)?;
    let mut archive = ZipArchive::new(file)?;

    if !dest_dir.exists() {
        fs::create_dir_all(dest_dir)?;
    }

    for i in 0..archive.len() {
        let mut file = archive.by_index(i)?;
        let out_path = match file.enclosed_name() {
            Some(path) => dest_dir.join(path),
            None => continue,
        };

        if file.is_dir() {
            fs::create_dir_all(&out_path)?;
        } else {
            if let Some(p) = out_path.parent() {
                if !p.exists() {
                    fs::create_dir_all(p)?;
                }
            }
            let mut outfile = fs::File::create(&out_path)?;
            io::copy(&mut file, &mut outfile)?;
        }
    }

    Ok(())
}
