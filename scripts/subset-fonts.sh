#!/usr/bin/env bash
# Rebuilds the self-hosted, subset variable fonts in src/fonts/ (requires: pip install fonttools brotli).
# Inputs: the official Archivo and Geist Mono variable woff2 files (Google Fonts, SIL OFL 1.1).
#   ./scripts/subset-fonts.sh path/to/Archivo[wdth,wght].woff2 path/to/GeistMono[wght].woff2
set -euo pipefail
ARCHIVO_SRC=$1
MONO_SRC=$2
TMP=$(mktemp -d)
LATIN="U+0020-007E,U+00A0,U+00A9,U+00AE,U+00B7,U+00D7,U+00E9,U+2013,U+2014,U+2018,U+2019,U+201C,U+201D,U+2022,U+2026,U+2190-2193,U+2122,U+20AC,U+2212"
fonttools varLib.instancer "$ARCHIVO_SRC" wght=300:800 wdth=75:125 -o "$TMP/archivo.ttf"
pyftsubset "$TMP/archivo.ttf" --unicodes="$LATIN" --layout-features='kern,liga,calt,case,tnum,lnum,ccmp,locl,mark,mkmk' --flavor=woff2 --output-file=src/fonts/archivo-var.woff2
fonttools varLib.instancer "$MONO_SRC" wght=400:500 -o "$TMP/mono.ttf"
pyftsubset "$TMP/mono.ttf" --unicodes="U+0020-007E,U+00A0,U+00B7,U+00D7,U+2013,U+2014,U+2019,U+2022,U+2190-2193" --layout-features='kern,tnum,ccmp,locl' --flavor=woff2 --output-file=src/fonts/geist-mono-var.woff2
rm -rf "$TMP"
ls -la src/fonts
