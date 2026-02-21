"""
Uniform Store – Chat Prototype
Streamlit entry point for deployment on Streamlit Cloud.
Embeds the existing HTML/CSS/JS app in an iframe.
"""

import streamlit as st
from pathlib import Path

# Path to this file's directory (repo root on Streamlit Cloud)
BASE_DIR = Path(__file__).resolve().parent


def load_app_html() -> str:
    """Load index.html, styles.css, and app.js; return a single HTML document."""
    index_path = BASE_DIR / "index.html"
    styles_path = BASE_DIR / "styles.css"
    app_js_path = BASE_DIR / "app.js"

    index_html = index_path.read_text(encoding="utf-8")
    styles_css = styles_path.read_text(encoding="utf-8")
    app_js = app_js_path.read_text(encoding="utf-8")

    # Replace external link/script with inlined content so it works in the component
    index_html = index_html.replace(
        '  <link rel="stylesheet" href="styles.css" />',
        f"  <style>\n{styles_css}\n  </style>",
    )
    index_html = index_html.replace(
        '  <script src="app.js"></script>',
        f"  <script>\n{app_js}\n  </script>",
    )
    return index_html


st.set_page_config(
    page_title="Uniform Store – Chat Prototype",
    page_icon="🛒",
    layout="centered",
)

st.title("Uniform Store")
st.caption("Interactive chat prototype – select school, class, gender, choose uniform, and complete the flow.")

html = load_app_html()
st.components.v1.html(html, height=720, scrolling=True)
