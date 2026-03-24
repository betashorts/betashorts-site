---
layout: post
title: "NinjaTrader Indicators: Top 5 Built-In Indicators Explained"
date: 2026-03-24
lang: "en"
meta: '<meta name="description" content="NinjaTrader indicators explained for beginners: the top 5 built-in indicators — Moving Average, RSI, MACD, Bollinger Bands, ATR — what they show and how to add them to your chart."><meta name="keywords" content="ninjatrader indicators, ninjatrader built-in indicators, ninjatrader moving average, ninjatrader RSI, ninjatrader MACD, ninjatrader bollinger bands, how to add indicators ninjatrader"><meta name="author" content="Beta Shorts"><meta name="robots" content="index, follow"><link rel="canonical" href="https://betashorts.com/ninjatrader-indicators">'
tags: [NinjaTrader, Trading, Indicators, Technical Analysis, Beginners]
---

<p>NinjaTrader ships with over 100 built-in indicators, which is both useful and overwhelming when you are starting out. This guide cuts through the noise and focuses on the five indicators that are genuinely useful from day one — what each one tells you, how to read it, and how to add it to your chart with the right settings. You do not need to use all five at once; start with one or two and add more as you understand them.</p>

<figure style="max-width:540px;margin:2rem auto;text-align:center;">
<svg viewBox="0 0 540 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;border-radius:8px;">
  <rect width="540" height="180" fill="#0D1117" rx="8"/>
  <rect width="540" height="180" fill="none" stroke="#30363D" stroke-width="1" rx="8"/>
  <!-- Simulated chart bars -->
  <rect x="30" y="80" width="8" height="50" fill="#E8726A" opacity="0.7"/>
  <rect x="48" y="65" width="8" height="60" fill="#86EFAC" opacity="0.7"/>
  <rect x="66" y="55" width="8" height="50" fill="#86EFAC" opacity="0.7"/>
  <rect x="84" y="70" width="8" height="45" fill="#E8726A" opacity="0.7"/>
  <rect x="102" y="60" width="8" height="55" fill="#86EFAC" opacity="0.7"/>
  <rect x="120" y="50" width="8" height="60" fill="#86EFAC" opacity="0.7"/>
  <rect x="138" y="65" width="8" height="45" fill="#E8726A" opacity="0.7"/>
  <rect x="156" y="55" width="8" height="55" fill="#86EFAC" opacity="0.7"/>
  <rect x="174" y="40" width="8" height="65" fill="#86EFAC" opacity="0.7"/>
  <rect x="192" y="60" width="8" height="50" fill="#E8726A" opacity="0.7"/>
  <!-- Moving average line -->
  <polyline points="34,115 52,100 70,88 88,95 106,82 124,70 142,82 160,72 178,60 196,75" fill="none" stroke="#3B82F6" stroke-width="2"/>
  <text x="200" y="70" font-family="'JetBrains Mono',monospace" font-size="9" fill="#3B82F6">MA</text>
  <!-- Bollinger band upper -->
  <polyline points="34,70 52,55 70,48 88,58 106,45 124,35 142,50 160,40 178,28 196,42" fill="none" stroke="#FFA657" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="200" y="38" font-family="'JetBrains Mono',monospace" font-size="9" fill="#FFA657">BB</text>
  <!-- Bollinger band lower -->
  <polyline points="34,145 52,135 70,128 88,136 106,122 124,108 142,118 160,108 178,96 196,110" fill="none" stroke="#FFA657" stroke-width="1" stroke-dasharray="4,3"/>
  <!-- RSI panel -->
  <line x1="20" y1="150" x2="520" y2="150" stroke="#30363D" stroke-width="0.5"/>
  <text x="30" y="165" font-family="'JetBrains Mono',monospace" font-size="9" fill="#8B949E">RSI panel below ↓</text>
  <polyline points="34,165 52,160 70,155 88,162 106,150 124,145 142,158 160,148 178,140 196,155" fill="none" stroke="#2DD4BF" stroke-width="1.5"/>
</svg>
<figcaption style="color:#6b7280;font-size:0.85rem;margin-top:0.5rem;">Moving Average (blue) and Bollinger Bands (orange) on the price chart; RSI in a separate pane below</figcaption>
</figure>

<h2>How to Add Any Indicator in NinjaTrader</h2>

<p>The process is the same for every indicator:</p>

<ol>
  <li>Right-click anywhere on your chart.</li>
  <li>Select <strong>Indicators</strong> from the context menu.</li>
  <li>Find the indicator in the left-hand list (they are sorted alphabetically).</li>
  <li>Double-click it to add it, or single-click and press the right-arrow button.</li>
  <li>Adjust the parameters on the right side of the panel.</li>
  <li>Click <strong>OK</strong>.</li>
</ol>

<p>To remove an indicator, go back to the same Indicators panel, select it in the right-hand list, and press the left-arrow button to remove it.</p>

<h2>1. Moving Average (SMA / EMA)</h2>

<p><strong>What it does:</strong> A moving average smooths price data over a set number of bars so you can see the underlying trend without the noise of individual candles.</p>

<p><strong>SMA (Simple Moving Average)</strong> gives equal weight to every bar in the period. <strong>EMA (Exponential Moving Average)</strong> gives more weight to recent bars, so it reacts faster to price changes. Most active traders prefer the EMA because it is more responsive.</p>

<h3>Good starting settings</h3>
<ul>
  <li><strong>EMA 9</strong> — fast, shows short-term momentum</li>
  <li><strong>EMA 21</strong> — medium-term trend direction</li>
  <li><strong>SMA 200</strong> — long-term trend filter (is price above or below the 200?)</li>
</ul>

<p><strong>How to read it:</strong> When price is above the MA, the trend is up. When price crosses above the MA from below, it is a potential buy signal. When two MAs cross (the shorter crossing above the longer), it signals a trend change — called a golden cross (bullish) or death cross (bearish).</p>

<p><strong>In NinjaTrader:</strong> Search for <strong>EMA</strong> or <strong>SMA</strong> in the Indicators panel. Set the Period to 9 or 21. You can add both to the same chart and change their colours to tell them apart.</p>

<h2>2. RSI (Relative Strength Index)</h2>

<p><strong>What it does:</strong> RSI measures how fast price has been moving and whether a move has gone too far in one direction. It produces a value between 0 and 100.</p>

<ul>
  <li><strong>Above 70</strong> — overbought (price may have risen too far, too fast)</li>
  <li><strong>Below 30</strong> — oversold (price may have fallen too far, too fast)</li>
  <li><strong>Around 50</strong> — neutral, no strong signal either way</li>
</ul>

<p><strong>How to read it:</strong> RSI is most useful as a filter, not a standalone signal. If price is near a support level <em>and</em> RSI is below 30, that adds confidence to a potential bounce. Do not buy just because RSI is below 30 — in a strong downtrend it can stay below 30 for a long time.</p>

<p><strong>In NinjaTrader:</strong> Search for <strong>RSI</strong>. The default period is 14. RSI plots in a separate pane below the chart automatically. The overbought (70) and oversold (30) lines are drawn by default.</p>

<h2>3. MACD (Moving Average Convergence Divergence)</h2>

<p><strong>What it does:</strong> MACD measures the distance between two EMAs (usually 12 and 26 periods) and plots that distance as a line. A second line (the Signal line, a 9-period EMA of MACD) is plotted alongside it. When the MACD line crosses above the Signal line it is a bullish signal; crossing below is bearish.</p>

<p>The histogram shows the difference between the MACD line and the Signal line — when bars are growing (getting taller) momentum is increasing; when they are shrinking, momentum is fading.</p>

<h3>Good starting settings</h3>
<ul>
  <li>Fast EMA: 12</li>
  <li>Slow EMA: 26</li>
  <li>Signal period: 9</li>
</ul>

<p>These are the universal defaults and work well on any timeframe as a starting point.</p>

<p><strong>In NinjaTrader:</strong> Search for <strong>MACD</strong>. It plots in a separate pane with the histogram, MACD line, and Signal line all visible by default.</p>

<h2>4. Bollinger Bands</h2>

<p><strong>What they do:</strong> Bollinger Bands place a band above and below a moving average (usually a 20-period SMA). The band width expands when volatility is high and contracts when volatility is low. Price tends to stay within the bands about 95% of the time — touches or breaks outside the band are notable events.</p>

<ul>
  <li><strong>Band squeeze</strong> — when the bands come close together, a large move is often building up. Traders watch for the breakout direction.</li>
  <li><strong>Walking the band</strong> — in a strong trend, price can hug the upper or lower band for many bars. This is not a reversal signal on its own.</li>
  <li><strong>Mean reversion</strong> — price touching the upper band in a range-bound market often reverts back toward the middle band.</li>
</ul>

<p><strong>In NinjaTrader:</strong> Search for <strong>Bollinger Bands</strong>. The default settings are Period 20, Standard Deviations 2. The bands overlay directly on the price chart.</p>

<h2>5. ATR (Average True Range)</h2>

<p><strong>What it does:</strong> ATR measures average volatility — specifically, how far price typically moves in a single bar. It does not tell you direction; it tells you how large the moves are.</p>

<p>ATR is particularly useful for position sizing and stop placement:</p>

<ul>
  <li>If ATR is 10 points on the ES, a 5-point stop is probably too tight — price will hit it randomly without the trade having actually failed.</li>
  <li>A stop of 1.5×ATR (15 points in this example) gives the trade room to breathe.</li>
  <li>As ATR rises, volatility is increasing — you may want to reduce your position size to keep your dollar risk constant.</li>
</ul>

<p><strong>How to read it:</strong> ATR is shown as a number in the pane below the chart. The higher the number, the more volatile the instrument is currently trading. Compare today's ATR to its recent average to judge whether conditions are calm or wild.</p>

<p><strong>In NinjaTrader:</strong> Search for <strong>ATR</strong>. Default period is 14. It plots in a separate pane as a single line.</p>

<h2>Which Indicators to Start With</h2>

<p>If you are completely new, resist the urge to add all five at once. A chart covered in indicators is confusing and can lead to contradictory signals. Start here:</p>

<ol>
  <li>Add <strong>EMA 9</strong> and <strong>EMA 21</strong> to your price chart — these two together show trend direction and crossover signals.</li>
  <li>Add <strong>ATR 14</strong> in a separate pane — use it to set sensible stops from the beginning.</li>
  <li>Once you are comfortable with those, add <strong>RSI</strong> as a filter.</li>
  <li>Experiment with <strong>MACD</strong> and <strong>Bollinger Bands</strong> after you have traded with the basics for a while.</li>
</ol>

<p>More indicators do not mean better signals. They mean more noise to manage.</p>

<h2>Summary</h2>

<p>NinjaTrader's five most useful built-in indicators for beginners are the EMA (trend direction), RSI (momentum extremes), MACD (trend and momentum crossovers), Bollinger Bands (volatility and range), and ATR (volatility size for stops). Add them from the right-click Indicators panel. Start with EMA and ATR, and layer in others once you understand what each one is measuring.</p>

<p>Once you are comfortable reading indicators, the logical next step is building a strategy around them — covered in the <a href="/ninjatrader-strategy-builder/">NinjaTrader Strategy Builder guide</a>. If you use TradingView alongside NinjaTrader, the <a href="https://betashorts.gumroad.com/l/kwrjr" target="_blank"><strong>Pine Script cheatsheet</strong></a> covers the equivalent indicator functions in Pine Script.</p>
