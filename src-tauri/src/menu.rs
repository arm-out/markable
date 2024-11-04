use tauri::Runtime;

pub fn create_menu<R: Runtime>(app: &tauri::App<R>) -> tauri::Result<()> {
    // let file_menu = SubmenuBuilder::new(app, "File")
    //             .text("open", "open")
    //             .text("quit", "quit")
    //             .build()?;

    // let menu = MenuBuilder::new(app)
    //     .items(&[&file_menu])
    //     .build()?;

    // app.set_menu(menu)?;

    Ok(())
}
