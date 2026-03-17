---
layout: post
title: "Pine Script Alerts: The Complete Setup Guide (alertcondition Explained)"
date: 2026-03-17
lang: "en"
meta: '<meta name="description" content="Pine Script alert guide: alertcondition vs alert(), frequency options, TradingView UI setup, message placeholders, webhook automation, and the local scope error explained."><meta name="keywords" content="pine script alert, pine script alertcondition, tradingview alert conditions, pine script alert message, pine script webhook"><meta name="author" content="Beta Shorts"><meta name="robots" content="index, follow"><link rel="canonical" href="https://betashorts.com/pine-script-alert-complete-guide">'
tags: [Pine Script, TradingView, Trading, Alerts, Automation]
---

<p>Pine Script alerts are what turn an indicator from a passive visual tool into an active notification system. But TradingView's alert setup confuses many beginners — there are two different functions (<code>alertcondition()</code> and <code>alert()</code>), the UI dialog has confusing frequency options, and a specific scoping rule about where you can call <code>alertcondition()</code> trips up almost everyone the first time. This complete guide covers everything from basic setup to webhook automation.</p>

<figure style="max-width:520px;margin:2rem auto;text-align:center;">
<svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;border-radius:8px;">
  <rect width="520" height="200" fill="#0D1117" rx="8"/>
  <rect width="520" height="200" fill="none" stroke="#30363D" stroke-width="1" rx="8"/>
  <!-- Dialog panel -->
  <rect x="60" y="20" width="400" height="160" fill="#161B22" rx="6" stroke="#30363D" stroke-width="1"/>
  <text x="260" y="44" font-family="'JetBrains Mono',monospace" font-size="13" fill="#E6EDF3" text-anchor="middle">Create Alert</text>
  <line x1="60" y1="52" x2="460" y2="52" stroke="#30363D" stroke-width="1"/>
  <!-- Field 1 -->
  <text x="80" y="74" font-family="'JetBrains Mono',monospace" font-size="11" fill="#8B949E">Condition</text>
  <rect x="180" y="60" width="260" height="22" fill="#0D1117" rx="3" stroke="#30363D" stroke-width="1"/>
  <text x="195" y="75" font-family="'JetBrains Mono',monospace" font-size="10" fill="#79C0FF">My Indicator → Signal Triggered</text>
  <!-- Field 2 -->
  <text x="80" y="106" font-family="'JetBrains Mono',monospace" font-size="11" fill="#8B949E">Frequency</text>
  <rect x="180" y="92" width="260" height="22" fill="#0D1117" rx="3" stroke="#30363D" stroke-width="1"/>
  <text x="195" y="107" font-family="'JetBrains Mono',monospace" font-size="10" fill="#E6EDF3">Once Per Bar Close  ▾</text>
  <!-- Field 3 -->
  <text x="80" y="138" font-family="'JetBrains Mono',monospace" font-size="11" fill="#8B949E">Message</text>
  <rect x="180" y="124" width="260" height="22" fill="#0D1117" rx="3" stroke="#30363D" stroke-width="1"/>
  <text x="195" y="139" font-family="'JetBrains Mono',monospace" font-size="10" fill="#8B949E">{{ticker}} signal at {{close}}</text>
  <!-- Create button -->
  <rect x="190" y="158" width="140" height="14" fill="#3B82F6" rx="3"/>
  <text x="260" y="169" font-family="'JetBrains Mono',monospace" font-size="9" fill="white" text-anchor="middle">Create Alert</text>
</svg>
<figcaption style="color:#6b7280;font-size:0.85rem;margin-top:0.5rem;">TradingView Create Alert dialog — your alertcondition() calls appear in the Condition dropdown</figcaption>
</figure>

<h2>1. alertcondition() vs alert() — Which to Use</h2>

<p>Pine Script v5 has two alerting mechanisms with different use cases:</p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">pine</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">//@version=5
indicator("Alert Demo", overlay=true)

fastMA = ta.ema(close, 9)
slowMA = ta.ema(close, 21)

// alertcondition(): registers an alert template in the Create Alert dialog
// Must be at GLOBAL SCOPE (not inside if blocks)
// User creates the actual alert in TradingView UI
bullCross = ta.crossover(fastMA, slowMA)
alertcondition(bullCross, title="Bullish Cross", message="EMA crossover on {{ticker}}")

// alert(): fires immediately when condition is true on each bar
// More flexible — can be called anywhere, including inside if blocks
// Works in strategies too
if bullCross
    alert("Bullish EMA cross on " + syminfo.ticker, alert.freq_once_per_bar)</code></pre>
</div>

<p><strong>Key differences:</strong> <code>alertcondition()</code> just registers a template — the user still has to create the alert in TradingView's UI. <code>alert()</code> fires programmatically without any UI setup required. For strategies or when you want dynamic alert messages, use <code>alert()</code>. For simple indicators that users will add alerts to themselves, <code>alertcondition()</code> is the standard approach.</p>

<h2>2. The alertcondition Scope Error (and Fix)</h2>

<p>This is the most common Pine Script alert error. <code>alertcondition()</code> must be called at the global scope of your script — not inside <code>if</code>, <code>for</code>, or function blocks:</p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">pine</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">//@version=5
indicator("My Indicator", overlay=true)

rsiVal = ta.rsi(close, 14)
isOversold = rsiVal < 30

// WRONG — alertcondition inside an if block causes compile error:
// "Function 'alertcondition' should be called on each calculation."
if isOversold
    alertcondition(true, title="Oversold", message="RSI oversold")

// CORRECT — compute condition first, then call at global scope
oversoldAlert = rsiVal < 30
alertcondition(oversoldAlert, title="RSI Oversold", message="RSI below 30 on {{ticker}} at {{close}}")</code></pre>
</div>

<h2>3. Frequency Options Explained</h2>

<p>When creating an alert in TradingView's UI, the frequency setting controls how often alerts fire:</p>

<ul>
<li><strong>Once Per Bar</strong> — fires on the first tick that meets the condition within a bar. Can fire multiple times per bar if condition briefly becomes false then true again.</li>
<li><strong>Once Per Bar Close</strong> — fires only when a bar closes with the condition true. Most reliable for avoiding false signals.</li>
<li><strong>Once Per Minute</strong> — fires at most once per minute while condition is true.</li>
<li><strong>Only Once</strong> — fires a single time ever, then deactivates. Useful for one-time setup notifications.</li>
</ul>

<p>For strategies, use <code>alert.freq_once_per_bar_close</code> to avoid partial-bar signals:</p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">// Frequency constants for alert()
alert("Signal", alert.freq_once_per_bar)           // once per bar, first occurrence
alert("Signal", alert.freq_once_per_bar_close)     // only on confirmed bar close
alert("Signal", alert.freq_all)                    // every tick (use carefully)</code></pre>
</div>

<h2>4. Alert Message Placeholders</h2>

<p>TradingView supports dynamic placeholders in alert messages that get replaced with live values:</p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">alertcondition(
    condition = buySignal,
    title     = "Buy Signal",
    message   = "BUY {{ticker}} | Close: {{close}} | Time: {{time}} | TF: {{interval}}"
)

// Available placeholders:
// {{ticker}}    — symbol name (e.g., BINANCE:BTCUSDT)
// {{exchange}}  — exchange name
// {{close}}     — closing price of the bar
// {{open}}, {{high}}, {{low}}
// {{volume}}    — bar volume
// {{time}}      — bar time in Unix ms
// {{timenow}}   — current time in Unix ms
// {{interval}}  — chart timeframe (e.g., "1D", "60")
// {{plot_0}}    — value of the first plot() in your script</code></pre>
</div>

<h2>5. Webhook Integration for Automation</h2>

<p>You can send alert messages to any webhook URL — useful for connecting TradingView to trading bots or notification systems:</p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">// Structure your alert message as JSON for webhook consumption
alertcondition(
    condition = buySignal,
    title     = "Buy Signal",
    message   = '{"action":"buy","symbol":"{{ticker}}","price":{{close}},"time":"{{time}}"}'
)

// In the TradingView Create Alert dialog:
// 1. Set the condition to your alertcondition title
// 2. Under "Notifications", enable "Webhook URL"
// 3. Enter your webhook endpoint (e.g., your bot's /webhook route)
// TradingView will POST the message body as the request body</code></pre>
</div>

<p>For building complete strategies with entries and exits that use alerts, see the <a href="/pine-script-strategy-entry/">pine-script strategy.entry guide</a> which covers the <code>alert_message</code> parameter on strategy functions.</p>

<h2>Summary</h2>

<p>Use <code>alertcondition()</code> at global scope to register alert templates for users; use <code>alert()</code> inside conditional blocks for programmatic firing. Always compute your condition boolean before passing it to <code>alertcondition()</code> — never call it inside <code>if</code> blocks. Choose "Once Per Bar Close" frequency for reliable end-of-bar signals, and use placeholders like <code>{{ticker}}</code> and <code>{{close}}</code> to make alert messages informative.</p>
