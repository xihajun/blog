# Hello World

Welcome to my new blog! This site is built with **pure HTML, CSS, and JavaScript** - no build tools, no frameworks.

## Features

- **Markdown-powered** - write posts in `.md` files, rendered with [marked.js](https://marked.js.org/)
- **Bilingual** - supports both Chinese and English
- **Clean design** - inspired by academic personal pages
- **Easy to update** - just add a markdown file and update `posts/index.json`

## How to add a new post

1. Create a markdown file in `posts/`, e.g. `my-new-post.en.md` and `my-new-post.zh.md`
2. Add an entry to `posts/index.json`:

```json
{
  "slug": "my-new-post",
  "title": "My New Post",
  "title_zh": "My New Post ZH",
  "date": "2026-06-01",
  "category": "Tech",
  "file": "my-new-post.en.md",
  "file_zh": "my-new-post.zh.md",
  "lang": "both"
}
```

3. Push to GitHub - done!

## Code example

```python
def hello():
    print("Hello from the blog!")
```

> This blog is hosted on GitHub Pages. Fast, free, and version-controlled.
