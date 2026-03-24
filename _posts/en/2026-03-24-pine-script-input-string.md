---
layout: post
title: "Pine Script input.string: Options, Dropdowns, and All Parameters"
date: 2026-03-24
lang: "en"
meta: '<meta name="description" content="Pine Script input.string complete guide: free-text inputs, dropdown options arrays, defval, title, tooltip, group, confirm — with practical indicator examples."><meta name="keywords" content="pine script input.string, pine script input string options, pine script dropdown input, pine script input options array, tradingview input string"><meta name="author" content="Beta Shorts"><meta name="robots" content="index, follow"><link rel="canonical" href="https://betashorts.com/pine-script-input-string">'
tags: [Pine Script, TradingView, Trading, Indicators]
---

<p><code>input.string()</code> is the most flexible input function in Pine Script. Without the <code>options</code> parameter it renders a free-text field; add an <code>options</code> array and TradingView turns it into a dropdown — letting users choose between named modes, MA types, session filters, or any set of string values without touching code. This guide covers every parameter, the full dropdown pattern, and four complete working examples.</p>

<figure style="max-width:520px;margin:2rem auto;text-align:center;">
<svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;border-radius:8px;">
  <rect width="520" height="200" fill="#0D1117" rx="8"/>
  <rect width="520" height="200" fill="none" stroke="#30363D" stroke-width="1" rx="8"/>
  <rect x="0" y="0" width="520" height="32" fill="#161B22" rx="8"/>
  <rect x="0" y="20" width="520" height="12" fill="#161B22"/>
  <text x="260" y="20" font-family="'JetBrains Mono',monospace" font-size="11" fill="#3B82F6" text-anchor="middle">input.string() parameters</text>
  <line x1="0" y1="32" x2="520" y2="32" stroke="#30363D" stroke-width="1"/>
  <text x="16" y="56" font-family="'JetBrains Mono',monospace" font-size="11" fill="#79C0FF">defval</text>
  <text x="160" y="56" font-family="'JetBrains Mono',monospace" font-size="11" fill="#FFA657">string</text>
  <text x="260" y="56" font-family="'JetBrains Mono',monospace" font-size="11" fill="#8B949E">Default value shown on load</text>
  <line x1="0" y1="64" x2="520" y2="64" stroke="#30363D" stroke-width="0.5"/>
  <text x="16" y="88" font-family="'JetBrains Mono',monospace" font-size="11" fill="#79C0FF">title</text>
  <text x="160" y="88" font-family="'JetBrains Mono',monospace" font-size="11" fill="#FFA657">string</text>
  <text x="260" y="88" font-family="'JetBrains Mono',monospace" font-size="11" fill="#8B949E">Label in the settings panel</text>
  <line x1="0" y1="96" x2="520" y2="96" stroke="#30363D" stroke-width="0.5"/>
  <text x="16" y="120" font-family="'JetBrains Mono',monospace" font-size="11" fill="#79C0FF">options</text>
  <text x="160" y="120" font-family="'JetBrains Mono',monospace" font-size="11" fill="#FFA657">string[]</text>
  <text x="260" y="120" font-family="'JetBrains Mono',monospace" font-size="11" fill="#8B949E">Turns field into dropdown</text>
  <line x1="0" y1="128" x2="520" y2="128" stroke="#30363D" stroke-width="0.5"/>
  <text x="16" y="152" font-family="'JetBrains Mono',monospace" font-size="11" fill="#79C0FF">tooltip</text>
  <text x="160" y="152" font-family="'JetBrains Mono',monospace" font-size="11" fill="#FFA657">string</text>
  <text x="260" y="152" font-family="'JetBrains Mono',monospace" font-size="11" fill="#8B949E">Hover text on the (?) icon</text>
  <line x1="0" y1="160" x2="520" y2="160" stroke="#30363D" stroke-width="0.5"/>
  <text x="16" y="184" font-family="'JetBrains Mono',monospace" font-size="11" fill="#79C0FF">group</text>
  <text x="160" y="184" font-family="'JetBrains Mono',monospace" font-size="11" fill="#FFA657">string</text>
  <text x="260" y="184" font-family="'JetBrains Mono',monospace" font-size="11" fill="#8B949E">Groups inputs under a header</text>
</svg>
<figcaption style="color:#6b7280;font-size:0.85rem;margin-top:0.5rem;">All parameters accepted by input.string()</figcaption>
</figure>

<h2>1. Basic Syntax</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">pine</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">//@version=5
indicator("input.string Demo", overlay=true)

// Free-text input — user can type any string
label = input.string(
    defval  = "Buy",          // default text
    title   = "Signal Label", // shown in settings panel
    tooltip = "Text printed on the chart label",
    group   = "Display"
)

// Use the value anywhere a string is needed
if bar_index == last_bar_index
    label.new(bar_index, high, label, style=label.style_label_down)</code></pre>
</div>

<p>Without <code>options</code> the field is an open text box. The user types any string and Pine Script uses it at runtime. This is useful for custom labels, alert message templates, and ticker prefixes.</p>

<h2>2. Dropdown with <code>options</code></h2>

<p>Pass an array of strings to <code>options</code> and TradingView replaces the text box with a dropdown. <code>defval</code> must be one of the values in <code>options</code>, otherwise Pine Script throws a compile error.</p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">pine</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">maType = input.string(
    defval  = "EMA",                          // must exist in options
    title   = "MA Type",
    options = ["EMA", "SMA", "RMA", "WMA"],   // renders as a dropdown
    tooltip = "Moving average calculation method"
)

// Switch on the selected string value
length = input.int(14, "Length")

maValue = switch maType
    "EMA" => ta.ema(close, length)
    "SMA" => ta.sma(close, length)
    "RMA" => ta.rma(close, length)
    "WMA" => ta.wma(close, length)
    =>       ta.ema(close, length)  // fallback (required by compiler)

plot(maValue, "MA", color.blue)</code></pre>
</div>

<h2>3. All Parameters Reference</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">pine</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">// Full parameter list for input.string()
myString = input.string(
    defval  = "EMA",                   // (required) default value
    title   = "MA Type",               // label shown left of the field
    options = ["EMA", "SMA", "WMA"],   // optional — creates a dropdown
    tooltip = "Choose calculation",    // shown when user hovers (?)
    group   = "MA Settings",           // groups inputs under a shared header
    confirm = false                    // if true, prompts user on add-to-chart
)</code></pre>
</div>

<h3>Parameter notes</h3>
<ul>
  <li><strong>defval</strong> — The only required parameter. Must be a compile-time constant string literal (not a variable).</li>
  <li><strong>title</strong> — Defaults to the variable name if omitted. Always set it explicitly for clarity.</li>
  <li><strong>options</strong> — When provided, <code>defval</code> must exactly match one of the entries (case-sensitive). Omit to allow free text.</li>
  <li><strong>tooltip</strong> — Renders a <code>(?)</code> icon next to the label. Useful for explaining non-obvious choices.</li>
  <li><strong>group</strong> — Strings that share the same <code>group</code> value are collected under a collapsible section header in the settings panel.</li>
  <li><strong>confirm</strong> — When <code>true</code>, TradingView shows a settings dialog the first time the script is added to a chart, forcing the user to review defaults.</li>
</ul>

<h2>4. Example: Signal Filter Dropdown</h2>

<p>A common use case is a signal direction filter — let users choose whether the indicator fires long signals only, short only, or both.</p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">pine</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">//@version=5
indicator("Signal Filter Demo", overlay=true)

signalDir = input.string(
    defval  = "Both",
    title   = "Signal Direction",
    options = ["Both", "Long Only", "Short Only"],
    tooltip = "Restrict which signals are plotted",
    group   = "Filters"
)

fast = ta.ema(close, 9)
slow = ta.ema(close, 21)

longSignal  = ta.crossover(fast, slow)  and signalDir != "Short Only"
shortSignal = ta.crossunder(fast, slow) and signalDir != "Long Only"

plotshape(longSignal,  "Long",  shape.triangleup,   location.belowbar, color.green, size=size.small)
plotshape(shortSignal, "Short", shape.triangledown, location.abovebar, color.red,   size=size.small)</code></pre>
</div>

<h2>5. Example: MA Type Selector with Groups</h2>

<p>Use <code>group</code> to organise multiple string dropdowns so the settings panel stays readable as your script grows.</p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">pine</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">//@version=5
indicator("Dual MA", overlay=true)

// ── Fast MA ──────────────────────────────────────────
fastType   = input.string("EMA", "Type",   options=["EMA","SMA","WMA"], group="Fast MA")
fastLength = input.int(9,        "Length", minval=1,                    group="Fast MA")

// ── Slow MA ──────────────────────────────────────────
slowType   = input.string("SMA", "Type",   options=["EMA","SMA","WMA"], group="Slow MA")
slowLength = input.int(21,       "Length", minval=1,                    group="Slow MA")

// Helper to resolve MA type string → value
ma(src, len, type) =>
    switch type
        "EMA" => ta.ema(src, len)
        "SMA" => ta.sma(src, len)
        "WMA" => ta.wma(src, len)
        =>       ta.ema(src, len)

fastMA = ma(close, fastLength, fastType)
slowMA = ma(close, slowLength, slowType)

plot(fastMA, "Fast", color.blue)
plot(slowMA, "Slow", color.orange)

bgcolor(ta.crossover(fastMA, slowMA)  ? color.new(color.green, 90) : na)
bgcolor(ta.crossunder(fastMA, slowMA) ? color.new(color.red,   90) : na)</code></pre>
</div>

<h2>6. Example: Alert Message Template</h2>

<p>Free-text <code>input.string</code> (no <code>options</code>) lets users define the <code>alert_message</code> payload directly from the settings panel — useful for webhook bots where the JSON body varies per deployment.</p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">pine</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">//@version=5
strategy("Webhook Strategy", overlay=true)

// Free-text: user pastes their own JSON body in the settings panel
longMsg  = input.string('{"action":"buy","qty":1}',  "Long Alert Message",  group="Alerts")
shortMsg = input.string('{"action":"sell","qty":1}', "Short Alert Message", group="Alerts")

fast = ta.ema(close, 9)
slow = ta.ema(close, 21)

if ta.crossover(fast, slow)
    strategy.entry("Long", strategy.long, alert_message=longMsg)

if ta.crossunder(fast, slow)
    strategy.entry("Short", strategy.short, alert_message=shortMsg)</code></pre>
</div>

<h2>7. Common Mistakes</h2>

<ul>
  <li><strong><code>defval</code> not in <code>options</code></strong> — Pine Script throws a compile error. Check for typos and case mismatches (<code>"EMA"</code> ≠ <code>"ema"</code>).</li>
  <li><strong>Using a variable as <code>defval</code></strong> — <code>defval</code> must be a compile-time constant. You cannot pass a calculated string or another variable.</li>
  <li><strong>Comparing with <code>==</code> inside a series context</strong> — <code>input.string</code> returns a <em>simple string</em>, not a series, so comparisons like <code>maType == "EMA"</code> work without issues anywhere in the script.</li>
  <li><strong>Forgetting the fallback in <code>switch</code></strong> — Pine Script v5 requires a default <code>=&gt;</code> branch in every <code>switch</code> expression that returns a value, even when you've covered all <code>options</code>.</li>
</ul>

<h2>Quick Reference</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">// Free-text (open input)
label = input.string("Buy", "Label")

// Dropdown (options array — defval must be one of the values)
mode = input.string("EMA", "Mode", options=["EMA","SMA","WMA"])

// With all parameters
full = input.string(
    defval  = "EMA",
    title   = "Mode",
    options = ["EMA", "SMA", "WMA"],
    tooltip = "MA calculation type",
    group   = "Settings",
    confirm = false
)

// Using the value: direct comparison
if mode == "EMA"
    // ...

// Using the value: switch expression
val = switch mode
    "EMA" => ta.ema(close, 14)
    "SMA" => ta.sma(close, 14)
    "WMA" => ta.wma(close, 14)
    =>       ta.ema(close, 14)</code></pre>
</div>
