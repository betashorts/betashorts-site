---
layout: post
title: "Bash Array Tutorial: Declare, Access, Loop, and Modify"
date: 2026-03-17
lang: "en"
meta: '<meta name="description" content="Bash array tutorial: how to declare, access, loop, slice, and modify indexed and associative arrays. Covers all syntax with real examples and common pitfalls."><meta name="keywords" content="bash array, bash declare array, bash array loop, bash associative array, bash array tutorial"><meta name="author" content="Beta Shorts"><meta name="robots" content="index, follow"><link rel="canonical" href="https://betashorts.com/bash-array-tutorial">'
tags: [Bash, Linux, Arrays, Scripting]
---

<p>Bash arrays let you store multiple values in a single variable — essential for processing lists of files, command outputs, configuration values, or any collection of data in your scripts. The syntax is more verbose than in Python or JavaScript, but once you know the patterns they're straightforward. This tutorial covers every array operation you'll need: declaration, access, loops, slicing, modification, and associative arrays.</p>

<figure style="max-width:560px;margin:2rem auto;text-align:center;">
<svg viewBox="0 0 560 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;border-radius:8px;">
  <rect width="560" height="180" fill="#0D1117" rx="8"/>
  <rect width="560" height="180" fill="none" stroke="#30363D" stroke-width="1" rx="8"/>
  <text x="280" y="30" font-family="'JetBrains Mono',monospace" font-size="12" fill="#8B949E" text-anchor="middle">fruits=("apple" "banana" "cherry" "date" "elderberry")</text>
  <!-- Array boxes -->
  <rect x="40" y="50" width="90" height="50" fill="#161B22" rx="4" stroke="#30363D" stroke-width="1"/>
  <rect x="150" y="50" width="90" height="50" fill="#161B22" rx="4" stroke="#30363D" stroke-width="1"/>
  <rect x="260" y="50" width="90" height="50" fill="#161B22" rx="4" stroke="#30363D" stroke-width="1"/>
  <rect x="370" y="50" width="80" height="50" fill="#161B22" rx="4" stroke="#30363D" stroke-width="1"/>
  <rect x="460" y="50" width="80" height="50" fill="#161B22" rx="4" stroke="#30363D" stroke-width="1"/>
  <!-- Index labels -->
  <text x="85" y="46" font-family="'JetBrains Mono',monospace" font-size="11" fill="#3B82F6" text-anchor="middle">[0]</text>
  <text x="195" y="46" font-family="'JetBrains Mono',monospace" font-size="11" fill="#3B82F6" text-anchor="middle">[1]</text>
  <text x="305" y="46" font-family="'JetBrains Mono',monospace" font-size="11" fill="#3B82F6" text-anchor="middle">[2]</text>
  <text x="410" y="46" font-family="'JetBrains Mono',monospace" font-size="11" fill="#3B82F6" text-anchor="middle">[3]</text>
  <text x="500" y="46" font-family="'JetBrains Mono',monospace" font-size="11" fill="#3B82F6" text-anchor="middle">[4]</text>
  <!-- Values -->
  <text x="85" y="80" font-family="'JetBrains Mono',monospace" font-size="11" fill="#E6EDF3" text-anchor="middle">apple</text>
  <text x="195" y="80" font-family="'JetBrains Mono',monospace" font-size="11" fill="#E6EDF3" text-anchor="middle">banana</text>
  <text x="305" y="80" font-family="'JetBrains Mono',monospace" font-size="11" fill="#E6EDF3" text-anchor="middle">cherry</text>
  <text x="410" y="80" font-family="'JetBrains Mono',monospace" font-size="11" fill="#E6EDF3" text-anchor="middle">date</text>
  <text x="500" y="80" font-family="'JetBrains Mono',monospace" font-size="11" fill="#E6EDF3" text-anchor="middle">elder…</text>
  <!-- Annotation arrows -->
  <line x1="165" y1="120" x2="165" y2="108" stroke="#FFA657" stroke-width="1.5" marker-end="url(#arr)"/>
  <text x="165" y="135" font-family="'JetBrains Mono',monospace" font-size="11" fill="#FFA657" text-anchor="middle">${arr[@]}</text>
  <text x="165" y="150" font-family="'JetBrains Mono',monospace" font-size="10" fill="#8B949E" text-anchor="middle">all elements</text>
  <line x1="390" y1="120" x2="390" y2="108" stroke="#FF7B72" stroke-width="1.5"/>
  <text x="390" y="135" font-family="'JetBrains Mono',monospace" font-size="11" fill="#FF7B72" text-anchor="middle">${arr[*]}</text>
  <text x="390" y="150" font-family="'JetBrains Mono',monospace" font-size="10" fill="#8B949E" text-anchor="middle">single string</text>
</svg>
<figcaption style="color:#6b7280;font-size:0.85rem;margin-top:0.5rem;">Indexed array with 5 elements. <code>[@]</code> expands to separate words; <code>[*]</code> expands to one string.</figcaption>
</figure>

<h2>1. Declaring Arrays</h2>

<p>Bash has three ways to create an indexed array:</p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">bash</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">#!/bin/bash

# Method 1: inline declaration with values
fruits=("apple" "banana" "cherry")

# Method 2: explicit declaration (empty array, add later)
declare -a colors
colors[0]="red"
colors[1]="green"
colors[2]="blue"

# Method 3: capture command output into array
files=($(ls /etc/*.conf))          # NOTE: fails on filenames with spaces
mapfile -t files < <(ls /etc/*.conf)  # safer for filenames with spaces

# Verify array contents
echo "${fruits[@]}"    # apple banana cherry
echo "${#fruits[@]}"   # 3  (number of elements)</code></pre>
</div>

<h2>2. Accessing Elements</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">bash</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">fruits=("apple" "banana" "cherry" "date" "elderberry")

# Access by index (zero-based)
echo "${fruits[0]}"    # apple
echo "${fruits[2]}"    # cherry

# Negative indexing (Bash 4.2+)
echo "${fruits[-1]}"   # elderberry (last element)
echo "${fruits[-2]}"   # date

# All elements — use double quotes to preserve spacing
echo "${fruits[@]}"    # apple banana cherry date elderberry

# Number of elements
echo "${#fruits[@]}"   # 5

# Length of a single element
echo "${#fruits[1]}"   # 6  (length of "banana")

# Slice: elements starting at index 1, take 3
echo "${fruits[@]:1:3}"  # banana cherry date

# All indices
echo "${!fruits[@]}"   # 0 1 2 3 4</code></pre>
</div>

<h2>3. Looping Over Arrays</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">bash</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">fruits=("apple" "banana" "cherry")

# Loop over values (most common)
for fruit in "${fruits[@]}"; do
    echo "Fruit: $fruit"
done

# Loop with index
for i in "${!fruits[@]}"; do
    echo "fruits[$i] = ${fruits[$i]}"
done
# Output:
# fruits[0] = apple
# fruits[1] = banana
# fruits[2] = cherry

# C-style index loop
for (( i=0; i<${#fruits[@]}; i++ )); do
    echo "$i: ${fruits[$i]}"
done</code></pre>
</div>

<p>Always quote <code>"${fruits[@]}"</code> with double quotes. Without quotes, elements with spaces split into separate words.</p>

<h2>4. Modifying Arrays</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">fruits=("apple" "banana" "cherry")

# Append one element
fruits+=("date")

# Append multiple elements
fruits+=("elderberry" "fig")

# Modify a specific element
fruits[1]="blueberry"   # replaces "banana"

# Delete an element (leaves a gap — index 2 becomes empty, not removed)
unset fruits[2]
echo "${fruits[@]}"     # apple blueberry date elderberry fig
echo "${!fruits[@]}"    # 0 1 3 4 5  (note: index 2 is gone)

# Reindex after deletion (create new contiguous array)
fruits=("${fruits[@]}")

# Delete entire array
unset fruits</code></pre>
</div>

<p>The gap left by <code>unset arr[n]</code> is a common gotcha — the array is now sparse. If you need contiguous indices after deletion, reassign the whole array: <code>arr=("${arr[@]}")</code>.</p>

<h2>5. Associative Arrays</h2>

<p>Associative arrays use string keys instead of numeric indices. Requires Bash 4+.</p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">bash</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">#!/bin/bash

# Must declare with -A
declare -A config

config["host"]="localhost"
config["port"]="5432"
config["name"]="mydb"

# Access by key
echo "${config["host"]}"    # localhost

# Loop over key-value pairs
for key in "${!config[@]}"; do
    echo "$key = ${config[$key]}"
done

# Check if key exists
if [[ -v config["host"] ]]; then
    echo "host is set"
fi</code></pre>
</div>

<h2>3 Common Pitfalls</h2>

<ol>
<li><strong>Forgetting quotes</strong> — <code>${arr[@]}</code> without double quotes splits on spaces. Always use <code>"${arr[@]}"</code>.</li>
<li><strong>Using <code>[*]</code> instead of <code>[@]</code></strong> — <code>${arr[*]}</code> expands to one string; <code>${arr[@]}</code> expands to separate words. Use <code>[@]</code> in loops.</li>
<li><strong>Index gaps after unset</strong> — deleting elements leaves sparse indices. Reassign with <code>arr=("${arr[@]}")</code> to repack.</li>
</ol>

<p>For more Bash scripting patterns, see the <a href="/bash-function-examples/">bash functions guide</a> where arrays are frequently used to pass multiple return values.</p>

<h2>Summary</h2>

<p>Declare with <code>arr=(val1 val2)</code>, access with <code>${arr[0]}</code>, loop with <code>for x in "${arr[@]}"</code>, get length with <code>${#arr[@]}</code>, and use <code>declare -A</code> for string-keyed maps. Quote <code>[@]</code> expansions consistently and you'll avoid the most common array bugs.</p>
