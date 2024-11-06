use std::{io::Write, path::Path};

use serde::Serialize;
use tauri::ipc::Response;
use tauri_plugin_dialog::DialogExt;
use tauri_plugin_fs::{FsExt, OpenOptions};

use crate::markdown;

#[derive(Serialize)]
struct File {
    path: String,
    content: String,
}

#[tauri::command]
pub async fn open_file(app: tauri::AppHandle) -> Result<Response, String> {
    let file_path = app
        .dialog()
        .file()
        .add_filter("markdown", &["md"])
        .blocking_pick_file();

    if let Some(file_path) = file_path {
        let content = app.fs().read_to_string(file_path.clone()).unwrap();
        let md = markdown::parse_md(content);
        let file = File {
            path: file_path.to_string(),
            content: md,
        };
        let file_json = serde_json::to_string(&file).unwrap();
        return Ok(tauri::ipc::Response::new(file_json));
    }

    return Err(format!("Cannot find file {:?}", file_path));
}

#[tauri::command]
pub fn save_file(app: tauri::AppHandle, path: String, content: String) -> Result<(), String> {
    let md = markdown::html_to_md(content);
    let file_path = Path::new(&path);
    let opts = OpenOptions::new().write(true).truncate(true).to_owned();
    let file = app.fs().open(file_path, opts);

    if let Ok(mut file) = file {
        match file.write_all(md.as_bytes()) {
            Ok(_) => Ok(()),
            Err(e) => Err(e.to_string()),
        }
    } else {
        Err("Error opening file".to_string())
    }
}
