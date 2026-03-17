---
layout: post
title: "Pine Script input() Complete Guide: All Types With Examples"
date: 2026-03-17
lang: "en"
meta: '<meta name="description" content="Pine Script input() complete guide: input.int, input.float, input.string, input.bool, input.color, input.source, input.timeframe with all parameters and a working example."><meta name="keywords" content="pine script input, pine script input parameters, pine script input.int, pine script input.string, tradingview indicator settings"><meta name="author" content="Beta Shorts"><meta name="robots" content="index, follow"><link rel="canonical" href="https://betashorts.com/pine-script-input-guide">'
tags: [Pine Script, TradingView, Trading, Indicators]
---

<p>Pine Script's <code>input()</code> functions let you add configurable settings to your indicator or strategy that users can adjust through TradingView's indicator settings panel — without touching the code. This guide covers every input type in Pine Script v5 (<code>input.int</code>, <code>input.float</code>, <code>input.string</code>, <code>input.bool</code>, <code>input.color</code>, <code>input.source</code>, and <code>input.timeframe</code>) with all available parameters and a complete working example that uses them together.</p>

<figure style="max-width:520px;margin:2rem auto;text-align:center;">
<svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;border-radius:8px;">
  <rect width="520" height="220" fill="#0D1117" rx="8"/>
  <rect width="520" height="220" fill="none" stroke="#30363D" stroke-width="1" rx="8"/>
  <!-- Panel header -->
  <rect x="40" y="16" width="440" height="188" fill="#161B22" rx="6" stroke="#30363D" stroke-width="1"/>
  <text x="260" y="40" font-family="'JetBrains Mono',monospace" font-size="12" fill="#E6EDF3" text-anchor="middle">⚙ Indicator Settings</text>
  <line x1="40" y1="48" x2="480" y2="48" stroke="#30363D" stroke-width="1"/>
  <!-- Row 1: Length (number input) -->
  <text x="60" y="76" font-family="'JetBrains Mono',monospace" font-size="11" fill="#8B949E">Length</text>
  <rect x="360" y="62" width="100" height="22" fill="#0D1117" rx="3" stroke="#3B82F6" stroke-width="1"/>
  <text x="410" y="77" font-family="'JetBrains Mono',monospace" font-size="12" fill="#E6EDF3" text-anchor="middle">14</text>
  <line x1="40" y1="92" x2="480" y2="92" stroke="#30363D" stroke-width="0.5"/>
  <!-- Row 2: Show Labels (toggle) -->
  <text x="60" y="116" font-family="'JetBrains Mono',monospace" font-size="11" fill="#8B949E">Show Labels</text>
  <!-- Toggle ON -->
  <rect x="365" y="104" width="44" height="22" fill="#3B82F6" rx="11"/>
  <circle cx="398" cy="115" r="8" fill="white"/>
  <line x1="40" y1="132" x2="480" y2="132" stroke="#30363D" stroke-width="0.5"/>
  <!-- Row 3: Source (dropdown) -->
  <text x="60" y="156" font-family="'JetBrains Mono',monospace" font-size="11" fill="#8B949E">Source</text>
  <rect x="340" y="142" width="120" height="22" fill="#0D1117" rx="3" stroke="#30363D" stroke-width="1"/>
  <text x="395" y="157" font-family="'JetBrains Mono',monospace" font-size="11" fill="#E6EDF3" text-anchor="middle">close  ▾</text>
  <line x1="40" y1="172" x2="480" y2="172" stroke="#30363D" stroke-width="0.5"/>
  <!-- Row 4: Color -->
  <text x="60" y="196" font-family="'JetBrains Mono',monospace" font-size="11" fill="#8B949E">Line Color</text>
  <rect x="380" y="182" width="60" height="22" fill="#3B82F6" rx="3" stroke="#30363D" stroke-width="1"/>
</svg>
<figcaption style="color:#6b7280;font-size:0.85rem;margin-top:0.5rem;">TradingView indicator settings panel with integer, boolean toggle, dropdown, and color inputs</figcaption>
</figure>

<h2>1. input.int() — Integer Values</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">pine</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">//@version=5
indicator("Input Demo", overlay=true)

// input.int() — integer number input with validation
length = input.int(
    defval  = 14,           // default value shown in settings
    title   = "EMA Length", // label shown to the user
    minval  = 1,            // minimum allowed value
    maxval  = 500,          // maximum allowed value
    step    = 1,            // increment/decrement step
    tooltip = "Number of bars for the EMA calculation",
    group   = "EMA Settings"  // groups related inputs under a header
)

ema = ta.ema(close, length)
plot(ema, "EMA", color.blue)</code></pre>
</div>

<h2>2. input.float() — Decimal Values</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">// input.float() — same as input.int() but allows decimals
multiplier = input.float(
    defval  = 2.0,
    title   = "ATR Multiplier",
    minval  = 0.1,
    maxval  = 10.0,
    step    = 0.1    // increments by 0.1 with arrow keys
)

atrVal = ta.atr(14) * multiplier</code></pre>
</div>

<h2>3. input.string() — Text and Dropdowns</h2>

<p>Pass an <code>options</code> array to turn a text input into a dropdown select:</p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">// Dropdown: restrict to specific options
maType = input.string(
    defval  = "EMA",
    title   = "MA Type",
    options = ["EMA", "SMA", "RMA", "WMA"],
    tooltip = "Select the moving average calculation method"
)

// Use the selection in your logic
maValue = switch maType
    "EMA" => ta.ema(close, length)
    "SMA" => ta.sma(close, length)
    "RMA" => ta.rma(close, length)
    "WMA" => ta.wma(close, length)
    => ta.ema(close, length)  // default case</code></pre>
</div>

<h2>4. input.bool() — Toggle Switches</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">showLabels = input.bool(
    defval  = true,
    title   = "Show Labels",
    tooltip = "Toggle price labels on the chart"
)

showBands = input.bool(defval=false, title="Show Bands")

// Use in conditional logic
if showLabels
    label.new(bar_index, high, str.tostring(high, "#.##"), style=label.style_label_down)</code></pre>
</div>

<h2>5. input.color() — Color Pickers</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">// Color picker with transparency (0=opaque, 100=fully transparent)
bullColor = input.color(color.new(color.green, 0), title="Bullish Color")
bearColor = input.color(color.new(color.red, 20), title="Bearish Color")

barColor = close > open ? bullColor : bearColor
barcolor(barColor)</code></pre>
</div>

<h2>6. input.source() — OHLCV Selection</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">// Let user select which price to calculate on (close/open/high/low/hl2/hlc3)
src = input.source(close, title="Source")

// Now all calculations use the user-selected source
ema = ta.ema(src, length)
rsi = ta.rsi(src, 14)</code></pre>
</div>

<h2>7. input.timeframe() — Timeframe Picker</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">// Let user select a different timeframe for higher-timeframe analysis
htf = input.timeframe("D", title="Higher Timeframe")

// Request data from the selected timeframe
htfClose = request.security(syminfo.tickerid, htf, close)
htfEma   = request.security(syminfo.tickerid, htf, ta.ema(close, 50))

plot(htfEma, "HTF EMA", color.orange)</code></pre>
</div>

<h2>8. Organizing Inputs with group and inline</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">//@version=5
indicator("Organized Inputs", overlay=true)

// group= puts inputs under a collapsible section header
// inline= puts multiple inputs on the same row (use same string key)

fastLen  = input.int(9,  "Fast",   group="Moving Averages", inline="ma")
slowLen  = input.int(21, "Slow",   group="Moving Averages", inline="ma")
showMA   = input.bool(true, "Show", group="Moving Averages", inline="ma")

rsiLen   = input.int(14, "RSI Length", group="RSI", minval=1, maxval=50)
rsiOB    = input.int(70, "Overbought", group="RSI", inline="rsi_levels")
rsiOS    = input.int(30, "Oversold",   group="RSI", inline="rsi_levels")</code></pre>
</div>

<p>For strategies that use these inputs to drive entries, see the <a href="/pine-script-strategy-entry/">pine script strategy.entry guide</a>. For adding alerts based on your indicator's conditions, see the <a href="/pine-script-alert-complete-guide/">Pine Script alerts guide</a>.</p>

<h2>Summary</h2>

<p>Use <code>input.int()</code> and <code>input.float()</code> for numeric settings with <code>minval/maxval</code> validation, <code>input.string(options=[...])</code> for dropdowns, <code>input.bool()</code> for toggles, <code>input.source()</code> for OHLCV selection, and <code>input.timeframe()</code> for timeframe pickers. Organize related inputs with <code>group="Name"</code> and put side-by-side inputs on the same row with <code>inline="key"</code>.</p>
