#!/usr/bin/env bash
set -euo pipefail

ROOT="${1:-.}"
cd "$ROOT"

STAMP="$(date +%Y%m%d_%H%M%S)"
OUTDIR="artifacts/repo_audit/$STAMP"
mkdir -p "$OUTDIR"

ROUTES_FILE="$OUTDIR/routes.txt"
PLATFORM_COMPONENTS_FILE="$OUTDIR/platform_components.txt"
UI_COMPONENTS_FILE="$OUTDIR/ui_components.txt"
CONTENT_FILE="$OUTDIR/content_files.txt"
STYLES_FILE="$OUTDIR/style_files.txt"
BACKUPS_FILE="$OUTDIR/backup_files.txt"
IMPORTS_FILE="$OUTDIR/route_imports.txt"
CONTENT_REFS_FILE="$OUTDIR/content_refs.txt"
STYLE_REFS_FILE="$OUTDIR/style_refs.txt"
CORRUPTION_FILE="$OUTDIR/corruption_hits.txt"
SUMMARY_MD="$OUTDIR/summary.md"
OWNERSHIP_MD="docs/REPO_OWNERSHIP.md"
JSON_FILE="$OUTDIR/ownership_snapshot.json"

find src/routes -type f \( -name "+page.svelte" -o -name "+page.server.ts" -o -name "+layout.svelte" -o -name "+layout.ts" \) | sort > "$ROUTES_FILE"
find src/lib/components/platform -maxdepth 1 -type f -name "*.svelte" | sort > "$PLATFORM_COMPONENTS_FILE" 2>/dev/null || true
find src/lib/components/ui -maxdepth 1 -type f -name "*.svelte" | sort > "$UI_COMPONENTS_FILE" 2>/dev/null || true
find src/lib/content -maxdepth 1 -type f | sort > "$CONTENT_FILE" 2>/dev/null || true
find src/lib/styles -maxdepth 1 -type f | sort > "$STYLES_FILE" 2>/dev/null || true
find src -type f \( -name "*.bak*" -o -name "*~" -o -name "*.orig" \) | sort > "$BACKUPS_FILE" 2>/dev/null || true

: > "$IMPORTS_FILE"
for f in \
  "src/routes/(platform)/platform/+page.svelte" \
  "src/routes/(platform)/platform/dashboard/+page.svelte" \
  "src/routes/(platform)/platform/demo/+page.svelte" \
  "src/routes/(platform)/platform/onboarding/+page.svelte" \
  "src/routes/(platform)/platform/pricing/+page.svelte"
do
  if [ -f "$f" ]; then
    {
      echo "=== $f ==="
      rg -n "from '|from \"" "$f" || true
      echo
    } >> "$IMPORTS_FILE"
  fi
done

rg -n "platform-home|content/" src/routes src/lib/components > "$CONTENT_REFS_FILE" 2>/dev/null || true
rg -n "app.css|flagship.css|tokens.css" src > "$STYLE_REFS_FILE" 2>/dev/null || true
rg -n "cd ~/|pnpm dev|npm run|fuser -k|python3 - <<'PY'|^❯" src > "$CORRUPTION_FILE" 2>/dev/null || true

route_count="$(wc -l < "$ROUTES_FILE" | tr -d ' ')"
platform_component_count="$(wc -l < "$PLATFORM_COMPONENTS_FILE" | tr -d ' ')"
ui_component_count="$(wc -l < "$UI_COMPONENTS_FILE" | tr -d ' ')"
content_count="$(wc -l < "$CONTENT_FILE" | tr -d ' ')"
style_count="$(wc -l < "$STYLES_FILE" | tr -d ' ')"
backup_count="$(wc -l < "$BACKUPS_FILE" | tr -d ' ')"
corruption_count="$(wc -l < "$CORRUPTION_FILE" | tr -d ' ')"

python3 - <<PY
import json
from pathlib import Path

def lines(path):
    p = Path(path)
    if not p.exists():
        return []
    return [line.rstrip("\\n") for line in p.read_text(encoding="utf-8").splitlines() if line.strip()]

data = {
    "generated_at": "$STAMP",
    "repo_root": str(Path(".").resolve()),
    "routes": lines("$ROUTES_FILE"),
    "platform_components": lines("$PLATFORM_COMPONENTS_FILE"),
    "ui_components": lines("$UI_COMPONENTS_FILE"),
    "content_files": lines("$CONTENT_FILE"),
    "style_files": lines("$STYLES_FILE"),
    "backup_files": lines("$BACKUPS_FILE"),
    "route_imports_raw": Path("$IMPORTS_FILE").read_text(encoding="utf-8") if Path("$IMPORTS_FILE").exists() else "",
    "content_refs_raw": Path("$CONTENT_REFS_FILE").read_text(encoding="utf-8") if Path("$CONTENT_REFS_FILE").exists() else "",
    "style_refs_raw": Path("$STYLE_REFS_FILE").read_text(encoding="utf-8") if Path("$STYLE_REFS_FILE").exists() else "",
    "corruption_hits_raw": Path("$CORRUPTION_FILE").read_text(encoding="utf-8") if Path("$CORRUPTION_FILE").exists() else "",
}
Path("$JSON_FILE").write_text(json.dumps(data, indent=2), encoding="utf-8")
PY

cat > "$SUMMARY_MD" <<EOF
# FutureFunded Surface Map

Generated: $STAMP

## Counts
- Route files: $route_count
- Platform components: $platform_component_count
- UI components: $ui_component_count
- Content files: $content_count
- Style files: $style_count
- Backup/drift files: $backup_count
- Possible corruption hits: $corruption_count

## Key takeaways
- Route owners live under \`src/routes/\`
- Platform sections live under \`src/lib/components/platform/\`
- UI primitives live under \`src/lib/components/ui/\`
- Content ownership lives under \`src/lib/content/\`
- Style ownership lives under \`src/lib/styles/\`
- Backup siblings inside \`src/\` are drift risk and should be moved out of live paths

## Primary route owners
EOF

sed 's/^/- /' "$ROUTES_FILE" >> "$SUMMARY_MD"

cat >> "$SUMMARY_MD" <<'EOF'

## Primary platform section owners
EOF
sed 's/^/- /' "$PLATFORM_COMPONENTS_FILE" >> "$SUMMARY_MD"

cat >> "$SUMMARY_MD" <<'EOF'

## Primary UI primitive owners
EOF
sed 's/^/- /' "$UI_COMPONENTS_FILE" >> "$SUMMARY_MD"

cat >> "$SUMMARY_MD" <<'EOF'

## Content owners
EOF
sed 's/^/- /' "$CONTENT_FILE" >> "$SUMMARY_MD"

cat >> "$SUMMARY_MD" <<'EOF'

## Style owners
EOF
sed 's/^/- /' "$STYLES_FILE" >> "$SUMMARY_MD"

cat >> "$SUMMARY_MD" <<'EOF'

## Backup / drift files
EOF
if [ -s "$BACKUPS_FILE" ]; then
  sed 's/^/- /' "$BACKUPS_FILE" >> "$SUMMARY_MD"
else
  echo "- none found" >> "$SUMMARY_MD"
fi

cat >> "$SUMMARY_MD" <<'EOF'

## Route import graph
EOF
cat "$IMPORTS_FILE" >> "$SUMMARY_MD"

cat >> "$SUMMARY_MD" <<'EOF'

## Content references
EOF
if [ -s "$CONTENT_REFS_FILE" ]; then
  cat "$CONTENT_REFS_FILE" >> "$SUMMARY_MD"
else
  echo "none" >> "$SUMMARY_MD"
fi

cat >> "$SUMMARY_MD" <<'EOF'

## Style references
EOF
if [ -s "$STYLE_REFS_FILE" ]; then
  cat "$STYLE_REFS_FILE" >> "$SUMMARY_MD"
else
  echo "none" >> "$SUMMARY_MD"
fi

cat >> "$SUMMARY_MD" <<'EOF'

## Possible live-file corruption markers
EOF
if [ -s "$CORRUPTION_FILE" ]; then
  cat "$CORRUPTION_FILE" >> "$SUMMARY_MD"
else
  echo "none" >> "$SUMMARY_MD"
fi

cat > "$OWNERSHIP_MD" <<EOF
# Repo Ownership Map

Generated: $STAMP

## Source-of-truth rule
Edit live files only. Do not edit \`.bak\`, \`.orig\`, or scratch copies inside \`src/\`.

## Route owners
These files own page assembly and route-level surface behavior:

EOF
sed 's/^/- `/' "$ROUTES_FILE" | sed 's/$/`/' >> "$OWNERSHIP_MD"

cat >> "$OWNERSHIP_MD" <<'EOF'

## Platform section owners
These files own reusable platform sections:

EOF
sed 's/^/- `/' "$PLATFORM_COMPONENTS_FILE" | sed 's/$/`/' >> "$OWNERSHIP_MD"

cat >> "$OWNERSHIP_MD" <<'EOF'

## UI primitive owners
These files own shared buttons, cards, headings, and other base UI pieces:

EOF
sed 's/^/- `/' "$UI_COMPONENTS_FILE" | sed 's/$/`/' >> "$OWNERSHIP_MD"

cat >> "$OWNERSHIP_MD" <<'EOF'

## Content owners
These files own structured page copy and content data:

EOF
sed 's/^/- `/' "$CONTENT_FILE" | sed 's/$/`/' >> "$OWNERSHIP_MD"

cat >> "$OWNERSHIP_MD" <<'EOF'

## Style owners
Use this lane to avoid styling drift:

EOF
sed 's/^/- `/' "$STYLES_FILE" | sed 's/$/`/' >> "$OWNERSHIP_MD"

cat >> "$OWNERSHIP_MD" <<'EOF'

## Editing rules

### When changing a page
Start in the matching route owner under `src/routes/...`.

### When changing a reusable section
Edit the matching file in `src/lib/components/platform/`.

### When changing a reusable primitive
Edit the matching file in `src/lib/components/ui/`.

### When changing text/content/stats
Edit `src/lib/content/...`.

### When changing styling
Prefer this order:
1. `src/lib/styles/tokens.css` for tokens
2. `src/lib/styles/app.css` for shared system/base styles
3. `src/lib/styles/flagship.css` for flagship surface styling

## Drift risks currently present
EOF

if [ -s "$BACKUPS_FILE" ]; then
  echo "- Backup files exist inside \`src/\` and increase the chance of editing the wrong file." >> "$OWNERSHIP_MD"
  echo "- Recommended: move backup files into \`artifacts/backups/\` or rely on Git instead of inline backup siblings." >> "$OWNERSHIP_MD"
else
  echo "- No backup sibling files detected inside \`src/\`." >> "$OWNERSHIP_MD"
fi

if [ -s "$CORRUPTION_FILE" ]; then
  echo "- Possible pasted CLI/log content was detected in live source files. Review corruption hits before further editing." >> "$OWNERSHIP_MD"
else
  echo "- No obvious CLI/log paste corruption markers were detected." >> "$OWNERSHIP_MD"
fi

cat >> "$OWNERSHIP_MD" <<EOF

## Current audit artifacts
- Summary: \`$SUMMARY_MD\`
- JSON snapshot: \`$JSON_FILE\`

## Recommended hygiene rule
Never create backup copies inside \`src/\`. Put them under \`artifacts/backups/\` if you need them.
EOF

echo
echo "============================================================"
echo " FUTUREFUNDED SURFACE MAP"
echo "============================================================"
echo "Generated: $STAMP"
echo
echo "Route files:              $route_count"
echo "Platform components:      $platform_component_count"
echo "UI components:            $ui_component_count"
echo "Content files:            $content_count"
echo "Style files:              $style_count"
echo "Backup/drift files:       $backup_count"
echo "Possible corruption hits: $corruption_count"
echo
echo "Docs:"
echo "  $OWNERSHIP_MD"
echo "  $SUMMARY_MD"
echo "  $JSON_FILE"
echo
echo "Top route owners:"
head -n 20 "$ROUTES_FILE" || true
echo
echo "Top backup/drift files:"
head -n 20 "$BACKUPS_FILE" || true
echo
echo "Possible corruption hits:"
cat "$CORRUPTION_FILE" || true
echo
echo "Done."
