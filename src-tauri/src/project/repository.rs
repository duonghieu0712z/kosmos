use async_trait::async_trait;
use serde_json::to_string;
use sqlx::{SqlitePool, query, query_as};

use crate::error::KosmosResult;

use super::data::ProjectData;

#[allow(dead_code)]
#[async_trait]
pub trait ProjectRepository {
    async fn get(&self) -> KosmosResult<ProjectData>;
    async fn create(&self, data: &ProjectData) -> KosmosResult<bool>;
    async fn update(&self, data: &ProjectData) -> KosmosResult<bool>;
}

#[allow(dead_code)]
pub struct ProjectSqlite {
    pool: SqlitePool,
}

const CREATE_STATEMENT: &str = r#"
CREATE TABLE IF NOT EXISTS projects (
    id BLOB PRIMARY KEY CHECK (length(id) = 16),
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    description TEXT NOT NULL,
    genres TEXT NOT NULL CHECK (json_valid(genres)),
    created_at INTEGER NOT NULL,
    modified_at INTEGER NOT NULL,
    version TEXT NOT NULL CHECK (json_valid(version))
)
"#;

const SELECT_STATEMENT: &str = r#"
SELECT id, title, author, description, genres, created_at, modified_at, version
FROM projects
"#;

const INSERT_STATEMENT: &str = r#"
INSERT INTO projects (id, title, author, description, genres, created_at, modified_at, version)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)
"#;

const UPDATE_STATEMENT: &str = r#"
UPDATE projects
SET title = ?, author = ?, description = ?, genres = ?, modified_at = ?, version = ?
WHERE id = ?
"#;

#[allow(dead_code)]
impl ProjectSqlite {
    pub async fn new(pool: &SqlitePool) -> KosmosResult<Self> {
        query(CREATE_STATEMENT).execute(pool).await?;
        Ok(Self { pool: pool.clone() })
    }
}

#[async_trait]
impl ProjectRepository for ProjectSqlite {
    async fn get(&self) -> KosmosResult<ProjectData> {
        let project = query_as::<_, ProjectData>(SELECT_STATEMENT)
            .fetch_one(&self.pool)
            .await?;
        Ok(project)
    }

    async fn create(&self, data: &ProjectData) -> KosmosResult<bool> {
        let result = query(INSERT_STATEMENT)
            .bind(data.id())
            .bind(data.title())
            .bind(data.author())
            .bind(data.description())
            .bind(to_string(data.genres())?)
            .bind(data.created_at().timestamp())
            .bind(data.modified_at().timestamp())
            .bind(to_string(data.version())?)
            .execute(&self.pool)
            .await?;
        Ok(result.rows_affected() > 0)
    }

    async fn update(&self, data: &ProjectData) -> KosmosResult<bool> {
        let result = query(UPDATE_STATEMENT)
            .bind(data.title())
            .bind(data.author())
            .bind(data.description())
            .bind(to_string(data.genres())?)
            .bind(data.modified_at())
            .bind(to_string(data.version())?)
            .bind(data.id())
            .execute(&self.pool)
            .await?;
        Ok(result.rows_affected() > 0)
    }
}
