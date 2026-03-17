---
layout: post
title: "Bash Cron Job Tutorial: Schedule Scripts to Run Automatically"
date: 2026-03-17
lang: "en"
meta: '<meta name="description" content="Bash cron job tutorial: learn the 5-field crontab format, 10 real scheduling examples, how to edit crontab, and fix common cron pitfalls."><meta name="keywords" content="bash cron job, crontab tutorial, bash schedule script, cron job examples, crontab -e"><meta name="author" content="Beta Shorts"><meta name="robots" content="index, follow"><link rel="canonical" href="https://betashorts.com/bash-cron-job-tutorial">'
tags: [Bash, Linux, Cron, Automation, Scripting]
---

<p>Bash cron jobs are the standard way to schedule scripts to run automatically on Linux and macOS. Whether you need to back up a database every night, clean log files weekly, or send a report every hour, cron handles it without any external tools. This tutorial covers the full crontab format, 10 real scheduling examples, how to manage your crontab, and the most common cron pitfalls that catch beginners off guard.</p>

<figure style="max-width:560px;margin:2rem auto;text-align:center;">
<svg viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;border-radius:8px;">
  <rect width="560" height="200" fill="#0D1117" rx="8"/>
  <rect width="560" height="200" fill="none" stroke="#30363D" stroke-width="1" rx="8"/>
  <!-- Terminal chrome -->
  <rect x="0" y="0" width="560" height="32" fill="#161B22" rx="8"/>
  <rect x="0" y="20" width="560" height="12" fill="#161B22"/>
  <circle cx="20" cy="16" r="6" fill="#FF5F57"/>
  <circle cx="40" cy="16" r="6" fill="#FFBD2E"/>
  <circle cx="60" cy="16" r="6" fill="#28C840"/>
  <text x="280" y="21" font-family="'JetBrains Mono',monospace" font-size="11" fill="#8B949E" text-anchor="middle">crontab — vi</text>
  <!-- Cron entries -->
  <text x="20" y="60" font-family="'JetBrains Mono',monospace" font-size="12" fill="#8B949E"># minute  hour  day  month  weekday  command</text>
  <!-- Entry 1 -->
  <text x="20" y="90" font-family="'JetBrains Mono',monospace" font-size="13">
    <tspan fill="#FFA657">0</tspan><tspan fill="#E6EDF3"> </tspan>
    <tspan fill="#FFA657">2</tspan><tspan fill="#E6EDF3"> </tspan>
    <tspan fill="#FF7B72">*</tspan><tspan fill="#E6EDF3"> </tspan>
    <tspan fill="#FF7B72">*</tspan><tspan fill="#E6EDF3"> </tspan>
    <tspan fill="#FF7B72">*</tspan><tspan fill="#E6EDF3">  </tspan>
    <tspan fill="#79C0FF">/usr/local/bin/backup.sh</tspan>
  </text>
  <!-- Entry 2 -->
  <text x="20" y="118" font-family="'JetBrains Mono',monospace" font-size="13">
    <tspan fill="#FFA657">*/5</tspan><tspan fill="#E6EDF3"> </tspan>
    <tspan fill="#FF7B72">*</tspan><tspan fill="#E6EDF3"> </tspan>
    <tspan fill="#FF7B72">*</tspan><tspan fill="#E6EDF3"> </tspan>
    <tspan fill="#FF7B72">*</tspan><tspan fill="#E6EDF3"> </tspan>
    <tspan fill="#FF7B72">*</tspan><tspan fill="#E6EDF3">  </tspan>
    <tspan fill="#79C0FF">/scripts/health-check.sh</tspan>
  </text>
  <!-- Entry 3 -->
  <text x="20" y="146" font-family="'JetBrains Mono',monospace" font-size="13">
    <tspan fill="#FFA657">0</tspan><tspan fill="#E6EDF3"> </tspan>
    <tspan fill="#FFA657">9</tspan><tspan fill="#E6EDF3"> </tspan>
    <tspan fill="#FF7B72">*</tspan><tspan fill="#E6EDF3"> </tspan>
    <tspan fill="#FF7B72">*</tspan><tspan fill="#E6EDF3"> </tspan>
    <tspan fill="#FFA657">1</tspan><tspan fill="#E6EDF3">  </tspan>
    <tspan fill="#79C0FF">/scripts/weekly-report.sh</tspan>
  </text>
  <text x="20" y="174" font-family="'JetBrains Mono',monospace" font-size="11" fill="#8B949E"># @reboot   /scripts/startup.sh</text>
</svg>
<figcaption style="color:#6b7280;font-size:0.85rem;margin-top:0.5rem;">A crontab file showing three scheduled jobs with field-level syntax coloring</figcaption>
</figure>

<h2>1. The 5-Field Crontab Format</h2>

<p>Every cron expression has exactly five time fields followed by the command to run. The fields go left to right:</p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">┌───────────── minute        (0 - 59)
│ ┌─────────── hour          (0 - 23)
│ │ ┌───────── day of month  (1 - 31)
│ │ │ ┌─────── month         (1 - 12)
│ │ │ │ ┌───── day of week   (0 - 7, 0 and 7 = Sunday)
│ │ │ │ │
* * * * *  command to execute</code></pre>
</div>

<p>Special values you can use in any field:</p>
<ul>
<li><code>*</code> — every unit (every minute, every hour, etc.)</li>
<li><code>*/n</code> — every nth unit (*/5 in the minute field = every 5 minutes)</li>
<li><code>n,m</code> — specific values (1,15 in hour field = 1am and 3pm)</li>
<li><code>n-m</code> — range (1-5 in weekday = Monday through Friday)</li>
</ul>

<h2>2. 10 Real Cron Job Examples</h2>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">bash</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;"># Every minute
* * * * * /scripts/ping-check.sh

# Every hour at :00
0 * * * * /scripts/hourly-cleanup.sh

# Every day at 2:30 AM
30 2 * * * /scripts/nightly-backup.sh

# Every 5 minutes
*/5 * * * * /scripts/health-check.sh

# Every Monday at 9 AM
0 9 * * 1 /scripts/weekly-report.sh

# First day of every month at midnight
0 0 1 * * /scripts/monthly-invoice.sh

# Every weekday (Mon-Fri) at 8 AM
0 8 * * 1-5 /scripts/workday-start.sh

# Every 15 minutes between 9 AM and 5 PM
*/15 9-17 * * * /scripts/poll-api.sh

# Run once at system boot
@reboot /scripts/startup-tasks.sh

# Every Sunday at 4 AM
0 4 * * 0 /scripts/deep-cleanup.sh</code></pre>
</div>

<p>The <code>@reboot</code> shortcut runs your script once when the system starts — no numeric fields needed. Other shortcuts include <code>@hourly</code>, <code>@daily</code>, <code>@weekly</code>, and <code>@monthly</code>.</p>

<h2>3. How to Edit Your Crontab</h2>

<p>Never edit cron files directly. Use the <code>crontab</code> command instead:</p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">bash</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;"># Open the crontab editor (uses $EDITOR, defaults to vi/nano)
crontab -e

# List all current cron jobs for your user
crontab -l

# Remove all cron jobs (careful — no confirmation prompt)
crontab -r

# Edit another user's crontab (requires root)
sudo crontab -u www-data -e</code></pre>
</div>

<p>When you save and exit the editor, cron validates the file automatically. A syntax error will be reported and you'll be prompted to re-edit or discard.</p>

<h2>4. The Missing PATH Problem (Always Use Full Paths)</h2>

<p>The most common reason cron jobs fail silently is the PATH environment variable. Cron runs with a minimal environment — typically <code>PATH=/usr/bin:/bin</code>. Commands that work fine in your terminal (because your shell has a richer PATH) will silently fail in cron.</p>

<p><strong>Fix 1: Use full absolute paths everywhere</strong></p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">bash</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;"># WRONG — python3 might not be in cron's PATH
0 6 * * * python3 /home/user/report.py

# RIGHT — use the full path
0 6 * * * /usr/bin/python3 /home/user/report.py

# Find the full path of a command:
which python3
# → /usr/bin/python3</code></pre>
</div>

<p><strong>Fix 2: Set PATH at the top of your crontab</strong></p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;">PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

0 2 * * * backup.sh   # now works because PATH is set above</code></pre>
</div>

<h2>5. Logging Cron Output</h2>

<p>By default, cron mails output to the local user account — output you'll never see. Redirect it to a log file instead:</p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
<span style="color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:0.75rem;">bash</span>
<button onclick="navigator.clipboard.writeText(this.closest('div').parentElement.querySelector('code').innerText)" style="background:transparent;border:1px solid #30363D;color:#8B949E;padding:0.2rem 0.5rem;border-radius:4px;cursor:pointer;font-size:0.75rem;">Copy</button>
</div>
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;"># Append stdout to log, discard stderr
0 2 * * * /scripts/backup.sh >> /var/log/backup.log

# Append both stdout and stderr to log (most useful)
0 2 * * * /scripts/backup.sh >> /var/log/backup.log 2>&1

# Discard all output silently
0 2 * * * /scripts/backup.sh > /dev/null 2>&1

# Timestamp each log entry inside your script:
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Backup started" >> /var/log/backup.log</code></pre>
</div>

<p>The <code>2>&1</code> part redirects stderr (file descriptor 2) into stdout (file descriptor 1), so both go to the same log file. This is essential for debugging failing cron jobs.</p>

<h2>6. Testing and Debugging Cron Jobs</h2>

<p>Before relying on a cron schedule, test your script runs correctly in cron's minimal environment:</p>

<div style="background:#0D1117;border-radius:8px;padding:1.25rem;margin:1.5rem 0;overflow-x:auto;border:1px solid #30363D;">
<pre style="margin:0;"><code style="font-family:'JetBrains Mono',monospace;font-size:0.85rem;color:#E6EDF3;"># Simulate cron's environment and run your script
env -i HOME=/root LOGNAME=root PATH=/usr/bin:/bin SHELL=/bin/sh /scripts/backup.sh

# Check the system cron log (varies by distro)
grep CRON /var/log/syslog         # Debian/Ubuntu
grep crond /var/log/cron          # CentOS/RHEL

# Quick test: schedule 1 minute from now, watch the log
# Set job, wait, then check output file</code></pre>
</div>

<p>For more on shell scripting fundamentals that work well with cron, see the <a href="/bash-function-examples/">Bash functions guide</a> and the <a href="/bash-exit-codes/">bash exit codes article</a> to make your cron scripts more robust.</p>

<h2>Summary</h2>

<p>Cron is one of the most practical tools in any developer's or sysadmin's toolkit. The key rules to remember: use the five-field format (<code>minute hour day month weekday</code>), always use full absolute paths in cron commands, redirect output to log files with <code>>> /var/log/myjob.log 2>&1</code>, and test your script in a minimal environment before scheduling it. With these habits, your cron jobs will run reliably every time.</p>
