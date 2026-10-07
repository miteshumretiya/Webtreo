// Shared helpers for the original portfolio mockups (fictional client websites).
export const page = ({ fonts, css, body, bg = "#fff" }) => `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?${fonts}&display=block" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1600px;height:1200px;overflow:hidden;background:${bg};-webkit-font-smoothing:antialiased}
.nav{display:flex;align-items:center;justify-content:space-between;padding:36px 72px}
.links{display:flex;gap:40px;font-size:17px}
.row{display:flex;align-items:center}
${css}
</style></head><body>${body}</body></html>`;
