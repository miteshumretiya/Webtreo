"""Generates the flat, on-brand team portrait illustrations in public/media/team/.

Original artwork for Webtreo (no third-party assets). Run: python3 scripts/gen-portraits.py
"""
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "public" / "media" / "team"
OUT.mkdir(parents=True, exist_ok=True)

INK, PAPER, PAPER2, BLUE, BLUE_TINT, BLUE_DEEP = "#191917", "#FBFAF8", "#F2F0EB", "#2857FF", "#E5EBFF", "#1B3FD1"


def shade(hex_color: str, f: float) -> str:
    h = hex_color.lstrip("#")
    r, g, b = (int(h[i : i + 2], 16) for i in (0, 2, 4))
    if f < 0:
        r, g, b = (int(c * (1 + f)) for c in (r, g, b))
    else:
        r, g, b = (int(c + (255 - c) * f) for c in (r, g, b))
    return f"#{r:02x}{g:02x}{b:02x}"


HAIR = {
    "short": lambda c: f'<path fill="{c}" d="M118 236C108 160 150 122 204 122C262 122 296 162 284 236C278 206 262 186 238 178C214 196 168 196 140 186C128 198 122 214 118 236Z"/>',
    "side": lambda c: f'<path fill="{c}" d="M116 240C104 150 160 116 210 118C268 120 300 170 286 238C282 214 272 196 256 184C226 170 196 176 160 168C150 186 128 204 116 240Z"/>'
    f'<path fill="{c}" d="M150 170C178 150 236 146 262 172C230 162 190 166 150 170Z"/>',
    "long": lambda c: (
        f'<path fill="{c}" d="M112 230C100 140 150 112 202 112C258 112 304 142 292 236C300 300 306 360 330 420L72 420C96 360 104 300 112 230Z"/>'
    ),
    "curly": lambda c: "".join(
        f'<circle fill="{c}" cx="{x}" cy="{y}" r="{r}"/>'
        for x, y, r in [
            (150, 170, 40), (190, 148, 42), (236, 152, 40), (268, 182, 36), (128, 206, 32),
            (278, 220, 30), (206, 140, 30), (170, 150, 30), (122, 240, 22), (284, 252, 20),
        ]
    ),
}

LONG_FRONT = lambda c: f'<path fill="{c}" d="M116 240C106 158 152 126 202 126C256 126 296 160 286 240C276 204 252 182 220 172C198 198 158 218 116 240Z"/>'


def portrait(skin, hair, hair_color, clothes, bg, accent, glasses=False, neckline="crew", beard=False, px=((300, 64, 30), (346, 30, 18))):
    skin_dark = shade(skin, -0.14)
    clothes_dark = shade(clothes, -0.18) if clothes != INK else "#2b2b28"
    parts = [f'<rect width="400" height="500" fill="{bg}"/>']
    for x, y, s in px:
        parts.append(f'<rect x="{x}" y="{y}" width="{s}" height="{s}" rx="{max(2, s // 8)}" fill="{accent}"/>')
    if hair == "long":
        parts.append(HAIR["long"](hair_color))
    # torso
    parts.append(f'<path fill="{clothes}" d="M30 500C30 432 84 396 152 384L248 384C316 396 370 432 370 500Z"/>')
    # neck
    parts.append(f'<path fill="{skin_dark}" d="M170 296H230V372C230 392 170 392 170 372Z"/>')
    if neckline == "crew":
        parts.append(f'<path fill="{clothes_dark}" d="M156 384C170 404 230 404 244 384L232 380C222 394 178 394 168 380Z"/>')
    elif neckline == "collar":
        parts.append(f'<path fill="{skin_dark}" d="M170 378L200 420L230 378Z"/>')
        parts.append(f'<path fill="{PAPER}" d="M164 372L200 418L176 432L150 388Z"/><path fill="{PAPER}" d="M236 372L200 418L224 432L250 388Z"/>')
    elif neckline == "hoodie":
        parts.append(f'<path fill="{clothes_dark}" d="M140 388C160 420 240 420 260 388L250 378C232 404 168 404 150 378Z"/>')
        parts.append(f'<rect x="178" y="414" width="4" height="40" rx="2" fill="{PAPER}"/><rect x="218" y="414" width="4" height="40" rx="2" fill="{PAPER}"/>')
    # ears + head
    parts.append(f'<ellipse cx="122" cy="246" rx="13" ry="20" fill="{skin_dark}"/><ellipse cx="278" cy="246" rx="13" ry="20" fill="{skin_dark}"/>')
    parts.append(f'<ellipse cx="200" cy="232" rx="78" ry="94" fill="{skin}"/>')
    if beard:
        parts.append(f'<path fill="{hair_color}" d="M124 252C128 312 160 330 200 330C240 330 272 312 276 252C268 286 250 300 232 296C220 290 180 290 168 296C150 300 132 286 124 252Z"/>')
    if hair != "long":
        parts.append(HAIR[hair](hair_color))
    else:
        parts.append(LONG_FRONT(hair_color))
    # face
    parts.append(f'<rect x="156" y="222" width="30" height="5" rx="2.5" fill="{shade(hair_color, 0.05)}"/><rect x="214" y="222" width="30" height="5" rx="2.5" fill="{shade(hair_color, 0.05)}"/>')
    parts.append(f'<ellipse cx="172" cy="246" rx="6" ry="7" fill="{INK}"/><ellipse cx="228" cy="246" rx="6" ry="7" fill="{INK}"/>')
    parts.append(f'<path d="M200 252V276C200 280 196 282 192 281" stroke="{skin_dark}" stroke-width="5" stroke-linecap="round" fill="none"/>')
    mouth_y = 300 if not beard else 302
    parts.append(f'<path d="M182 {mouth_y}C192 {mouth_y + 9} 208 {mouth_y + 9} 218 {mouth_y}" stroke="{INK if not beard else PAPER}" stroke-width="5" stroke-linecap="round" fill="none"/>')
    parts.append(f'<ellipse cx="160" cy="276" rx="12" ry="7" fill="{shade(skin, -0.06)}" opacity=".6"/><ellipse cx="240" cy="276" rx="12" ry="7" fill="{shade(skin, -0.06)}" opacity=".6"/>')
    if glasses:
        parts.append(
            f'<g stroke="{INK}" stroke-width="5" fill="none"><rect x="146" y="226" width="52" height="40" rx="8"/><rect x="202" y="226" width="52" height="40" rx="8"/><path d="M198 240h4"/></g>'
        )
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500">{"".join(parts)}</svg>'


people = {
    "aria": portrait("#F0C6A2", "long", "#3A2418", INK, BLUE, PAPER, neckline="crew"),
    "dev": portrait("#B9774E", "short", INK, BLUE, PAPER2, BLUE, glasses=True, neckline="collar", beard=True),
    "lena": portrait("#E2AA82", "curly", "#2A1A12", PAPER, INK, BLUE, neckline="crew"),
    "theo": portrait("#F3D0B4", "side", "#8A5A33", INK, BLUE_TINT, BLUE, neckline="hoodie"),
}

for name, svg in people.items():
    (OUT / f"{name}.svg").write_text(svg)
    print("wrote", name)
