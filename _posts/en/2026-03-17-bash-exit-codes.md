---
layout: post
title: "Bash Exit Codes: What $? Means and How to Use It"
date: 2026-03-17
lang: "en"
meta: '<meta name="description" content="Bash exit codes explained: what $? means, the complete exit code reference (0, 1, 126, 127, 130), set -e, set -o pipefail, trap, and a full error-handling pattern."><meta name="keywords" content="bash exit code, bash $?, bash return code, bash error handling, bash set -e"><meta name="author" content="Beta Shorts"><meta name="robots" content="index, follow"><link rel="canonical" href="https://betashorts.com/bash-exit-codes">'
tags: [Bash, Linux, Error Handling, Scripting, DevOps]
---

<p>Bash exit codes are how processes communicate success or failure to the shell. Every command you run exits with a number — 0 means success, anything else means something went wrong. Understanding <code>$?</code>, the built-in exit code reference, and the error-handling flags like <code>set -e</code> and <code>set -o pipefail</code> is what separates scripts that fail silently from scripts that fail loudly and helpfully.</p>

<figure style="max-width:400px;margin:2rem auto;text-align:center;">
<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;border-radius:8px;">
  <rect width="400" height="200" fill="#0D1117" rx="8"/>
  <rect width="400" height="200" fill="none" stroke="#30363D" stroke-width="1" rx="8"/>
  <!-- Rows -->
  <text x="28" y="34" font-family="'JetBrains Mono',monospace" font-size="20" fill="#3B82F6">0</text>
  <text x="80" y="34" font-family="'JetBrains Mono',monospace" font-size="13" fill="#86EFAC">Success</text>
  <line x1="0" y1="44" x2="400" y2="44" stroke="#30363D" stroke-width="0.5"/>

  <text x="28" y="68" font-family="'JetBrains Mono',monospace" font-size="20" fill="#3B82F6">1</text>
  <text x="80" y="68" font-family="'JetBrains Mono',monospace" font-size="13" fill="#E8726A">General error</text>
  <line x1="0" y1="78" x2="400" y2="78" stroke="#30363D" stroke-width="0.5"/>

  <text x="20" y="102" font-family="'JetBrains Mono',monospace" font-size="20" fill="#3B82F6">2</text>
  <text x="80" y="102" font-family="'JetBrains Mono',monospace" font-size="13" fill="#FFA657">Shell misuse / bad syntax</text>
  <line x1="0" y1="112" x2="400" y2="112" stroke="#30363D" stroke-width="0.5"/>

  <text x="16" y="136" font-family="'JetBrains Mono',monospace" font-size="17" fill="#3B82F6">126</text>
  <text x="80" y="136" font-family="'JetBrains Mono',monospace" font-size="13" fill="#FFA657">Permission denied</text>
  <line x1="0" y1="146" x2="400" y2="146" stroke="#30363D" stroke-width="0.5"/>

  <text x="16" y="170" font-family="'JetBrains Mono',monospace" font-size="17" fill="#3B82F6">127</text>
  <text x="80" y="170" font-family="'JetBrains Mono',monospace" font-size="13" fill="#FFA657">Command not found</text>
  <line x1="0" y1="180" x2="400" y2="180" stroke="#30363D" stroke-width="0.5"/>

  <text x="16" y="196" font-family="'JetBrains Mono',monospace" font-size="17" fill="#3B82F6">130</text>
  <text x="80" y="196" font-family="'JetBrains Mono',monospace" font-size="13" fill="#8B949E">Ctrl+C (SIGINT)</text>
</svg>
<figcaption style="color:#6b7280;font-size:0.85rem;margin-top:0.5rem;">The most important bash exit codes and their meanings</figcaption>
</figure>

<h2>1. What $? Is and How to Use It</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">bash</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">#!/bin/bash

# $? holds the exit code of the LAST command
ls /etc/hosts
echo "$?"    # 0 (file exists, command succeeded)

ls /nonexistent
echo "$?"    # 2 (ls failed — file not found)

# Check immediately — $? changes after EVERY command
grep "root" /etc/passwd
status=$?    # save $? before it gets overwritten
echo "grep exited with: $status"

# Typical pattern: check and act
if ! cp source.txt dest.txt; then
    echo "Copy failed with exit code $?" >&2
    exit 1
fi</code></pre>
</div>

<h2>2. Complete Exit Code Reference</h2>

<ul>
<li><strong>0</strong> — Success. Command completed without errors.</li>
<li><strong>1</strong> — General error. Many commands use this as a catch-all failure code.</li>
<li><strong>2</strong> — Misuse of shell built-ins (e.g., bad arguments to <code>cd</code>, syntax errors in scripts).</li>
<li><strong>126</strong> — Command found but not executable (permission denied or not a program).</li>
<li><strong>127</strong> — Command not found. Usually a typo or missing PATH entry.</li>
<li><strong>128</strong> — Invalid exit argument (used in scripts that call <code>exit 256</code> — wraps to 0, so avoid).</li>
<li><strong>128+n</strong> — Fatal error signal n. Exit 137 = killed by signal 9 (SIGKILL). Exit 143 = signal 15 (SIGTERM).</li>
<li><strong>130</strong> — Script terminated by Ctrl+C (128 + SIGINT signal 2).</li>
<li><strong>255</strong> — Exit status out of range (if you pass a value > 255 to <code>exit</code>).</li>
</ul>

<h2>3. exit — Setting Your Own Exit Codes</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">#!/bin/bash

# exit 0: success
# exit 1: general error (most scripts use 1 for all failures)
# exit 2+: meaningful codes for callers to distinguish errors

INPUT="$1"

[[ -z "$INPUT" ]] && { echo "Usage: $0 <file>" >&2; exit 1; }
[[ -f "$INPUT" ]] || { echo "File not found: $INPUT" >&2; exit 2; }
[[ -r "$INPUT" ]] || { echo "Permission denied: $INPUT" >&2; exit 3; }

# Process the file...
echo "Processing $INPUT"
exit 0   # explicit success (optional — script exits 0 if last command succeeded)</code></pre>
</div>

<h2>4. set -e, set -u, set -o pipefail</h2>

<p>The "strict mode" trio for production scripts:</p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">bash</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">#!/bin/bash
set -euo pipefail
# -e: exit immediately if any command fails (non-zero exit)
# -u: treat unset variables as errors
# -o pipefail: pipeline fails if ANY command in it fails (not just the last)

# Without pipefail, this hides the grep failure:
# grep "ERROR" /nonexistent/file | wc -l   → prints 0 and exits 0 (wrong!)
# With pipefail, the script correctly exits non-zero

# -e gotcha: use || true to allow expected failures
rm -f optional-file.txt || true   # won't abort script if file doesn't exist
grep "pattern" file.txt || true   # grep exit 1 if no match — OK here

# -u gotcha: check variable is set before using it
filename="${1:-}"  # use default empty string instead of failing
[[ -n "$filename" ]] || { echo "Filename required" >&2; exit 1; }</code></pre>
</div>

<h2>5. trap for Cleanup on Exit</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">#!/bin/bash
set -euo pipefail

TMPDIR=$(mktemp -d)

# cleanup() runs no matter how the script exits (success, error, or Ctrl+C)
cleanup() {
    echo "Cleaning up temporary files..." >&2
    rm -rf "$TMPDIR"
}
trap cleanup EXIT   # EXIT fires on any exit

# SIGINT (Ctrl+C) and SIGTERM handlers
trap 'echo "Interrupted" >&2; exit 130' INT
trap 'echo "Terminated" >&2; exit 143' TERM

# Script body — TMPDIR will be cleaned up regardless
echo "Working in $TMPDIR"
cp /etc/hosts "$TMPDIR/hosts.bak"
# ... do work ...
echo "Done"</code></pre>
</div>

<h2>6. Complete Error Handling Pattern</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">#!/bin/bash
set -euo pipefail

# Centralized error handler
error_exit() {
    echo "[ERROR] Line ${2:-unknown}: ${1}" >&2
    exit "${3:-1}"
}
trap 'error_exit "Unexpected failure" $LINENO' ERR

# Cleanup handler
TMPFILE=""
cleanup() { [[ -n "$TMPFILE" ]] && rm -f "$TMPFILE"; }
trap cleanup EXIT

# Input validation
[[ $# -lt 1 ]] && error_exit "Usage: $0 <input_file>" $LINENO 1
INPUT="$1"
[[ -f "$INPUT" ]] || error_exit "File not found: $INPUT" $LINENO 2

TMPFILE=$(mktemp)
process_data() {
    cp "$INPUT" "$TMPFILE"
    # ... processing ...
    echo "Processed: $TMPFILE"
}

process_data
echo "Script completed successfully"
exit 0</code></pre>
</div>

<p>Exit codes work hand-in-hand with <a href="/bash-function-examples/">bash functions</a> where functions signal success or failure via return codes. For checking file conditions that might cause non-zero exits, see the <a href="/bash-check-if-file-exists/">bash check if file exists guide</a>.</p>

<h2>Summary</h2>

<p><code>$?</code> holds the last exit code. 0 is success, 1 is general error, 127 is command not found. Always use <code>set -euo pipefail</code> in production scripts to catch failures early. Use <code>trap cleanup EXIT</code> to ensure cleanup runs regardless of how the script exits. Define meaningful exit codes (2, 3, etc.) so callers can distinguish failure types.</p>
