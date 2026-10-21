#!/usr/bin/env python3
"""Draws a stylised "exploded engine" blueprint as scroll film frames, so the homepage works
before the real Veo footage exists. Replace it by running scripts/make-film.sh on the real clip.

  python3 scripts/make-placeholder-film.py [frames]

Writes public/film/engine/d/001.webp ... (1280x720) and public/film/engine/m/001.webp ... (540x960).
The story matches the real film: covers off, wet belt revealed, old belt out, new belt on, reassembled.
"""
import math, os, sys
from PIL import Image, ImageDraw, ImageFilter

LIME = (126, 211, 33)
PALE = (255, 243, 160)
GREY = (150, 160, 140)
N = int(sys.argv[1]) if len(sys.argv) > 1 else 120


def smooth(a, b, x):
    t = max(0.0, min(1.0, (x - a) / (b - a)))
    return t * t * (3 - 2 * t)


def frame(W, H, p):
    bg = Image.new('RGB', (W, H), (5, 5, 5))
    glow = Image.new('RGB', (W, H), (0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((W * .15, H * .2, W * .85, H * .95), fill=(14, 26, 6))
    bg = Image.blend(bg, glow.filter(ImageFilter.GaussianBlur(W * .08)), 0.9)

    lines = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(lines)
    lw = max(2, W // 420)

    # engine box, slowly pushing in
    zoom = 1 + 0.06 * smooth(0, 1, p)
    ew = (0.5 if W > H else 0.86) * W * zoom
    eh = ew * 0.56
    cx, cy = W / 2, H * (0.52 if W > H else 0.5)
    L, T = cx - ew / 2, cy - eh / 2

    cover_up = smooth(0.19, 0.35, p) - smooth(0.84, 0.95, p)       # cam cover rises, then returns
    side_out = smooth(0.35, 0.51, p) - smooth(0.86, 0.97, p)       # timing cover slides off
    old_out = smooth(0.51, 0.67, p)                                 # old belt leaves
    new_in = smooth(0.67, 0.84, p)                                  # new belt arrives

    def rrect(box, r, col, w=lw):
        d.rounded_rectangle(box, radius=r, outline=col + (255,), width=w)

    # block
    rrect((L, T + eh * .38, L + ew, T + eh), eh * .05, LIME)
    for i in range(1, 4):
        x = L + ew * i / 4
        d.line((x, T + eh * .38, x, T + eh), fill=LIME + (90,), width=max(1, lw // 2))
    # cam cover (rises)
    up = cover_up * eh * 0.42
    rrect((L + ew * .04, T + eh * .08 - up, L + ew * .96, T + eh * .32 - up), eh * .04, LIME)
    for i in range(7):
        x = L + ew * (0.1 + i * 0.13)
        d.ellipse((x - 4, T + eh * .2 - up - 4, x + 4, T + eh * .2 - up + 4), outline=PALE + (255,), width=max(1, lw // 2))
    # inner head layer (between cover and block)
    rrect((L + ew * .06, T + eh * .31, L + ew * .94, T + eh * .38), eh * .02, LIME)

    # sprockets (on the left, behind the timing cover)
    s1 = (L + ew * .22, T + eh * .68)
    s2 = (L + ew * .48, T + eh * .56)
    rad = ew * .075
    spin = p * 5 * math.pi
    for (sx, sy) in (s1, s2):
        d.ellipse((sx - rad, sy - rad, sx + rad, sy + rad), outline=PALE + (255,), width=lw)
        for k in range(12):
            a = spin + k * math.pi / 6
            d.line((sx + math.cos(a) * rad, sy + math.sin(a) * rad, sx + math.cos(a) * rad * 1.22, sy + math.sin(a) * rad * 1.22), fill=PALE + (255,), width=lw)

    def belt(dx, dy, col, alpha, dashed=False, scale=1.0):
        # stadium shape around the two sprockets
        pts = []
        ang = math.atan2(s2[1] - s1[1], s2[0] - s1[0])
        r = rad * 1.28 * scale
        for i in range(0, 181, 6):
            a = ang + math.pi / 2 + math.radians(i)
            pts.append((s2[0] + math.cos(a) * r, s2[1] + math.sin(a) * r))
        for i in range(0, 181, 6):
            a = ang - math.pi / 2 + math.radians(i)
            pts.append((s1[0] + math.cos(a) * r, s1[1] + math.sin(a) * r))
        pts.append(pts[0])
        pts = [(x + dx, y + dy) for x, y in pts]
        if dashed:
            for i in range(0, len(pts) - 1, 2):
                d.line((pts[i], pts[i + 1]), fill=col + (alpha,), width=lw * 2)
        else:
            d.line(pts, fill=col + (alpha,), width=lw * 2, joint='curve')

    # timing cover slides to the left, fading
    tx = -side_out * ew * 0.42
    if side_out < 0.98:
        a = int(255 * (1 - side_out * 0.35))
        d.rounded_rectangle((L + ew * .1 + tx, T + eh * .4, L + ew * .6 + tx, T + eh * .95), radius=eh * .04, outline=LIME + (a,), width=lw)

    # old belt: dull, dashed, comes off toward the viewer and fades
    if old_out < 0.98 and new_in < 0.2:
        belt(-old_out * ew * .25, old_out * eh * .5, GREY, int(255 * (1 - old_out)), dashed=True, scale=1 + old_out * .5)
        if 0.51 < p < 0.68:
            rng = (int(p * 1000) % 7) + 3
            for k in range(rng):
                fx = s1[0] + (k * 37 % 90) - 20 - old_out * 60
                fy = s1[1] + (k * 53 % 70) + old_out * 90
                d.rectangle((fx, fy, fx + 4, fy + 4), fill=GREY + (200,))
    # new belt: clean, slides in from the right
    if new_in > 0:
        belt((1 - new_in) * ew * .6, 0, LIME, int(255 * min(1, new_in * 2)))

    # glow pass
    glow_layer = lines.filter(ImageFilter.GaussianBlur(W * .006))
    out = bg.convert('RGBA')
    out = Image.alpha_composite(out, glow_layer)
    out = Image.alpha_composite(out, glow_layer)
    out = Image.alpha_composite(out, lines)

    # light sweep across at start and end
    sweep = smooth(0.0, 0.12, p) * (1 - smooth(0.12, 0.2, p)) + smooth(0.9, 0.97, p) * (1 - smooth(0.97, 1.0, p))
    if sweep > 0:
        sx = int(W * (0.1 + 0.8 * (p * 8 % 1)))
        band = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        ImageDraw.Draw(band).rectangle((sx - W * .02, 0, sx + W * .02, H), fill=LIME + (int(70 * sweep),))
        out = Image.alpha_composite(out, band.filter(ImageFilter.GaussianBlur(W * .02)))
    return out.convert('RGB')


def main():
    root = os.path.join('public', 'film', 'engine')
    for key, (W, H) in {'d': (1280, 720), 'm': (540, 960)}.items():
        os.makedirs(os.path.join(root, key), exist_ok=True)
        for i in range(N):
            frame(W, H, i / (N - 1)).save(os.path.join(root, key, f'{i + 1:03d}.webp'), quality=70)
    print(f'{N} placeholder frames per size written to {root}')


if __name__ == '__main__':
    main()
