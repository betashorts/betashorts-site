---
layout: post
title: "Bash Read File Line by Line: 5 Methods Explained"
date: 2026-03-17
lang: "en"
meta: '<meta name="description" content="Bash read file line by line: 5 tested methods including while read, readarray, and awk. Includes IFS pitfalls, trailing newline handling, and large-file performance."><meta name="keywords" content="bash read file line by line, while read line bash, bash read file, IFS read bash"><meta name="author" content="Beta Shorts"><meta name="robots" content="index, follow"><link rel="canonical" href="https://betashorts.com/bash-read-file-line-by-line">'
tags: [Bash, Linux, File Processing, Scripting]
---

<p>Reading a file line by line is one of the most common tasks in Bash scripting, but getting it right requires understanding a few subtle pitfalls. The naive approach works for simple cases but breaks on files with spaces, backslashes, or missing trailing newlines. This guide covers 5 bash read file methods — from the safest general-purpose approach to specialized tools for arrays and stream processing — so you can pick the right one every time.</p>

<figure style="max-width:560px;margin:2rem auto;text-align:center;">
<svg viewBox="0 0 560 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;border-radius:8px;">
  <rect width="560" height="160" fill="#0D1117" rx="8"/>
  <rect width="560" height="160" fill="none" stroke="#30363D" stroke-width="1" rx="8"/>
  <!-- Left panel: Recommended -->
  <rect x="10" y="10" width="258" height="140" fill="#161B22" rx="6" stroke="#3B82F6" stroke-width="2"/>
  <text x="139" y="32" font-family="'JetBrains Mono',monospace" font-size="10" fill="#3B82F6" text-anchor="middle">✓ RECOMMENDED</text>
  <text x="139" y="50" font-family="'JetBrains Mono',monospace" font-size="11" fill="#E6EDF3" text-anchor="middle">Method 1: while read</text>
  <text x="24" y="72" font-family="'JetBrains Mono',monospace" font-size="10" fill="#79C0FF">while</text>
  <text x="63" y="72" font-family="'JetBrains Mono',monospace" font-size="10" fill="#FFA657">IFS=</text>
  <text x="93" y="72" font-family="'JetBrains Mono',monospace" font-size="10" fill="#E6EDF3">read -r line; do</text>
  <text x="24" y="90" font-family="'JetBrains Mono',monospace" font-size="10" fill="#E6EDF3">  echo "$line"</text>
  <text x="24" y="108" font-family="'JetBrains Mono',monospace" font-size="10" fill="#79C0FF">done</text>
  <text x="24" y="122" font-family="'JetBrains Mono',monospace" font-size="10" fill="#FF7B72">&lt;</text>
  <text x="34" y="122" font-family="'JetBrains Mono',monospace" font-size="10" fill="#79C0FF">"$file"</text>
  <text x="24" y="144" font-family="'JetBrains Mono',monospace" font-size="10" fill="#8B949E">handles all edge cases</text>
  <!-- Right panel: Avoid -->
  <rect x="292" y="10" width="258" height="140" fill="#161B22" rx="6" stroke="#30363D" stroke-width="1"/>
  <text x="421" y="32" font-family="'JetBrains Mono',monospace" font-size="10" fill="#8B949E" text-anchor="middle">for loop (word-splits)</text>
  <text x="421" y="50" font-family="'JetBrains Mono',monospace" font-size="11" fill="#E6EDF3" text-anchor="middle">Method 2: for loop</text>
  <text x="306" y="72" font-family="'JetBrains Mono',monospace" font-size="10" fill="#79C0FF">for</text>
  <text x="326" y="72" font-family="'JetBrains Mono',monospace" font-size="10" fill="#E6EDF3">line in $(</text>
  <text x="395" y="72" font-family="'JetBrains Mono',monospace" font-size="10" fill="#FF7B72">cat</text>
  <text x="415" y="72" font-family="'JetBrains Mono',monospace" font-size="10" fill="#79C0FF">"$f"</text>
  <text x="440" y="72" font-family="'JetBrains Mono',monospace" font-size="10" fill="#E6EDF3">); do</text>
  <text x="306" y="90" font-family="'JetBrains Mono',monospace" font-size="10" fill="#E6EDF3">  echo "$line"</text>
  <text x="306" y="108" font-family="'JetBrains Mono',monospace" font-size="10" fill="#79C0FF">done</text>
  <text x="306" y="130" font-family="'JetBrains Mono',monospace" font-size="10" fill="#FF7B72">⚠ splits on spaces</text>
</svg>
<figcaption style="color:#6b7280;font-size:0.85rem;margin-top:0.5rem;">Method 1 (blue border) is the recommended approach — Method 2 breaks on filenames with spaces</figcaption>
</figure>

<h2>1. while IFS= read -r (The Right Way)</h2>

<p>This is the correct, portable approach for reading any file line by line:</p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">bash</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">#!/bin/bash

file="/etc/hosts"

while IFS= read -r line; do
    echo "$line"
done < "$file"</code></pre>
</div>

<p>Two flags make this work correctly for all cases:</p>
<ul>
<li><strong><code>IFS=</code></strong> (empty IFS) — prevents <code>read</code> from stripping leading and trailing whitespace from each line. Without it, lines beginning with spaces get trimmed.</li>
<li><strong><code>-r</code></strong> (raw mode) — prevents <code>read</code> from treating backslashes as escape characters. Without it, a line like <code>C:\Users\name</code> becomes <code>C:Usersname</code>.</li>
</ul>

<p>The <code>&lt; "$file"</code> redirection at the end feeds the file into the while loop. This runs faster than piping through <code>cat</code> because it avoids spawning a subshell.</p>

<h2>2. for Loop with cat (Avoid for Line Reading)</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">bash</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">#!/bin/bash

# AVOID for line-by-line reading — splits on spaces, not just newlines
for line in $(cat /etc/hosts); do
    echo "$line"
done

# A line like "127.0.0.1   localhost" becomes three iterations:
# "127.0.0.1", "localhost"
# The comment field and extra spaces disappear entirely</code></pre>
</div>

<p>The problem: Bash performs word splitting on the output of <code>$(cat file)</code>. It splits on any whitespace (spaces, tabs, newlines), not just newlines. Use this only if you genuinely want word-by-word iteration.</p>

<h2>3. readarray / mapfile (Load into an Array)</h2>

<p>When you need random access to lines or to process them multiple times, load the whole file into an array:</p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">bash</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">#!/bin/bash

# mapfile and readarray are synonyms (Bash 4+)
mapfile -t lines < /etc/hosts

# Access by index
echo "Line 1: ${lines[0]}"
echo "Line 5: ${lines[4]}"
echo "Total lines: ${#lines[@]}"

# Loop over the array
for line in "${lines[@]}"; do
    echo "$line"
done</code></pre>
</div>

<p>The <code>-t</code> flag strips the trailing newline character from each element. Without it every element ends with <code>\n</code>. This method requires Bash 4+ (not available on macOS default shell — use <code>brew install bash</code> or Method 1 instead).</p>

<h2>4. Process Substitution</h2>

<p>When you need to read from a command's output rather than a file:</p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">#!/bin/bash

# Process substitution: read from a command's output line by line
while IFS= read -r line; do
    echo "Process: $line"
done < <(ps aux | grep nginx)

# Or read from a filtered file
while IFS= read -r line; do
    echo "$line"
done < <(grep -v '^#' /etc/hosts)  # skip comment lines</code></pre>
</div>

<p>The <code>&lt;(command)</code> syntax creates a temporary file descriptor. This avoids the subshell problem you get when piping into a while loop (where variables set inside the loop are lost after it ends).</p>

<h2>5. awk for Complex Per-Line Processing</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">#!/bin/bash

# awk processes line by line automatically — best for structured data
# Print field 1 and field 3 from a colon-delimited file
awk -F: '{print $1, $3}' /etc/passwd

# Skip comment lines and blank lines
awk '!/^#/ && NF > 0 {print $0}' /etc/hosts

# Print lines that match a pattern
awk '/ERROR/ {print NR": "$0}' /var/log/app.log</code></pre>
</div>

<h2>Performance on Large Files</h2>

<p>For files with millions of lines, awk is typically 5-10x faster than a Bash while read loop because awk is compiled C whereas the Bash loop has overhead per iteration. The <code>while IFS= read -r</code> approach is fine for files up to ~100K lines. Above that, prefer awk, sed, or grep for extraction tasks.</p>

<p>For more on file testing before you open a file, see the <a href="/bash-check-if-file-exists/">bash check if file exists guide</a>. To process structured text output, the <a href="/bash-grep-tutorial/">bash grep tutorial</a> complements these methods well.</p>

<h2>Summary</h2>

<p>Use <code>while IFS= read -r line; do ... done &lt; "$file"</code> as your default for line-by-line reading — it handles every edge case correctly. Use <code>mapfile -t</code> when you need array access to the lines. Reach for awk when processing structured data or when performance on large files matters.</p>
