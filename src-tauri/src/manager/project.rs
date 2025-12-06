use std::{path::PathBuf, sync::Arc};

use sqlx::SqlitePool;
use tokio::fs::{File, create_dir};

use crate::{
    error::{KosmosError, KosmosResult},
    project::{ProjectData, ProjectService, ProjectSqlite},
};

#[allow(dead_code)]
pub struct ProjectManager {
    pool: SqlitePool,
    path: PathBuf,

    project_service: ProjectService,
}

#[allow(dead_code)]
impl ProjectManager {
    async fn new(path: &PathBuf) -> KosmosResult<Self> {
        let url = format!("sqlite://{}", path.display());
        let pool = SqlitePool::connect(&url).await?;

        let project_repository = Arc::new(ProjectSqlite::new(&pool).await?);
        let project_service = ProjectService::new(project_repository);

        Ok(Self {
            pool,
            path: path.clone(),
            project_service,
        })
    }

    pub async fn create(name: &str, path: &PathBuf) -> KosmosResult<Self> {
        if !path.exists() {
            return Err(KosmosError::NotFound(format!("{}", path.display())));
        }

        let path = path.join(name);
        if path.exists() {
            return Err(KosmosError::AlreadyExists(format!("{}", path.display())));
        }

        create_dir(&path).await?;
        let path = path.join("project.kosmos");
        if path.exists() {
            return Err(KosmosError::AlreadyExists(format!("{}", path.display())));
        }

        File::create(&path).await?;
        let manager = Self::new(&path).await?;
        manager.project_service.create(name).await?;

        Ok(manager)
    }

    pub async fn load(path: &PathBuf) -> KosmosResult<Self> {
        if !path.exists() {
            return Err(KosmosError::NotFound(format!("{}", path.display())));
        }

        if path.is_dir() {
            let path = path.join("project.kosmos");
            if !path.exists() {
                return Err(KosmosError::NotFound(format!("{}", path.display())));
            }
            return Self::new(&path).await;
        }

        if path.is_file() && !path.ends_with("project.kosmos") {
            return Err(KosmosError::Invalid(format!("{}", path.display())));
        }

        Self::new(&path).await
    }

    pub async fn project(&self) -> KosmosResult<ProjectData> {
        self.project_service.get().await
    }
}
