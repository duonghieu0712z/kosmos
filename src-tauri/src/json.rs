use serde::{Serialize, de::DeserializeOwned};

use crate::error::KosmosResult;

pub trait Json: Serialize + DeserializeOwned {
    #[inline]
    fn from_json(json: &str) -> KosmosResult<Self> {
        Ok(serde_json::from_str(json)?)
    }

    #[inline]
    fn to_json(&self) -> KosmosResult<String> {
        #[cfg(debug_assertions)]
        {
            Ok(serde_json::to_string_pretty(self)?)
        }

        #[cfg(not(debug_assertions))]
        {
            Ok(serde_json::to_string(self)?)
        }
    }
}

impl<T: Serialize + DeserializeOwned> Json for T {}
