---
layout: post
title: "Bash Check If File Exists: Complete Guide with Examples"
date: 2026-03-17
lang: "en"
meta: '<meta name="description" content="Bash check if file exists: complete guide to -f, -d, -e, -r, -w, -x flags with code examples for every use case including directories, symlinks, and empty files."><meta name="keywords" content="bash check if file exists, bash if file exists, bash -f flag, bash test file, bash file exists check"><meta name="author" content="Beta Shorts"><meta name="robots" content="index, follow"><link rel="canonical" href="https://betashorts.com/bash-check-if-file-exists">'
tags: [Bash, Linux, File Operations, Scripting]
---

<p>Checking whether a file exists before operating on it is one of the most common bash patterns — and getting it wrong causes some of the most frustrating bugs in shell scripts. Bash provides over a dozen file test operators that check not just existence but also file type, permissions, and size. This guide covers every important flag with practical examples, so you write scripts that fail gracefully instead of crashing on missing files.</p>

<figure style="max-width:400px;margin:2rem auto;text-align:center;">
<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;border-radius:8px;">
  <rect width="400" height="280" fill="#0D1117" rx="8"/>
  <rect width="400" height="280" fill="none" stroke="#30363D" stroke-width="1" rx="8"/>
  <!-- Top diamond: Does file exist? -->
  <polygon points="200,20 310,70 200,120 90,70" fill="#161B22" stroke="#3B82F6" stroke-width="2"/>
  <text x="200" y="65" font-family="'JetBrains Mono',monospace" font-size="11" fill="#E6EDF3" text-anchor="middle">Does file</text>
  <text x="200" y="80" font-family="'JetBrains Mono',monospace" font-size="11" fill="#E6EDF3" text-anchor="middle">exist?</text>
  <!-- NO arrow right -->
  <line x1="310" y1="70" x2="370" y2="70" stroke="#E8726A" stroke-width="1.5"/>
  <text x="318" y="62" font-family="'JetBrains Mono',monospace" font-size="10" fill="#E8726A">NO</text>
  <rect x="342" y="54" width="50" height="32" fill="#161B22" rx="4" stroke="#E8726A" stroke-width="1.5"/>
  <text x="367" y="74" font-family="'JetBrains Mono',monospace" font-size="10" fill="#E8726A" text-anchor="middle">Error</text>
  <!-- YES arrow down -->
  <line x1="200" y1="120" x2="200" y2="150" stroke="#86EFAC" stroke-width="1.5"/>
  <text x="208" y="140" font-family="'JetBrains Mono',monospace" font-size="10" fill="#86EFAC">YES</text>
  <!-- Second diamond: Is it readable? -->
  <polygon points="200,150 300,190 200,230 100,190" fill="#161B22" stroke="#3B82F6" stroke-width="2"/>
  <text x="200" y="185" font-family="'JetBrains Mono',monospace" font-size="11" fill="#E6EDF3" text-anchor="middle">Is it</text>
  <text x="200" y="200" font-family="'JetBrains Mono',monospace" font-size="11" fill="#E6EDF3" text-anchor="middle">readable?</text>
  <!-- NO arrow -->
  <line x1="300" y1="190" x2="360" y2="190" stroke="#E8726A" stroke-width="1.5"/>
  <rect x="338" y="174" width="50" height="32" fill="#161B22" rx="4" stroke="#E8726A" stroke-width="1.5"/>
  <text x="363" y="194" font-family="'JetBrains Mono',monospace" font-size="10" fill="#E8726A" text-anchor="middle">Deny</text>
  <!-- YES arrow down -->
  <line x1="200" y1="230" x2="200" y2="260" stroke="#86EFAC" stroke-width="1.5"/>
  <rect x="148" y="256" width="104" height="16" fill="#161B22" rx="4" stroke="#86EFAC" stroke-width="1.5"/>
  <text x="200" y="268" font-family="'JetBrains Mono',monospace" font-size="10" fill="#86EFAC" text-anchor="middle">Proceed safely</text>
</svg>
<figcaption style="color:#6b7280;font-size:0.85rem;margin-top:0.5rem;">Decision tree for safely opening a file: check existence, then readability before proceeding</figcaption>
</figure>

<h2>1. Complete File Test Flags Reference</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">bash</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">file="/etc/hosts"

[ -e "$file" ]  # exists (any type: file, dir, symlink, etc.)
[ -f "$file" ]  # exists AND is a regular file
[ -d "$file" ]  # exists AND is a directory
[ -r "$file" ]  # exists AND is readable by current user
[ -w "$file" ]  # exists AND is writable by current user
[ -x "$file" ]  # exists AND is executable by current user
[ -s "$file" ]  # exists AND has size greater than zero (not empty)
[ -L "$file" ]  # exists AND is a symbolic link
[ -h "$file" ]  # same as -L

# Negate any test with !
[ ! -f "$file" ]  # does NOT exist or is not a regular file</code></pre>
</div>

<h2>2. if Statements with File Tests</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">bash</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">#!/bin/bash

config="/etc/myapp/config.yaml"

# Check regular file
if [[ -f "$config" ]]; then
    echo "Config found, loading..."
else
    echo "Config missing: $config" >&2
    exit 1
fi

# Check directory
logdir="/var/log/myapp"
if [[ ! -d "$logdir" ]]; then
    mkdir -p "$logdir"
    echo "Created log directory"
fi

# Check readable
if [[ -r "$config" ]]; then
    cat "$config"
else
    echo "Cannot read $config — check permissions" >&2
fi</code></pre>
</div>

<h2>3. Combining Conditions</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">file="/data/input.csv"

# AND: file exists AND is readable AND is not empty
if [[ -f "$file" && -r "$file" && -s "$file" ]]; then
    echo "File is ready to process"
fi

# Inline with &&  (short-circuit: only runs second command if first succeeds)
[[ -f "$file" ]] && process_file "$file"

# Inline with || (run on failure)
[[ -d "/tmp/workdir" ]] || mkdir -p "/tmp/workdir"

# Multiple checks at once
for f in /etc/passwd /etc/hosts /etc/resolv.conf; do
    [[ -r "$f" ]] && echo "OK: $f" || echo "MISSING: $f"
done</code></pre>
</div>

<h2>4. Checking Directories and Symlinks</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">#!/bin/bash

# Directory check
dir="/var/data"
if [[ -d "$dir" ]]; then
    echo "Directory exists"
else
    echo "Not a directory (or doesn't exist)"
fi

# Symlink: -L checks the link itself; -f follows the link
link="/usr/local/bin/python"
if [[ -L "$link" ]]; then
    target=$(readlink "$link")
    echo "Symlink → $target"
    if [[ -f "$link" ]]; then
        echo "Target exists and is a file"
    else
        echo "WARNING: broken symlink"
    fi
fi</code></pre>
</div>

<h2>5. Checking if a File is Empty</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">log="/var/log/app.log"

# -s is true if file exists AND has size > 0
if [[ -s "$log" ]]; then
    echo "Log has content — $(wc -l < "$log") lines"
else
    echo "Log is empty or missing"
fi

# Alternative: check line count
lines=$(wc -l < "$log" 2>/dev/null)
if (( lines > 0 )); then
    echo "$lines lines in log"
fi</code></pre>
</div>

<h2>6. A Safe Script Pattern</h2>

<p>Here's a production-ready pattern that validates all inputs before doing anything risky:</p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">#!/bin/bash
set -euo pipefail

INPUT="$1"
OUTPUT_DIR="$2"

# Validate inputs before any processing
[[ -z "$INPUT" ]]      && { echo "Usage: $0 <input> <output_dir>" >&2; exit 1; }
[[ -f "$INPUT" ]]      || { echo "ERROR: Input file not found: $INPUT" >&2; exit 1; }
[[ -r "$INPUT" ]]      || { echo "ERROR: Cannot read: $INPUT" >&2; exit 1; }
[[ -s "$INPUT" ]]      || { echo "ERROR: Input file is empty: $INPUT" >&2; exit 1; }
[[ -d "$OUTPUT_DIR" ]] || mkdir -p "$OUTPUT_DIR"
[[ -w "$OUTPUT_DIR" ]] || { echo "ERROR: Cannot write to: $OUTPUT_DIR" >&2; exit 1; }

echo "All checks passed — processing..."
# ... rest of script</code></pre>
</div>

<p>Pair file existence checks with proper exit codes — see the <a href="/bash-exit-codes/">bash exit codes guide</a> for how to signal specific failure types. For reading the file once you've confirmed it exists, see <a href="/bash-read-file-line-by-line/">bash read file line by line</a>.</p>

<h2>Summary</h2>

<p>Use <code>-f</code> to check for regular files, <code>-d</code> for directories, <code>-r/-w/-x</code> for permissions, and <code>-s</code> for non-empty. Prefer <code>[[ ]]</code> over <code>[ ]</code> in Bash scripts for cleaner syntax and fewer quoting surprises. Always validate files at the start of scripts that operate on external inputs.</p>
