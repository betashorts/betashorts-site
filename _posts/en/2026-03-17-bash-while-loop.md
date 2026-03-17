---
layout: post
title: "Bash While Loop: Syntax, Examples, and Common Patterns"
date: 2026-03-17
lang: "en"
meta: '<meta name="description" content="Bash while loop complete guide: syntax, counter loops, infinite loops with break, until loop, C-style while, nested loops, and the most common infinite loop bug explained."><meta name="keywords" content="bash while loop, bash loop, while loop bash examples, bash until loop, bash infinite loop"><meta name="author" content="Beta Shorts"><meta name="robots" content="index, follow"><link rel="canonical" href="https://betashorts.com/bash-while-loop">'
tags: [Bash, Linux, Loops, Scripting]
---

<p>The bash while loop runs a block of commands repeatedly as long as a condition is true. It's the go-to loop when you don't know in advance how many iterations you need — waiting for a condition to change, reading input, or retrying a failing operation. This guide covers all while loop patterns including infinite loops, the until variant, C-style arithmetic loops, and the single most common infinite loop bug beginners hit.</p>

<figure style="max-width:400px;margin:2rem auto;text-align:center;">
<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;border-radius:8px;">
  <rect width="400" height="240" fill="#0D1117" rx="8"/>
  <rect width="400" height="240" fill="none" stroke="#30363D" stroke-width="1" rx="8"/>
  <!-- Condition diamond -->
  <polygon points="200,30 310,80 200,130 90,80" fill="#161B22" stroke="#3B82F6" stroke-width="2"/>
  <text x="200" y="75" font-family="'JetBrains Mono',monospace" font-size="12" fill="#E6EDF3" text-anchor="middle">Condition</text>
  <text x="200" y="92" font-family="'JetBrains Mono',monospace" font-size="12" fill="#E6EDF3" text-anchor="middle">Check</text>
  <!-- true arrow down -->
  <line x1="200" y1="130" x2="200" y2="160" stroke="#3B82F6" stroke-width="1.5"/>
  <text x="210" y="150" font-family="'JetBrains Mono',monospace" font-size="10" fill="#3B82F6">true</text>
  <!-- Execute body box -->
  <rect x="130" y="160" width="140" height="40" fill="#161B22" rx="4" stroke="#30363D" stroke-width="1"/>
  <text x="200" y="184" font-family="'JetBrains Mono',monospace" font-size="12" fill="#E6EDF3" text-anchor="middle">Execute body</text>
  <!-- Loop back arrow -->
  <path d="M 130 180 Q 50 180 50 80 Q 50 30 90 50" fill="none" stroke="#3B82F6" stroke-width="1.5"/>
  <text x="28" y="130" font-family="'JetBrains Mono',monospace" font-size="10" fill="#3B82F6">loop</text>
  <!-- false exit -->
  <line x1="310" y1="80" x2="370" y2="80" stroke="#E8726A" stroke-width="1.5"/>
  <text x="318" y="72" font-family="'JetBrains Mono',monospace" font-size="10" fill="#E8726A">false</text>
  <text x="350" y="95" font-family="'JetBrains Mono',monospace" font-size="10" fill="#E8726A">exit</text>
  <!-- done label -->
  <text x="200" y="224" font-family="'JetBrains Mono',monospace" font-size="11" fill="#8B949E" text-anchor="middle">while condition; do ... done</text>
</svg>
<figcaption style="color:#6b7280;font-size:0.85rem;margin-top:0.5rem;">While loop flow: condition is checked before each iteration; loop exits when condition is false</figcaption>
</figure>

<h2>1. Basic While Loop Syntax</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">bash</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">#!/bin/bash

# Counter loop: count from 1 to 5
count=1
while [[ $count -le 5 ]]; do
    echo "Count: $count"
    count=$(( count + 1 ))   # increment — NEVER forget this!
done

# Output:
# Count: 1
# Count: 2
# Count: 3
# Count: 4
# Count: 5</code></pre>
</div>

<h2>2. Infinite Loop with break</h2>

<p>When you need to run until a condition inside the loop triggers exit, use <code>while true</code> with <code>break</code>:</p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">bash</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">#!/bin/bash

# Wait for a file to appear (poll every 2 seconds)
while true; do
    if [[ -f "/tmp/ready.flag" ]]; then
        echo "Ready flag found — proceeding"
        break
    fi
    echo "Waiting..."
    sleep 2
done

# Interactive menu loop
while true; do
    echo "1) Start  2) Stop  3) Exit"
    read -r choice
    case "$choice" in
        1) echo "Starting..." ;;
        2) echo "Stopping..." ;;
        3) echo "Goodbye"; break ;;
        *) echo "Invalid choice" ;;
    esac
done</code></pre>
</div>

<h2>3. The until Loop</h2>

<p><code>until</code> is the inverse of <code>while</code> — it runs while the condition is <em>false</em>, stopping when it becomes true:</p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">#!/bin/bash

# until: runs until the condition is TRUE (opposite of while)
count=1
until [[ $count -gt 5 ]]; do
    echo "Count: $count"
    (( count++ ))
done

# Same result as the while example above — use whichever reads more naturally
# "until count is greater than 5" vs "while count is less than or equal to 5"

# Practical: retry a command until it succeeds
until curl -s https://api.example.com/health > /dev/null; do
    echo "API not ready, retrying in 5s..."
    sleep 5
done
echo "API is up!"</code></pre>
</div>

<h2>4. C-Style Arithmetic While Loop</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">#!/bin/bash

# C-style with (( )) arithmetic evaluation
i=0
while (( i < 10 )); do
    echo "$i"
    (( i++ ))
done

# Multiple conditions
x=0; y=10
while (( x < 5 && y > 0 )); do
    echo "x=$x y=$y"
    (( x++, y-=2 ))
done</code></pre>
</div>

<h2>5. while with read (Reading Files and Input)</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">#!/bin/bash

# Read file line by line (most common while + read pattern)
while IFS= read -r line; do
    echo "Processing: $line"
done < /etc/hosts

# Read from a command's output
while IFS= read -r process; do
    echo "Killing: $process"
done < <(pgrep -f "old-process-name")

# Read from stdin interactively
echo "Enter lines (Ctrl+D to stop):"
while IFS= read -r line; do
    echo "You typed: $line"
done</code></pre>
</div>

<h2>6. break and continue</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">i=0
while (( i < 10 )); do
    (( i++ ))
    (( i % 2 == 0 )) && continue   # skip even numbers
    (( i > 7 )) && break            # stop after 7
    echo "$i"
done
# Output: 1 3 5 7</code></pre>
</div>

<h2>The Most Common Infinite Loop Bug</h2>

<p>Forgetting to increment your counter creates an infinite loop that locks your terminal:</p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;"># BUG: count never changes — loops forever
count=1
while [[ $count -le 5 ]]; do
    echo "Count: $count"
    # Missing: count=$(( count + 1 ))
done

# Kill it: Ctrl+C
# Prevention: write the increment BEFORE filling in the loop body</code></pre>
</div>

<p>For related looping patterns, see the <a href="/bash-read-file-line-by-line/">bash read file line by line guide</a> which uses <code>while read</code> extensively, and the <a href="/bash-for-loop/">bash for loop guide</a> for when you know the iteration count in advance.</p>

<h2>Summary</h2>

<p>Use <code>while [[ condition ]]; do ... done</code> for condition-based loops, <code>while true</code> with <code>break</code> for indefinite loops, <code>until</code> for "keep going until success" patterns, and <code>while IFS= read -r line</code> for file/stream processing. Always double-check your increment to avoid infinite loops.</p>
