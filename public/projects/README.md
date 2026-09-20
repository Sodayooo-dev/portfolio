# Project Screenshots Directory

You can place your project screenshots or images in this folder (`public/projects/`).

Example file names:
- `ncii-css.png`
- `whiteboard.png`
- `rdb-lab.png`
- `gitea.png`
- `server-hosting.png`

## How to use them:
In `src/data/projects.ts`, simply update the `image` field for the corresponding project:

```ts
// Example:
image: '/projects/ncii-css.png',
```

Or you can use any direct image URL (e.g., https://...).
