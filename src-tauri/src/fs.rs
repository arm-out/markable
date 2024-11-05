use tauri::ipc::Response;
use tauri_plugin_dialog::DialogExt;
use tauri_plugin_fs::FsExt;

use crate::markdown;


#[tauri::command]
pub async fn open_file(app: tauri::AppHandle) -> Response {
    let file_path = app.dialog().file().add_filter("markdown", &["md"]).blocking_pick_file();
    if let Some(file_path) = file_path {
        let content = app.fs().read_to_string(file_path).unwrap();
        let md = markdown::parse_md(content);
        return tauri::ipc::Response::new(md)
    }
    tauri::ipc::Response::new("Error opening file".to_string())
}