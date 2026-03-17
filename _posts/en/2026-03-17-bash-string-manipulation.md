---
layout: post
title: "Bash String Manipulation: Substring, Replace, Split and More"
date: 2026-03-17
lang: "en"
meta: '<meta name="description" content="Bash string manipulation: complete guide to substring extraction, find and replace, case conversion, prefix/suffix stripping, and splitting strings with real examples."><meta name="keywords" content="bash string manipulation, bash substring, bash string replace, bash split string, bash string operations"><meta name="author" content="Beta Shorts"><meta name="robots" content="index, follow"><link rel="canonical" href="https://betashorts.com/bash-string-manipulation">'
tags: [Bash, Linux, Strings, Scripting]
---

<p>Bash string manipulation uses parameter expansion — a built-in syntax that handles most string operations without any external commands. Understanding <code>${var#prefix}</code>, <code>${var//old/new}</code>, and <code>${var:pos:len}</code> will let you slice, replace, and transform strings entirely within Bash, making your scripts faster and more portable. This guide covers every essential bash string operation with concrete examples.</p>

<figure style="max-width:560px;margin:2rem auto;text-align:center;">
<svg viewBox="0 0 560 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;border-radius:8px;">
  <rect width="560" height="240" fill="#0D1117" rx="8"/>
  <rect width="560" height="240" fill="none" stroke="#30363D" stroke-width="1" rx="8"/>
  <text x="20" y="28" font-family="'JetBrains Mono',monospace" font-size="12" fill="#3B82F6">Operation</text>
  <text x="220" y="28" font-family="'JetBrains Mono',monospace" font-size="12" fill="#3B82F6">Syntax</text>
  <line x1="0" y1="36" x2="560" y2="36" stroke="#30363D" stroke-width="1"/>
  <!-- Rows -->
  <text x="20" y="56" font-family="'JetBrains Mono',monospace" font-size="11" fill="#8B949E">Length</text>
  <text x="220" y="56" font-family="'JetBrains Mono',monospace" font-size="11" fill="#E6EDF3">${#var}</text>
  <line x1="0" y1="64" x2="560" y2="64" stroke="#30363D" stroke-width="1"/>

  <text x="20" y="82" font-family="'JetBrains Mono',monospace" font-size="11" fill="#8B949E">Substring</text>
  <text x="220" y="82" font-family="'JetBrains Mono',monospace" font-size="11"><tspan fill="#E6EDF3">${var:</tspan><tspan fill="#FFA657">pos</tspan><tspan fill="#E6EDF3">:</tspan><tspan fill="#FFA657">len</tspan><tspan fill="#E6EDF3">}</tspan></text>
  <line x1="0" y1="90" x2="560" y2="90" stroke="#30363D" stroke-width="1"/>

  <text x="20" y="108" font-family="'JetBrains Mono',monospace" font-size="11" fill="#8B949E">Replace first</text>
  <text x="220" y="108" font-family="'JetBrains Mono',monospace" font-size="11"><tspan fill="#E6EDF3">${var/</tspan><tspan fill="#FF7B72">old</tspan><tspan fill="#E6EDF3">/</tspan><tspan fill="#79C0FF">new</tspan><tspan fill="#E6EDF3">}</tspan></text>
  <line x1="0" y1="116" x2="560" y2="116" stroke="#30363D" stroke-width="1"/>

  <text x="20" y="134" font-family="'JetBrains Mono',monospace" font-size="11" fill="#8B949E">Replace all</text>
  <text x="220" y="134" font-family="'JetBrains Mono',monospace" font-size="11"><tspan fill="#E6EDF3">${var//</tspan><tspan fill="#FF7B72">old</tspan><tspan fill="#E6EDF3">/</tspan><tspan fill="#79C0FF">new</tspan><tspan fill="#E6EDF3">}</tspan></text>
  <line x1="0" y1="142" x2="560" y2="142" stroke="#30363D" stroke-width="1"/>

  <text x="20" y="160" font-family="'JetBrains Mono',monospace" font-size="11" fill="#8B949E">Uppercase</text>
  <text x="220" y="160" font-family="'JetBrains Mono',monospace" font-size="11" fill="#E6EDF3">${var^^}</text>
  <line x1="0" y1="168" x2="560" y2="168" stroke="#30363D" stroke-width="1"/>

  <text x="20" y="186" font-family="'JetBrains Mono',monospace" font-size="11" fill="#8B949E">Strip prefix</text>
  <text x="220" y="186" font-family="'JetBrains Mono',monospace" font-size="11"><tspan fill="#E6EDF3">${var#</tspan><tspan fill="#FFA657">prefix</tspan><tspan fill="#E6EDF3">}</tspan></text>
  <line x1="0" y1="194" x2="560" y2="194" stroke="#30363D" stroke-width="1"/>

  <text x="20" y="212" font-family="'JetBrains Mono',monospace" font-size="11" fill="#8B949E">Strip suffix</text>
  <text x="220" y="212" font-family="'JetBrains Mono',monospace" font-size="11"><tspan fill="#E6EDF3">${var%</tspan><tspan fill="#FFA657">suffix</tspan><tspan fill="#E6EDF3">}</tspan></text>
  <line x1="200" y1="0" x2="200" y2="240" stroke="#30363D" stroke-width="1"/>
</svg>
<figcaption style="color:#6b7280;font-size:0.85rem;margin-top:0.5rem;">Quick reference for the most-used bash string manipulation operations</figcaption>
</figure>

<h2>1. String Length and Substring Extraction</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">bash</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">str="Hello, World!"

# String length
echo "${#str}"          # 13

# Substring: start at position 7, take 5 characters
echo "${str:7:5}"       # World

# Start at position 7, take everything to the end
echo "${str:7}"         # World!

# Negative position: start 6 chars from the end
echo "${str: -6}"       # World!   (note the space before -)

# Negative position + length
echo "${str: -6:5}"     # World

# Extract filename without extension
filename="report.tar.gz"
echo "${filename%.*}"   # report.tar  (removes last .gz)
echo "${filename%%.*}"  # report      (removes from first dot)</code></pre>
</div>

<p>For negative positions, a space before the minus sign is required: <code>${str: -6}</code>. Without the space, Bash interprets it as the default-value syntax <code>${str:-default}</code>.</p>

<h2>2. Find and Replace</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">bash</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">str="the cat sat on the mat"

# Replace FIRST occurrence
echo "${str/the/a}"       # a cat sat on the mat

# Replace ALL occurrences (double slash)
echo "${str//the/a}"      # a cat sat on a mat

# Delete a substring (replace with nothing)
echo "${str// /}"         # thecatsatonthemat  (remove all spaces)

# Replace using a glob pattern
path="/usr/local/bin/script.sh"
echo "${path/\/usr\/local/~}"    # ~/bin/script.sh

# Case-insensitive replace requires a workaround (use sed for this)
echo "$str" | sed 's/The/a/gi'   # handles case-insensitive</code></pre>
</div>

<h2>3. Case Conversion</h2>

<p>Bash 4+ supports built-in case conversion operators:</p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">bash</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">name="hello world"

echo "${name^^}"    # HELLO WORLD  (all uppercase)
echo "${name,,}"    # hello world  (all lowercase)
echo "${name^}"     # Hello world  (capitalize first char)
echo "${name,}"     # hello world  (lowercase first char)

# Uppercase only certain chars (^[aeiou] = capitalize vowels)
echo "${name^^[aeiou]}"   # hEllO wOrld</code></pre>
</div>

<h2>4. Stripping Prefixes and Suffixes</h2>

<p>The <code>#</code> and <code>%</code> operators strip matched patterns from the start or end of a string. Use one symbol for shortest match, two for longest:</p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">path="/home/user/documents/report.pdf"

# Strip prefix (from the LEFT)
echo "${path#*/}"       # home/user/documents/report.pdf  (strips up to first /)
echo "${path##*/}"      # report.pdf  (strips up to LAST / — greedy)

# Strip suffix (from the RIGHT)
echo "${path%.*}"       # /home/user/documents/report  (strips .pdf)
echo "${path%%.*}"      # /home/user/documents/report  (same here, but watch out with multiple dots)

# Practical: get just the filename
filename="${path##*/}"
echo "$filename"        # report.pdf

# Practical: get directory path
dir="${path%/*}"
echo "$dir"             # /home/user/documents

# Practical: get extension
ext="${filename##*.}"
echo "$ext"             # pdf</code></pre>
</div>

<h2>5. Splitting Strings</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">csv="apple,banana,cherry"

# Split on comma using IFS
IFS=',' read -ra parts <<< "$csv"
echo "${parts[0]}"   # apple
echo "${parts[1]}"   # banana
echo "${parts[2]}"   # cherry

# Loop over parts
for part in "${parts[@]}"; do
    echo "Part: $part"
done

# Split a colon-delimited path
IFS=':' read -ra dirs <<< "$PATH"
for dir in "${dirs[@]}"; do
    echo "$dir"
done</code></pre>
</div>

<h2>6. Trim Whitespace</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">str="   hello world   "

# Trim with xargs (trims both ends)
trimmed=$(echo "$str" | xargs)
echo "$trimmed"   # hello world

# Trim with parameter expansion (leading spaces)
str="${str#"${str%%[![:space:]]*}"}"

# Trim with sed
trimmed=$(echo "$str" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
echo "$trimmed"   # hello world</code></pre>
</div>

<p>For bulk find-and-replace across files, the <a href="/bash-sed-command/">bash sed command guide</a> covers this in depth. For checking whether a string contains a substring, see the <a href="/bash-case-statement/">bash case statement guide</a> which uses pattern matching.</p>

<h2>Summary</h2>

<p>Bash parameter expansion handles all common string operations without forking external processes. The key patterns: <code>${#var}</code> for length, <code>${var:pos:len}</code> for substrings, <code>${var//old/new}</code> for global replace, <code>${var^^}</code>/<code>${var,,}</code> for case, and <code>${var##*/}</code>/<code>${var%.*}</code> for path/extension manipulation.</p>
