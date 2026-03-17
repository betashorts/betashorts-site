---
layout: post
title: "Bash sed Command: Find, Replace, and Edit Files From the Terminal"
date: 2026-03-17
lang: "en"
meta: '<meta name="description" content="Bash sed command guide: find and replace, in-place editing, delete lines, append/insert, multi-command sed, and practical examples for config files and logs."><meta name="keywords" content="bash sed, sed command linux, sed replace string, sed tutorial, sed -i in-place"><meta name="author" content="Beta Shorts"><meta name="robots" content="index, follow"><link rel="canonical" href="https://betashorts.com/bash-sed-command">'
tags: [Bash, Linux, sed, Text Processing, Scripting]
---

<p>The bash <code>sed</code> command (stream editor) processes text line by line — finding patterns, replacing content, deleting lines, and inserting text — making it indispensable for modifying config files, cleaning log output, or batch-editing text. The learning curve feels steep at first because sed's syntax is dense, but a handful of patterns cover 90% of real-world use cases. This tutorial walks through every major sed operation with practical examples.</p>

<figure style="max-width:560px;margin:2rem auto;text-align:center;">
<svg viewBox="0 0 560 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;border-radius:8px;">
  <rect width="560" height="160" fill="#0D1117" rx="8"/>
  <rect width="560" height="160" fill="none" stroke="#30363D" stroke-width="1" rx="8"/>
  <!-- Before panel -->
  <rect x="10" y="10" width="220" height="140" fill="#161B22" rx="4" stroke="#30363D" stroke-width="1"/>
  <text x="120" y="30" font-family="'JetBrains Mono',monospace" font-size="10" fill="#8B949E" text-anchor="middle">before</text>
  <text x="24" y="54" font-family="'JetBrains Mono',monospace" font-size="11" fill="#E6EDF3">host=localhost</text>
  <text x="24" y="76" font-family="'JetBrains Mono',monospace" font-size="11" fill="#8B949E">port=5432</text>
  <text x="24" y="98" font-family="'JetBrains Mono',monospace" font-size="11">
    <tspan fill="#E6EDF3">db=</tspan>
    <tspan fill="#FF7B72">oldname</tspan>
  </text>
  <text x="24" y="120" font-family="'JetBrains Mono',monospace" font-size="11" fill="#8B949E">user=admin</text>
  <!-- Arrow + sed label -->
  <rect x="245" y="68" width="70" height="24" fill="#161B22" rx="4" stroke="#30363D" stroke-width="1"/>
  <text x="280" y="84" font-family="'JetBrains Mono',monospace" font-size="12" fill="#FFA657" text-anchor="middle">→ sed</text>
  <!-- After panel -->
  <rect x="330" y="10" width="220" height="140" fill="#161B22" rx="4" stroke="#30363D" stroke-width="1"/>
  <text x="440" y="30" font-family="'JetBrains Mono',monospace" font-size="10" fill="#8B949E" text-anchor="middle">after</text>
  <text x="344" y="54" font-family="'JetBrains Mono',monospace" font-size="11" fill="#E6EDF3">host=localhost</text>
  <text x="344" y="76" font-family="'JetBrains Mono',monospace" font-size="11" fill="#8B949E">port=5432</text>
  <text x="344" y="98" font-family="'JetBrains Mono',monospace" font-size="11">
    <tspan fill="#E6EDF3">db=</tspan>
    <tspan fill="#79C0FF">newname</tspan>
  </text>
  <text x="344" y="120" font-family="'JetBrains Mono',monospace" font-size="11" fill="#8B949E">user=admin</text>
</svg>
<figcaption style="color:#6b7280;font-size:0.85rem;margin-top:0.5rem;">sed replaces "oldname" with "newname" — one command transforms the matching line</figcaption>
</figure>

<h2>1. Basic Find and Replace</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">bash</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;"># Basic: replace first occurrence per line
sed 's/old/new/' file.txt

# /g flag: replace ALL occurrences per line
sed 's/old/new/g' file.txt

# /i flag: case-insensitive replace (GNU sed only)
sed 's/error/WARNING/gi' file.txt

# Combine flags
sed 's/old/new/gI' file.txt    # global + case-insensitive

# Use different delimiter (helpful when pattern contains /)
sed 's|/usr/local|/opt|g' paths.txt

# Preview output (doesn't modify file)
sed 's/old/new/g' file.txt</code></pre>
</div>

<h2>2. In-Place Editing with -i</h2>

<p>To modify a file directly instead of printing to stdout, use <code>-i</code>:</p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">bash</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;"># Modify file in-place (Linux/GNU sed)
sed -i 's/old/new/g' file.txt

# macOS requires an extension argument (use empty string for no backup)
sed -i '' 's/old/new/g' file.txt

# Create a backup before editing (adds .bak suffix)
sed -i.bak 's/old/new/g' file.txt
# Creates file.txt.bak (original) and modifies file.txt

# Replace in multiple files
sed -i 's/old/new/g' *.conf
sed -i 's/localhost/192.168.1.10/g' config/*.yaml</code></pre>
</div>

<h2>3. Deleting Lines</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;"># Delete lines matching a pattern
sed '/^#/d' config.txt          # delete comment lines (start with #)
sed '/^$/d' file.txt            # delete blank lines
sed '/error/d' app.log          # delete lines containing "error"

# Delete by line number
sed '5d' file.txt               # delete line 5
sed '3,7d' file.txt             # delete lines 3 through 7
sed '$d' file.txt               # delete last line

# Delete from pattern to end of file
sed '/^START/,/^END/d' file.txt  # delete everything between START and END lines</code></pre>
</div>

<h2>4. Print Specific Lines</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;"># -n suppresses automatic printing; p prints matching lines
sed -n '5p' file.txt            # print only line 5
sed -n '3,7p' file.txt          # print lines 3 to 7
sed -n '/ERROR/p' app.log       # print only lines containing ERROR

# Print lines NOT matching (like grep -v)
sed -n '/^#/!p' config.txt      # print non-comment lines</code></pre>
</div>

<h2>5. Insert and Append Lines</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;"># Append line AFTER matching line (a command)
sed '/^HOST=/a PORT=5432' config.txt

# Insert line BEFORE matching line (i command)
sed '/^[Service]/i [Unit]' systemd.conf

# Replace entire matching line (c command)
sed '/^db_host=/c db_host=newserver.example.com' config.ini</code></pre>
</div>

<h2>6. Multiple Commands with -e</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;"># Run multiple sed expressions in one pass
sed -e 's/foo/bar/g' -e 's/baz/qux/g' -e '/^#/d' file.txt

# Equivalent using semicolons
sed 's/foo/bar/g; s/baz/qux/g; /^#/d' file.txt

# Practical: clean a config file
sed -i \
    -e 's/localhost/10.0.0.5/g' \
    -e '/^#/d' \
    -e '/^$/d' \
    app.conf</code></pre>
</div>

<h2>7. Practical Examples</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;"># Add a prefix to every line
sed 's/^/PREFIX: /' file.txt

# Remove trailing whitespace from all lines
sed -i 's/[[:space:]]*$//' file.txt

# Remove HTML tags
sed 's/<[^>]*>//g' page.html

# Strip ANSI color codes from terminal output
sed 's/\x1b\[[0-9;]*m//g' colored-output.txt

# Comment out a specific line in a config
sed -i '/^PasswordAuthentication yes/s/^/#/' /etc/ssh/sshd_config

# Replace only in lines matching a pattern (address + command)
sed '/^server_name/s/example.com/newdomain.com/' nginx.conf

# Batch rename: add prefix to all filenames listed in a file
cat filelist.txt | sed 's/^/mv /' | bash   # generates mv commands</code></pre>
</div>

<p>For text searching before editing, combine sed with the <a href="/bash-grep-tutorial/">bash grep tutorial</a>. For multi-line transformations and structured data, awk is often cleaner than sed. For simple string operations within a Bash script without forking a process, see <a href="/bash-string-manipulation/">bash string manipulation</a>.</p>

<h2>Summary</h2>

<p>The core sed syntax is <code>sed 's/pattern/replacement/flags'</code>. Add <code>/g</code> for global replace, <code>-i</code> for in-place editing, and <code>/d</code> to delete matching lines. Use <code>-n</code> with <code>p</code> to print specific lines. Combine multiple operations with <code>-e</code> or semicolons. When editing files, always either create a backup with <code>-i.bak</code> or preview the change first without <code>-i</code>.</p>
