---
layout: post
title: "Pine Script plot() Options: Color, Style, Linewidth and More"
date: 2026-03-17
lang: "en"
meta: '<meta name="description" content="Pine Script plot() complete guide: all 9 plot styles, color with transparency, linewidth, offset, display parameters, conditional coloring, and plotshape vs plotchar explained."><meta name="keywords" content="pine script plot, pine script plot color, tradingview plot, pine script plot style, pine script plotshape"><meta name="author" content="Beta Shorts"><meta name="robots" content="index, follow"><link rel="canonical" href="https://betashorts.com/pine-script-plot-guide">'
tags: [Pine Script, TradingView, Trading, Visualization, Indicators]
---

<p>The <code>plot()</code> function is the primary way to display data on a TradingView chart in Pine Script. Every indicator that draws a line, area, histogram, or set of dots uses <code>plot()</code> or its siblings. Understanding the full range of parameters — especially conditional coloring, transparency, the 9 plot styles, and the difference between <code>plot()</code>, <code>plotshape()</code>, and <code>plotchar()</code> — will unlock every visual pattern you'll want to build.</p>

<figure style="max-width:560px;margin:2rem auto;text-align:center;">
<svg viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;border-radius:8px;">
  <rect width="560" height="200" fill="#0D1117" rx="8"/>
  <rect width="560" height="200" fill="none" stroke="#30363D" stroke-width="1" rx="8"/>
  <!-- Grid lines -->
  <line x1="10" y1="100" x2="550" y2="100" stroke="#30363D" stroke-width="0.5"/>
  <line x1="10" y1="140" x2="550" y2="140" stroke="#30363D" stroke-width="0.5"/>
  <line x1="10" y1="60" x2="550" y2="60" stroke="#30363D" stroke-width="0.5"/>

  <!-- Panel 1: style_line -->
  <rect x="10" y="10" width="120" height="160" fill="none" stroke="#30363D" stroke-width="1" rx="3"/>
  <polyline points="20,120 35,90 50,100 65,75 80,95 95,70 110,80 120,60" fill="none" stroke="#3B82F6" stroke-width="2"/>
  <text x="70" y="185" font-family="'JetBrains Mono',monospace" font-size="9" fill="#8B949E" text-anchor="middle">style_line</text>

  <!-- Panel 2: style_area -->
  <rect x="145" y="10" width="120" height="160" fill="none" stroke="#30363D" stroke-width="1" rx="3"/>
  <polygon points="155,160 165,130 180,110 195,90 210,105 225,85 245,95 265,75 265,160" fill="#3B82F6" opacity="0.25"/>
  <polyline points="155,130 165,110 180,110 195,90 210,105 225,85 245,95 265,75" fill="none" stroke="#3B82F6" stroke-width="2"/>
  <text x="205" y="185" font-family="'JetBrains Mono',monospace" font-size="9" fill="#8B949E" text-anchor="middle">style_area</text>

  <!-- Panel 3: style_histogram -->
  <rect x="280" y="10" width="120" height="160" fill="none" stroke="#30363D" stroke-width="1" rx="3"/>
  <rect x="290" y="80" width="12" height="80" fill="#86EFAC" opacity="0.8"/>
  <rect x="308" y="50" width="12" height="110" fill="#86EFAC" opacity="0.8"/>
  <rect x="326" y="110" width="12" height="50" fill="#E8726A" opacity="0.8"/>
  <rect x="344" y="90" width="12" height="70" fill="#86EFAC" opacity="0.8"/>
  <rect x="362" y="120" width="12" height="40" fill="#E8726A" opacity="0.8"/>
  <rect x="380" y="70" width="12" height="90" fill="#86EFAC" opacity="0.8"/>
  <text x="340" y="185" font-family="'JetBrains Mono',monospace" font-size="9" fill="#8B949E" text-anchor="middle">style_histogram</text>

  <!-- Panel 4: style_stepline -->
  <rect x="415" y="10" width="130" height="160" fill="none" stroke="#30363D" stroke-width="1" rx="3"/>
  <polyline points="425,130 445,130 445,100 465,100 465,115 485,115 485,80 505,80 505,95 525,95 525,70 540,70" fill="none" stroke="#2DD4BF" stroke-width="2"/>
  <text x="478" y="185" font-family="'JetBrains Mono',monospace" font-size="9" fill="#8B949E" text-anchor="middle">style_stepline</text>
</svg>
<figcaption style="color:#6b7280;font-size:0.85rem;margin-top:0.5rem;">Four of the nine plot() style options: line, area, histogram (with conditional color), and stepline</figcaption>
</figure>

<h2>1. Basic plot() Syntax</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">pine</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">//@version=5
indicator("Plot Demo", overlay=true)

ema9  = ta.ema(close, 9)
ema21 = ta.ema(close, 21)

// Minimal call
plot(ema9)

// Full parameter reference
plot(
    series    = ema9,           // any numeric series (required)
    title     = "Fast EMA",     // name in legend and data window
    color     = color.blue,     // line color
    linewidth = 2,              // 1–4 pixels
    style     = plot.style_line // see all styles below
)</code></pre>
</div>

<h2>2. Color — Solid, Transparent, and Conditional</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">pine</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">//@version=5
indicator("Color Demo", overlay=true)

ema = ta.ema(close, 20)
rsi = ta.rsi(close, 14)

// Solid color
plot(ema, color=color.blue)

// color.new() adds transparency (0=opaque, 100=invisible)
plot(ema, color=color.new(color.blue, 60))  // 60% transparent

// Conditional color: ternary operator
bullColor = color.new(color.green, 0)
bearColor = color.new(color.red, 0)
plot(ema, color = close > ema ? bullColor : bearColor)

// More complex: based on RSI level
emaColor = rsi > 70 ? color.red : rsi < 30 ? color.lime : color.gray
plot(ema, color=emaColor, linewidth=2)

// Color from input (user-selectable)
lineColor = input.color(color.blue, "Line Color")
plot(ema, color=lineColor)</code></pre>
</div>

<h2>3. All 9 plot.style_ Constants</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">//@version=5
indicator("All Styles", overlay=false)

val = ta.ema(close, 20) - ta.sma(close, 20)

plot(val, style=plot.style_line)        // standard line
plot(val, style=plot.style_stepline)    // staircase / stepped line
plot(val, style=plot.style_area)        // line + fill to zero
plot(val, style=plot.style_areabr)      // area that breaks on na values
plot(val, style=plot.style_columns)     // vertical columns from zero (like volume bars)
plot(val, style=plot.style_histogram)   // histogram bars
plot(val, style=plot.style_circles)     // dot at each bar close
plot(val, style=plot.style_cross)       // cross marker at each bar
plot(val, style=plot.style_linebr)      // line that breaks on na (gaps where no data)</code></pre>
</div>

<h2>4. linewidth, offset, and display</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">ema = ta.ema(close, 20)

// linewidth: 1 to 4 (integers only)
plot(ema, linewidth=3)

// offset: shift plot left (negative) or right (positive) bars
plot(ema, offset=-5)  // shift 5 bars to the left (forward-looking — use carefully)

// display: control where the plot appears
plot(ema, display=display.all)         // show everywhere (default)
plot(ema, display=display.none)        // hide the plot (useful for internal calculations)
plot(ema, display=display.pane)        // show only in the pane, not in data window
plot(ema, display=display.data_window) // show only in data window hover tooltip

// show_last: only plot the most recent N bars
plot(ema, show_last=100)   // only show last 100 bars

// trackprice: horizontal price line at current value
plot(ema, trackprice=true, show_last=1)  // current EMA price line across chart</code></pre>
</div>

<h2>5. Handling na Values</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">//@version=5
indicator("NA Handling", overlay=true)

// plot() automatically skips na values (no crash, just a gap in the line)
// This is safe — use na to conditionally show/hide a plot
signalVal = ta.crossover(ta.ema(close, 9), ta.ema(close, 21)) ? close : na
plot(signalVal, style=plot.style_circles, color=color.lime, linewidth=5)

// style_linebr vs style_line: linebr shows a gap at na values
//   style_line connects across na points (usually undesirable for sparse data)
//   style_linebr shows actual data gaps

// Force a value when na (fill forward)
val = ta.ema(close, 20)
safeVal = na(val) ? nz(val, close) : val  // nz() replaces na with a default</code></pre>
</div>

<h2>6. plotshape() and plotchar()</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">//@version=5
indicator("Shapes and Chars", overlay=true)

buySignal  = ta.crossover(ta.ema(close, 9), ta.ema(close, 21))
sellSignal = ta.crossunder(ta.ema(close, 9), ta.ema(close, 21))

// plotshape(): draw a shape at signal bars
plotshape(buySignal,  title="Buy",  style=shape.triangleup,   location=location.belowbar, color=color.lime, size=size.small)
plotshape(sellSignal, title="Sell", style=shape.triangledown, location=location.abovebar, color=color.red,  size=size.small)

// plotchar(): draw a text character at signal bars
plotchar(buySignal,  "Buy Char",  "▲", location.belowbar, color.lime,  size=size.tiny)
plotchar(sellSignal, "Sell Char", "▼", location.abovebar, color.red,   size=size.tiny)

// Shapes available: shape.circle, shape.square, shape.diamond,
//   shape.triangleup, shape.triangledown, shape.arrowup, shape.arrowdown,
//   shape.labelup, shape.labeldown, shape.xcross, shape.cross, shape.flag</code></pre>
</div>

<h2>7. overlay=true vs Separate Pane</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">//@version=5
// overlay=true: indicator draws ON the price chart
indicator("On Chart", overlay=true)
plot(ta.ema(close, 20))   // draws on the candlestick chart

//@version=5
// overlay=false (default): indicator draws in a SEPARATE pane below
indicator("Oscillator", overlay=false)
rsi = ta.rsi(close, 14)
plot(rsi, "RSI")
hline(70, "Overbought", color.red)
hline(30, "Oversold",   color.green)</code></pre>
</div>

<p>For strategies that use these visual indicators to trigger entries, see the <a href="/pine-script-strategy-entry/">Pine Script strategy.entry guide</a>. To add alert conditions to your indicator plots, see the <a href="/pine-script-alert-complete-guide/">Pine Script alerts guide</a>.</p>

<h2>Summary</h2>

<p><code>plot(series, title, color, linewidth, style)</code> is the core call. Use <code>color.new(color.blue, 50)</code> for transparency, ternary expressions for conditional colors, and <code>plot.style_histogram</code> or <code>plot.style_columns</code> for bar-based visuals. Use <code>plotshape()</code> for signal markers above/below bars and <code>plot.style_linebr</code> to show gaps where data is missing. Set <code>overlay=true</code> in <code>indicator()</code> to draw on the price pane.</p>
