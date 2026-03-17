---
layout: post
title: "Bash Functions: How to Write, Call, and Return Values"
date: 2026-03-17
lang: "en"
meta: '<meta name="description" content="Bash functions explained: how to write, call, and return values from functions. Covers local variables, argument handling, return codes vs echo output, and function libraries."><meta name="keywords" content="bash function, bash function return value, bash function examples, bash local variable, bash function arguments"><meta name="author" content="Beta Shorts"><meta name="robots" content="index, follow"><link rel="canonical" href="https://betashorts.com/bash-function-examples">'
tags: [Bash, Linux, Functions, Scripting]
---

<p>Bash functions let you write reusable blocks of code that can be called with arguments and return results. They're essential for any script longer than a few dozen lines — they reduce repetition, make scripts easier to test, and help you structure complex automation. This guide covers both declaration syntaxes, argument handling, the return value problem and its solutions, variable scope, and how to build reusable function libraries.</p>

<figure style="max-width:560px;margin:2rem auto;text-align:center;">
<svg viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;border-radius:8px;">
  <rect width="560" height="200" fill="#0D1117" rx="8"/>
  <rect width="560" height="200" fill="none" stroke="#30363D" stroke-width="1" rx="8"/>
  <!-- Main script box -->
  <rect x="180" y="14" width="200" height="40" fill="#161B22" rx="4" stroke="#3B82F6" stroke-width="2"/>
  <text x="280" y="38" font-family="'JetBrains Mono',monospace" font-size="12" fill="#E6EDF3" text-anchor="middle">main script</text>
  <!-- Arrows down to functions -->
  <line x1="200" y1="54" x2="130" y2="100" stroke="#8B949E" stroke-width="1.5" marker-end="url(#a)"/>
  <line x1="360" y1="54" x2="430" y2="100" stroke="#8B949E" stroke-width="1.5"/>
  <text x="140" y="82" font-family="'JetBrains Mono',monospace" font-size="10" fill="#8B949E">call + args</text>
  <text x="360" y="82" font-family="'JetBrains Mono',monospace" font-size="10" fill="#8B949E">call + args</text>
  <!-- Function boxes -->
  <rect x="60" y="100" width="160" height="44" fill="#161B22" rx="4" stroke="#30363D" stroke-width="1"/>
  <text x="140" y="125" font-family="'JetBrains Mono',monospace" font-size="11" fill="#E6EDF3" text-anchor="middle">greet_user()</text>
  <rect x="340" y="100" width="160" height="44" fill="#161B22" rx="4" stroke="#30363D" stroke-width="1"/>
  <text x="420" y="125" font-family="'JetBrains Mono',monospace" font-size="11" fill="#E6EDF3" text-anchor="middle">calculate()</text>
  <!-- Return arrows -->
  <line x1="140" y1="144" x2="200" y2="164" stroke="#3B82F6" stroke-width="1.5"/>
  <line x1="420" y1="144" x2="360" y2="164" stroke="#3B82F6" stroke-width="1.5"/>
  <text x="100" y="170" font-family="'JetBrains Mono',monospace" font-size="10" fill="#3B82F6">return value</text>
  <text x="350" y="170" font-family="'JetBrains Mono',monospace" font-size="10" fill="#3B82F6">return value</text>
</svg>
<figcaption style="color:#6b7280;font-size:0.85rem;margin-top:0.5rem;">Functions receive arguments from the main script and pass results back via echo or return codes</figcaption>
</figure>

<h2>1. Declaring Functions</h2>

<p>Bash supports two equivalent declaration syntaxes:</p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">bash</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">#!/bin/bash

# Style 1: function keyword (explicit, readable)
function greet() {
    echo "Hello, $1!"
}

# Style 2: POSIX-compatible (works in sh, dash, zsh too)
greet() {
    echo "Hello, $1!"
}

# Call the function
greet "Alice"    # Hello, Alice!
greet "Bob"      # Hello, Bob!</code></pre>
</div>

<p>Both styles are functionally identical in Bash. Prefer Style 2 (<code>name() {}</code>) for portability — it works in all POSIX shells.</p>

<h2>2. Arguments: $1, $2, $@, $#</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">bash</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">function describe() {
    echo "Function name: ${FUNCNAME[0]}"
    echo "Number of args: $#"
    echo "First arg: $1"
    echo "Second arg: $2"
    echo "All args: $@"
}

describe "hello" "world" "foo"
# Function name: describe
# Number of args: 3
# First arg: hello
# Second arg: world
# All args: hello world foo

# Iterate over all arguments
function print_all() {
    for arg in "$@"; do
        echo "  - $arg"
    done
}

print_all "alpha" "beta" "gamma"</code></pre>
</div>

<h2>3. Returning Values: The Problem and the Solution</h2>

<p>The <code>return</code> keyword in Bash only returns an integer exit code (0-255), not a string or number. This confuses many developers coming from other languages.</p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">bash</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">#!/bin/bash

# WRONG: return only sends exit codes (0-255)
function add() {
    return $(( $1 + $2 ))    # works only if result <= 255
}
add 10 20
echo "$?"   # 30 — only works by accident for small numbers

# RIGHT: echo the result and capture with $()
function add() {
    echo $(( $1 + $2 ))
}

result=$(add 100 200)
echo "$result"    # 300

# Return exit code for success/failure signaling
function file_exists() {
    [[ -f "$1" ]]   # returns 0 if true, 1 if false (no explicit return needed)
}

if file_exists "/etc/hosts"; then
    echo "File exists"
fi</code></pre>
</div>

<h2>4. Local Variables and Scope</h2>

<p>Without <code>local</code>, any variable set inside a function modifies the global scope — a common source of bugs in longer scripts.</p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">#!/bin/bash

counter=10

function increment() {
    local counter=0   # local: doesn't affect the global counter
    counter=$(( counter + 1 ))
    echo "Inside: $counter"   # Inside: 1
}

increment
echo "Outside: $counter"      # Outside: 10  (unchanged)

# Without local — global gets modified
function bad_increment() {
    counter=$(( counter + 1 ))
}
bad_increment
echo "After bad: $counter"    # After bad: 11</code></pre>
</div>

<h2>5. Sourcing Function Libraries</h2>

<p>Keep reusable functions in separate files and source them into your scripts:</p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;"># lib/utils.sh — shared functions
function log_info() {
    echo "[INFO]  $(date '+%H:%M:%S') $*"
}
function log_error() {
    echo "[ERROR] $(date '+%H:%M:%S') $*" >&2
}
function require_command() {
    command -v "$1" >/dev/null 2>&1 || {
        log_error "Required command not found: $1"
        exit 1
    }
}

# main.sh — source the library
source "$(dirname "$0")/lib/utils.sh"
# or: . "$(dirname "$0")/lib/utils.sh"

require_command "curl"
log_info "Starting process..."</code></pre>
</div>

<h2>6. Recursive Functions</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">function factorial() {
    local n=$1
    if (( n <= 1 )); then
        echo 1
    else
        local prev
        prev=$(factorial $(( n - 1 )))
        echo $(( n * prev ))
    fi
}

echo $(factorial 5)   # 120
echo $(factorial 10)  # 3628800</code></pre>
</div>

<p>For functions that check file existence or validate arguments, pair this guide with the <a href="/bash-check-if-file-exists/">bash check if file exists guide</a> and the <a href="/bash-exit-codes/">bash exit codes article</a> for proper error handling patterns.</p>

<h2>Summary</h2>

<p>Define functions with <code>name() { ... }</code>, pass arguments via <code>$1 $2 $@</code>, return real values by echoing and capturing with <code>$()</code>, use <code>local</code> for all variables inside functions, and source shared function files with <code>source lib.sh</code>. Follow the one-function-one-purpose rule and your scripts will stay maintainable.</p>
