use tauri::ipc::Response;
use tauri_plugin_dialog::DialogExt;
use tauri_plugin_fs::FsExt;


#[tauri::command]
pub async fn open_file(app: tauri::AppHandle) -> Response {
    let file_path = app.dialog().file().add_filter("markdown", &["md"]).blocking_pick_file();
    if let Some(file_path) = file_path {
        let content = app.fs().read_to_string(file_path).unwrap();
        let md = parse_md(content);
        return tauri::ipc::Response::new(md)
    }
    tauri::ipc::Response::new("Error opening file".to_string())
}

fn parse_md(content: String) -> Vec<u8> {
    content.as_bytes().to_vec() 
}