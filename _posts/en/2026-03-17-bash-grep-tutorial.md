---
layout: post
title: "Bash grep Tutorial: Search, Filter, and Extract Text Like a Pro"
date: 2026-03-17
lang: "en"
meta: '<meta name="description" content="Bash grep tutorial: all essential flags (-i, -r, -n, -v, -A/-B/-C), regex patterns, grep AND/OR/NOT, practical log analysis examples, and grep performance tips."><meta name="keywords" content="bash grep, grep command examples, grep regex bash, grep -r recursive, grep tutorial linux"><meta name="author" content="Beta Shorts"><meta name="robots" content="index, follow"><link rel="canonical" href="https://betashorts.com/bash-grep-tutorial">'
tags: [Bash, Linux, grep, Text Processing, Scripting]
---

<p>Bash grep is one of the most-used command-line tools — it searches file contents for patterns and prints matching lines. Whether you're scanning logs for errors, filtering command output, or extracting specific data from text files, grep is the fastest way to find what you need. This tutorial covers all essential grep flags, regex patterns, AND/OR/NOT searches, and real-world log analysis examples.</p>

<figure style="max-width:560px;margin:2rem auto;text-align:center;">
<svg viewBox="0 0 560 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;border-radius:8px;">
  <rect width="560" height="180" fill="#0D1117" rx="8"/>
  <rect width="560" height="180" fill="none" stroke="#30363D" stroke-width="1" rx="8"/>
  <!-- Terminal chrome -->
  <rect x="0" y="0" width="560" height="30" fill="#161B22" rx="8"/>
  <rect x="0" y="18" width="560" height="12" fill="#161B22"/>
  <circle cx="18" cy="15" r="5" fill="#FF5F57"/>
  <circle cx="36" cy="15" r="5" fill="#FFBD2E"/>
  <circle cx="54" cy="15" r="5" fill="#28C840"/>
  <!-- Command line -->
  <text x="20" y="56" font-family="'JetBrains Mono',monospace" font-size="13">
    <tspan fill="#8B949E">$ </tspan>
    <tspan fill="#E6EDF3">grep </tspan>
    <tspan fill="#FFA657">-r </tspan>
    <tspan fill="#79C0FF">'ERROR'</tspan>
    <tspan fill="#8B949E"> /var/log/</tspan>
  </text>
  <!-- Output lines with highlight -->
  <text x="20" y="86" font-family="'JetBrains Mono',monospace" font-size="12" fill="#8B949E">/var/log/app.log:42: 2026-01-15 09:23:11 </text>
  <rect x="348" y="73" width="42" height="16" fill="#FFBD2E" opacity="0.3" rx="2"/>
  <text x="350" y="86" font-family="'JetBrains Mono',monospace" font-size="12" fill="#FFBD2E">ERROR</text>
  <text x="390" y="86" font-family="'JetBrains Mono',monospace" font-size="12" fill="#8B949E"> database timeout</text>
  <text x="20" y="112" font-family="'JetBrains Mono',monospace" font-size="12" fill="#8B949E">/var/log/app.log:87: 2026-01-15 10:11:55 </text>
  <rect x="348" y="99" width="42" height="16" fill="#FFBD2E" opacity="0.3" rx="2"/>
  <text x="350" y="112" font-family="'JetBrains Mono',monospace" font-size="12" fill="#FFBD2E">ERROR</text>
  <text x="390" y="112" font-family="'JetBrains Mono',monospace" font-size="12" fill="#8B949E"> connection refused</text>
  <text x="20" y="138" font-family="'JetBrains Mono',monospace" font-size="12" fill="#8B949E">/var/log/nginx/error.log:3: </text>
  <rect x="206" y="125" width="42" height="16" fill="#FFBD2E" opacity="0.3" rx="2"/>
  <text x="208" y="138" font-family="'JetBrains Mono',monospace" font-size="12" fill="#FFBD2E">ERROR</text>
  <text x="248" y="138" font-family="'JetBrains Mono',monospace" font-size="12" fill="#8B949E"> worker process failed</text>
  <text x="20" y="164" font-family="'JetBrains Mono',monospace" font-size="11" fill="#8B949E">3 matches across 2 files</text>
</svg>
<figcaption style="color:#6b7280;font-size:0.85rem;margin-top:0.5rem;">grep -r searches recursively and highlights the matching pattern in each output line</figcaption>
</figure>

<h2>1. Essential grep Flags</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">bash</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;"># -i  case insensitive
grep -i "error" /var/log/app.log

# -r  recursive (search all files in directory)
grep -r "TODO" /home/user/projects/

# -n  show line numbers
grep -n "ERROR" /var/log/app.log

# -c  count matching lines (not print them)
grep -c "ERROR" /var/log/app.log    # → 42

# -v  invert match (print lines that do NOT match)
grep -v "^#" /etc/hosts    # print non-comment lines

# -l  list only filenames with matches
grep -rl "password" /etc/   # find files containing "password"

# -w  whole word match only
grep -w "fail" logfile.txt   # won't match "failure" or "failover"

# -A  N lines After match
# -B  N lines Before match
# -C  N lines of Context (both before and after)
grep -A 3 "ERROR" app.log   # print matching line + 3 lines after
grep -C 5 "CRASH" app.log   # 5 lines before AND after each match</code></pre>
</div>

<h2>2. Basic Regex Patterns</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">bash</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;"># ^ anchors to start of line
grep "^root" /etc/passwd    # lines starting with "root"

# $ anchors to end of line
grep "bash$" /etc/passwd    # lines ending with "bash"

# . matches any single character
grep "t.st" file.txt        # matches "test", "tast", "t3st"

# * zero or more of preceding char
grep "erro*r" file.txt      # "errr", "error", "errorr"

# [] character class
grep "[Ee]rror" file.txt    # "Error" or "error"
grep "[0-9]" file.txt       # lines containing any digit

# [^] negated character class
grep "[^0-9]" file.txt      # lines with any non-digit

# Extended regex with -E (or egrep)
grep -E "error|warning|critical" app.log  # OR
grep -E "^[0-9]{4}-[0-9]{2}" log.txt      # date-like lines</code></pre>
</div>

<h2>3. AND, OR, NOT Searches</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;"># OR — extended regex
grep -E "error|warning" app.log
grep -e "error" -e "warning" app.log   # equivalent

# AND — pipe two greps
grep "error" app.log | grep "database"   # lines with BOTH

# NOT — invert
grep -v "debug" app.log      # exclude debug lines

# Combining: lines with "error" but NOT "404"
grep "error" app.log | grep -v "404"

# Count lines matching AND pattern
grep -c "ERROR" app.log      # total error lines
grep "ERROR" app.log | grep -c "database"   # database errors only</code></pre>
</div>

<h2>4. Practical Log Analysis Examples</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">log="/var/log/nginx/access.log"

# Find all 404 errors
grep ' 404 ' "$log"

# Count 500 errors
grep -c ' 500 ' "$log"

# Find all requests from a specific IP
grep "^192.168.1.100" "$log"

# Find slowest requests (over 2 seconds in response time field)
grep -E '"[0-9.]+" [0-9]+ [0-9]+ [2-9]\.' "$log"

# Find failed SSH login attempts
grep "Failed password" /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -rn

# Find all unique IPs in an nginx log
grep -oE '[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+' "$log" | sort -u

# Check if a config option is set
grep -q "ssl_certificate" /etc/nginx/nginx.conf && echo "SSL configured"</code></pre>
</div>

<h2>5. grep with Pipes</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;"># Filter running processes
ps aux | grep "nginx" | grep -v "grep"

# Find listening ports
ss -tlnp | grep ":80 "

# Search command history
history | grep "git push"

# Filter Docker containers
docker ps | grep "running"

# Find environment variables matching a pattern
env | grep -i "path"</code></pre>
</div>

<h2>6. Performance on Large Files</h2>

<p>For files with millions of lines, grep is very fast because it's compiled C. A few tips to make it faster:</p>

<ul>
<li>Use <code>-F</code> (fixed string) instead of regex when searching for a literal string — it's significantly faster</li>
<li>Use <code>-l</code> to stop after finding the first match per file</li>
<li>Use <code>LC_ALL=C grep</code> to bypass Unicode processing when files are ASCII</li>
<li>Prefer <code>grep -r</code> with a <code>--include="*.log"</code> filter rather than grepping all files</li>
</ul>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;"># Fixed-string search (no regex, much faster for literals)
grep -F "exact string to find" bigfile.log

# Restrict recursive search to specific file types
grep -r --include="*.py" "import os" /projects/

# Fast ASCII search
LC_ALL=C grep "ERROR" /var/log/huge.log</code></pre>
</div>

<p>For processing the matched lines further — extracting columns, summing values — combine grep with the <a href="/bash-sed-command/">bash sed command</a> or awk. For file-by-file operations, see the <a href="/bash-check-if-file-exists/">bash file existence check guide</a> to verify files before grepping them.</p>

<h2>Summary</h2>

<p>The workhorse flags are <code>-i</code> (case insensitive), <code>-r</code> (recursive), <code>-n</code> (line numbers), <code>-v</code> (invert), <code>-c</code> (count), <code>-l</code> (filenames only), and <code>-C N</code> (context lines). Use <code>-E</code> for extended regex with <code>|</code> OR patterns. Pipe grep outputs together for AND logic, and use <code>-F</code> when searching for literal strings in large files.</p>
