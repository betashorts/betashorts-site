---
layout: post
title: "Pine Script strategy.entry: The Complete Parameter Reference"
date: 2026-03-17
lang: "en"
meta: '<meta name="description" content="Pine Script strategy.entry complete reference: all parameters explained with examples — direction, qty, limit, stop, comment, alert_message, and 4 complete strategy examples."><meta name="keywords" content="pine script strategy.entry, pine script long short, tradingview strategy entry, pine script strategy parameters"><meta name="author" content="Beta Shorts"><meta name="robots" content="index, follow"><link rel="canonical" href="https://betashorts.com/pine-script-strategy-entry">'
tags: [Pine Script, TradingView, Trading, Strategy, Backtesting]
---

<p>Pine Script's <code>strategy.entry()</code> is the function you call to open a position in a TradingView strategy. Understanding its parameters — especially the difference between market, limit, and stop order types, how position sizing works, and what <code>alert_message</code> does — is essential before you can write any non-trivial strategy. This guide covers the complete parameter reference with practical examples ranging from a simple MA crossover to pyramiding.</p>

<figure style="max-width:560px;margin:2rem auto;text-align:center;">
<svg viewBox="0 0 560 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;border-radius:8px;">
  <rect width="560" height="260" fill="#0D1117" rx="8"/>
  <rect width="560" height="260" fill="none" stroke="#30363D" stroke-width="1" rx="8"/>
  <!-- Header -->
  <rect x="0" y="0" width="560" height="32" fill="#161B22" rx="8"/>
  <rect x="0" y="20" width="560" height="12" fill="#161B22"/>
  <text x="100" y="20" font-family="'JetBrains Mono',monospace" font-size="10" fill="#3B82F6">Parameter</text>
  <text x="220" y="20" font-family="'JetBrains Mono',monospace" font-size="10" fill="#3B82F6">Type</text>
  <text x="300" y="20" font-family="'JetBrains Mono',monospace" font-size="10" fill="#3B82F6">Description</text>
  <line x1="0" y1="32" x2="560" y2="32" stroke="#30363D" stroke-width="1"/>
  <!-- Rows -->
  <text x="16" y="54" font-family="'JetBrains Mono',monospace" font-size="11" fill="#79C0FF">id</text>
  <text x="220" y="54" font-family="'JetBrains Mono',monospace" font-size="11" fill="#FFA657">string</text>
  <text x="300" y="54" font-family="'JetBrains Mono',monospace" font-size="11" fill="#8B949E">Unique name for this entry</text>
  <line x1="0" y1="62" x2="560" y2="62" stroke="#30363D" stroke-width="0.5"/>

  <text x="16" y="84" font-family="'JetBrains Mono',monospace" font-size="11" fill="#79C0FF">direction</text>
  <text x="220" y="84" font-family="'JetBrains Mono',monospace" font-size="11" fill="#FFA657">const</text>
  <text x="300" y="84" font-family="'JetBrains Mono',monospace" font-size="11" fill="#8B949E">strategy.long or .short</text>
  <line x1="0" y1="92" x2="560" y2="92" stroke="#30363D" stroke-width="0.5"/>

  <text x="16" y="114" font-family="'JetBrains Mono',monospace" font-size="11" fill="#79C0FF">qty</text>
  <text x="220" y="114" font-family="'JetBrains Mono',monospace" font-size="11" fill="#FFA657">float</text>
  <text x="300" y="114" font-family="'JetBrains Mono',monospace" font-size="11" fill="#8B949E">Contracts/shares (optional)</text>
  <line x1="0" y1="122" x2="560" y2="122" stroke="#30363D" stroke-width="0.5"/>

  <text x="16" y="144" font-family="'JetBrains Mono',monospace" font-size="11" fill="#79C0FF">limit</text>
  <text x="220" y="144" font-family="'JetBrains Mono',monospace" font-size="11" fill="#FFA657">float</text>
  <text x="300" y="144" font-family="'JetBrains Mono',monospace" font-size="11" fill="#8B949E">Limit order price</text>
  <line x1="0" y1="152" x2="560" y2="152" stroke="#30363D" stroke-width="0.5"/>

  <text x="16" y="174" font-family="'JetBrains Mono',monospace" font-size="11" fill="#79C0FF">stop</text>
  <text x="220" y="174" font-family="'JetBrains Mono',monospace" font-size="11" fill="#FFA657">float</text>
  <text x="300" y="174" font-family="'JetBrains Mono',monospace" font-size="11" fill="#8B949E">Stop order price</text>
  <line x1="0" y1="182" x2="560" y2="182" stroke="#30363D" stroke-width="0.5"/>

  <text x="16" y="204" font-family="'JetBrains Mono',monospace" font-size="11" fill="#79C0FF">comment</text>
  <text x="220" y="204" font-family="'JetBrains Mono',monospace" font-size="11" fill="#FFA657">string</text>
  <text x="300" y="204" font-family="'JetBrains Mono',monospace" font-size="11" fill="#8B949E">Label shown on chart</text>
  <line x1="0" y1="212" x2="560" y2="212" stroke="#30363D" stroke-width="0.5"/>

  <text x="16" y="234" font-family="'JetBrains Mono',monospace" font-size="11" fill="#79C0FF">alert_message</text>
  <text x="220" y="234" font-family="'JetBrains Mono',monospace" font-size="11" fill="#FFA657">string</text>
  <text x="300" y="234" font-family="'JetBrains Mono',monospace" font-size="11" fill="#8B949E">Text sent with alert/webhook</text>
</svg>
<figcaption style="color:#6b7280;font-size:0.85rem;margin-top:0.5rem;">Complete strategy.entry() parameter reference</figcaption>
</figure>

<h2>1. Basic Usage</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">pine</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">//@version=5
strategy("My Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=10)

fastMA = ta.ema(close, 9)
slowMA = ta.ema(close, 21)

// strategy.entry(id, direction)
// id: unique string that identifies this order (used to cancel or close it later)
// direction: strategy.long or strategy.short

if ta.crossover(fastMA, slowMA)
    strategy.entry("Long Entry", strategy.long)

if ta.crossunder(fastMA, slowMA)
    strategy.entry("Short Entry", strategy.short)</code></pre>
</div>

<h2>2. Order Types: Market, Limit, and Stop</h2>

<p>The <code>limit</code> and <code>stop</code> parameters change the order type:</p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">pine</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">//@version=5
strategy("Order Types", overlay=true)

signal = ta.crossover(ta.ema(close, 9), ta.ema(close, 21))

if signal
    // Market order (default — no limit or stop parameter)
    strategy.entry("Market Long", strategy.long)

    // Limit order — fills only at price ≤ limitPrice (for long)
    limitPrice = close * 0.99   // 1% below current close
    strategy.entry("Limit Long", strategy.long, limit=limitPrice)

    // Stop order — activates when price reaches stopPrice, then fills at market
    stopPrice = close * 1.01    // 1% above current close
    strategy.entry("Stop Long", strategy.long, stop=stopPrice)

    // Stop-limit — both params: activates at stop, fills at limit
    strategy.entry("StopLimit", strategy.long, stop=stopPrice, limit=limitPrice)</code></pre>
</div>

<h2>3. Position Sizing with qty</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">//@version=5
// default_qty_type controls what default_qty_value means
strategy("Sizing Demo", overlay=true,
    default_qty_type  = strategy.percent_of_equity,  // use % of equity
    default_qty_value = 10)                          // default: 10% per trade

// Override qty for a specific entry (in contracts/shares if no default_qty_type override)
strategy.entry("Big Trade", strategy.long, qty=100)

// Size based on ATR (volatility-adjusted)
atrSize = ta.atr(14)
riskAmount = strategy.equity * 0.01   // risk 1% of equity
qtyFromRisk = math.floor(riskAmount / (atrSize * 2))

if ta.crossover(ta.ema(close, 9), ta.ema(close, 21))
    strategy.entry("Volatility Sized", strategy.long, qty=qtyFromRisk)</code></pre>
</div>

<h2>4. comment and alert_message</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">//@version=5
strategy("Comment Demo", overlay=true)

buySignal = ta.crossover(ta.ema(close, 9), ta.ema(close, 21))

if buySignal
    strategy.entry(
        id            = "Buy",
        direction     = strategy.long,
        comment       = "EMA Cross",           // label shown on the chart at entry bar
        alert_message = '{"action":"buy","symbol":"' + syminfo.ticker + '","price":' + str.tostring(close) + '}'
    )
    // alert_message is sent when the strategy's alert fires
    // Create the alert: Alerts → Create → Condition: "Your Strategy" → "Order fills only"</code></pre>
</div>

<h2>5. strategy.entry vs strategy.order vs strategy.close</h2>

<ul>
<li><strong><code>strategy.entry()</code></strong> — opens a new position (or adds to existing if pyramiding is enabled). If an opposite position is open, it closes it first then opens the new one. Two entries with the same <code>id</code> and direction cancel and replace each other.</li>
<li><strong><code>strategy.order()</code></strong> — lower-level function with more control. Doesn't automatically close opposite positions. Use when you need precise order management.</li>
<li><strong><code>strategy.close()</code></strong> — closes an existing entry by its <code>id</code>.</li>
<li><strong><code>strategy.close_all()</code></strong> — closes all open positions immediately.</li>
</ul>

<h2>6. Pyramiding Example</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">//@version=5
// pyramiding=3 allows up to 3 entries in the same direction
strategy("Pyramid Demo", overlay=true, pyramiding=3,
    default_qty_type=strategy.percent_of_equity, default_qty_value=5)

rsi = ta.rsi(close, 14)

// Each entry has a unique id — all three can be open simultaneously
if rsi < 35
    strategy.entry("Long 1", strategy.long, comment="RSI < 35")
if rsi < 30
    strategy.entry("Long 2", strategy.long, comment="RSI < 30")
if rsi < 25
    strategy.entry("Long 3", strategy.long, comment="RSI < 25")

// Close all when RSI recovers
if rsi > 60
    strategy.close_all(comment="RSI recovered")</code></pre>
</div>

<p>To trigger alerts when entries fire, see the <a href="/pine-script-alert-complete-guide/">Pine Script alerts guide</a>. To control what inputs drive your strategy, see <a href="/pine-script-input-guide/">Pine Script input() guide</a>.</p>

<h2>Summary</h2>

<p>The minimum call is <code>strategy.entry("id", strategy.long)</code>. Add <code>limit=price</code> for limit orders, <code>stop=price</code> for stop orders, <code>qty=n</code> to override default sizing, <code>comment="text"</code> for chart labels, and <code>alert_message="json"</code> for webhook payloads. Use unique <code>id</code> strings to differentiate entries so you can close specific positions with <code>strategy.close("id")</code>.</p>
