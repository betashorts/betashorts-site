---
layout: post
title: "Pine Script for Loop: Syntax, Lookbacks, and Array Iteration"
date: 2026-03-17
lang: "en"
meta: '<meta name="description" content="Pine Script for loop guide: syntax, step parameter, array iteration, manual lookback calculations, the inclusive end gotcha, loop performance errors, and workarounds."><meta name="keywords" content="pine script for loop, pine script loop, pine script iterate array, pine script lookback, pine script loop too long"><meta name="author" content="Beta Shorts"><meta name="robots" content="index, follow"><link rel="canonical" href="https://betashorts.com/pine-script-for-loop">'
tags: [Pine Script, TradingView, Trading, Loops]
---

<p>Pine Script's <code>for</code> loop is the primary tool for performing lookback calculations, iterating over arrays, and implementing custom indicators that built-in functions can't express. The syntax is different from Bash or Python, there are a few gotchas (the end value is inclusive, you can't <code>break</code> out early), and performance limits apply. This guide covers everything you need to write effective for loops in Pine Script.</p>

<figure style="max-width:560px;margin:2rem auto;text-align:center;">
<svg viewBox="0 0 560 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;border-radius:8px;">
  <rect width="560" height="160" fill="#0D1117" rx="8"/>
  <rect width="560" height="160" fill="none" stroke="#30363D" stroke-width="1" rx="8"/>
  <!-- Loop anatomy line -->
  <text x="280" y="50" font-family="'JetBrains Mono',monospace" font-size="16" fill="#E6EDF3" text-anchor="middle">for i = 0 to length - 1</text>
  <!-- Annotation arrows and labels -->
  <line x1="118" y1="55" x2="118" y2="80" stroke="#3B82F6" stroke-width="1.5"/>
  <text x="118" y="96" font-family="'JetBrains Mono',monospace" font-size="10" fill="#3B82F6" text-anchor="middle">iterator</text>
  <line x1="168" y1="55" x2="168" y2="80" stroke="#FFA657" stroke-width="1.5"/>
  <text x="168" y="96" font-family="'JetBrains Mono',monospace" font-size="10" fill="#FFA657" text-anchor="middle">start</text>
  <line x1="226" y1="55" x2="226" y2="80" stroke="#FF7B72" stroke-width="1.5"/>
  <text x="226" y="96" font-family="'JetBrains Mono',monospace" font-size="10" fill="#FF7B72" text-anchor="middle">keyword</text>
  <line x1="380" y1="55" x2="380" y2="80" stroke="#D2A8FF" stroke-width="1.5"/>
  <text x="380" y="96" font-family="'JetBrains Mono',monospace" font-size="10" fill="#D2A8FF" text-anchor="middle">end (inclusive)</text>
  <!-- Second example line -->
  <line x1="280" y1="110" x2="280" y2="110"/>
  <text x="280" y="130" font-family="'JetBrains Mono',monospace" font-size="14" fill="#8B949E" text-anchor="middle">for [val, idx] in myArray</text>
  <text x="280" y="150" font-family="'JetBrains Mono',monospace" font-size="10" fill="#8B949E" text-anchor="middle">— array iteration syntax (Pine Script v5)</text>
</svg>
<figcaption style="color:#6b7280;font-size:0.85rem;margin-top:0.5rem;">Pine Script for loop anatomy — the end value is inclusive (unlike most languages)</figcaption>
</figure>

<h2>1. Basic For Loop Syntax</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">pine</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">//@version=5
indicator("For Loop Demo", overlay=false)

// Basic: for i = start to end  (end value is INCLUSIVE)
// This loops i = 0, 1, 2, 3, 4 (5 iterations)
sumVal = 0.0
for i = 0 to 4
    sumVal += close[i]   // close[0]=current, close[1]=1 bar ago, etc.
plot(sumVal / 5, "5-bar sum / 5")

// With step parameter: by step (default step is 1)
evenSum = 0.0
for i = 0 to 10 by 2   // i = 0, 2, 4, 6, 8, 10
    evenSum += i
// evenSum = 30

// Countdown
for i = 9 to 0 by -1   // i = 9, 8, 7, ..., 0
    // process i</code></pre>
</div>

<h2>2. The Inclusive End Gotcha</h2>

<p>In most languages, <code>for i = 0 to N</code> runs N iterations (0 through N-1). In Pine Script, the end is <strong>inclusive</strong> — <code>for i = 0 to 9</code> runs 10 iterations (0 through 9). This is the most common source of off-by-one errors:</p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">length = 14

// WRONG: loops 15 times (0 to 14 inclusive)
for i = 0 to length
    // processes bar_index 0..14 — one too many

// CORRECT: loops 14 times (0 to 13 inclusive)
for i = 0 to length - 1
    // processes bar_index 0..13

// Manual moving average example (correct)
total = 0.0
for i = 0 to length - 1
    total += close[i]
myMA = total / length
plot(myMA)</code></pre>
</div>

<h2>3. Lookback Calculations (Most Common Use Case)</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">//@version=5
indicator("Custom Lookback", overlay=false)

length = input.int(20, "Length", minval=1)

// Find highest high over last N bars (equivalent to ta.highest)
highestHigh = high
for i = 1 to length - 1
    if high[i] > highestHigh
        highestHigh := high[i]

// Find how many bars ago price was above a threshold
barsAbove = 0
threshold = ta.sma(close, 50)
for i = 0 to length - 1
    if close[i] > threshold
        barsAbove += 1

// Calculate a weighted average (more weight to recent bars)
weightedSum = 0.0
weightTotal = 0.0
for i = 0 to length - 1
    weight = length - i    // recent bars get higher weight
    weightedSum += close[i] * weight
    weightTotal += weight
wma = weightedSum / weightTotal
plot(wma, "WMA")</code></pre>
</div>

<h2>4. Iterating Arrays</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">//@version=5
indicator("Array Iteration")

// Build an array of the last 5 closing prices
prices = array.new_float(5)
for i = 0 to 4
    array.set(prices, i, close[i])

// Traditional index-based iteration
total = 0.0
for i = 0 to array.size(prices) - 1
    total += array.get(prices, i)
avgPrice = total / array.size(prices)

// Pine Script v5: for-in syntax (cleaner)
levels = array.from(support1, support2, resistance1, resistance2)
for level in levels
    hline(level, color=color.gray, linestyle=hline.style_dashed)

// for-in with index
for [idx, val] in levels
    label.new(bar_index, val, str.tostring(idx), style=label.style_label_left)</code></pre>
</div>

<h2>5. The "Loop Too Long" Error and How to Avoid It</h2>

<p>Pine Script limits loop execution time. Loops that process too many bars or iterations produce: <em>"Script could not be translated from: Loop is too long (~500ms)"</em>.</p>

<p><strong>Three fixes:</strong></p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">// Fix 1: Use built-in functions instead of manual loops
// SLOW: manual loop for highest high
highestHigh = high
for i = 1 to 499
    if high[i] > highestHigh
        highestHigh := high[i]

// FAST: built-in — Pine computes this natively
highestHigh = ta.highest(high, 500)

// Fix 2: Limit the range dynamically
maxLookback = math.min(bar_index, 100)  // don't look back further than bars available
for i = 0 to maxLookback - 1
    // process

// Fix 3: Restructure — accumulate instead of looking back
// BAD: O(N²) — scans history on every bar
// GOOD: running sum — O(N) total
runningSum = 0.0
if bar_index >= length - 1
    for i = 0 to length - 1
        runningSum += close[i]  // same result but limit to when data is available</code></pre>
</div>

<h2>6. for vs while in Pine Script</h2>

<ul>
<li>Use <strong><code>for i = 0 to N</code></strong> when you know the exact number of iterations in advance — lookbacks, array processing.</li>
<li>Use <strong><code>while condition</code></strong> when the number of iterations depends on data — searching for a level, converging to a value.</li>
<li>Pine Script does NOT support <code>break</code> to exit a <code>for</code> loop early. Workaround: use a flag variable and <code>if not done</code> guards inside the loop.</li>
</ul>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">// No break — use a found flag instead
found = false
foundIndex = -1
for i = 0 to 49
    if not found and close[i] < ta.sma(close, 20)[i]
        found := true
        foundIndex := i</code></pre>
</div>

<p>For plot visualization after your loop calculations, see the <a href="/pine-script-plot-guide/">Pine Script plot() guide</a>. For strategies that use loop-based entries, see the <a href="/pine-script-strategy-entry/">strategy.entry guide</a>.</p>

<h2>Summary</h2>

<p>Pine Script for loops run from start <strong>to end (inclusive)</strong> — always use <code>to length - 1</code> when you want N iterations. Use <code>by step</code> to skip values or count down. Prefer built-in functions (<code>ta.highest</code>, <code>ta.sma</code>) over manual loops when available — they're significantly faster. For early exit, use a boolean flag instead of <code>break</code> since Pine Script's for loop doesn't support it.</p>
