use comrak::{
    markdown_to_html, ExtensionOptionsBuilder, Options, ParseOptionsBuilder, RenderOptionsBuilder,
};
use htmd::HtmlToMarkdown;

pub fn parse_md(content: String) -> String {
    let extension = ExtensionOptionsBuilder::default()
        .strikethrough(true)
        .tagfilter(true)
        .table(true)
        .autolink(true)
        .tasklist(true)
        .superscript(true)
        .footnotes(true)
        .description_lists(true)
        .front_matter_delimiter(Some(String::from("---")))
        .multiline_block_quotes(true)
        .math_code(true)
        .math_dollars(true)
        .underline(true)
        .greentext(true)
        .build()
        .unwrap();

    let parse = ParseOptionsBuilder::default()
        .relaxed_autolinks(false)
        .build()
        .unwrap();

    let render = RenderOptionsBuilder::default()
        .github_pre_lang(true)
        .unsafe_(false)
        .build()
        .unwrap();

    let md = markdown_to_html(
        &content,
        &Options {
            extension,
            parse,
            render,
        },
    );

    print!("{}", md);

    md
}

pub fn html_to_md(content: String) -> String {
    let converter = HtmlToMarkdown::builder().build();
    let md = converter.convert(&content).unwrap();
    md
}
