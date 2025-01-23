---
layout: post
title: "Bashのwhileループ：使い方と実例を初心者向けに解説"
date: 2025-01-20
lang: "ja"
meta: '<meta name="description" content="Bashのwhileループの基本と使い方を初心者向けに解説。条件付きループ処理を活用して、効率的なスクリプトを作成する方法を学びましょう。"><meta name="keywords" content="Bash, whileループ, Bashスクリプト, 条件付きループ, 初心者向け, Linux, 自動化, スクリプト例"><meta name="author" content="Beta Shorts"><meta name="robots" content="index, follow"><link rel="canonical" href="https://betashorts.com/bash-while-loop">'
og: >
  title: "Bashのwhileループ：使い方と実例を初心者向けに解説"
  description: "Bashのwhileループを使った条件付きループ処理を初心者向けに解説。実例を通して効率的なスクリプト作成の方法を学びましょう。"
  url: "https://betashorts.com/bash-while-loop"
  type: "article"
  image: "https://betashorts.com/logo.jpg"
tags: [Bash, whileループ, Bashスクリプト, 条件付きループ, 自動化, Linux, 初心者向け]
---

<p>Bashの<strong>whileループ</strong>は、指定された条件が真（true）である間、繰り返し処理を実行するための基本的な構文です。タスクの自動化や複雑なループ処理に非常に役立ちます。本記事では、Bashのwhileループの基本構文から実例までを初心者向けに解説します。</p>

---

<h2>1. whileループとは？</h2>
<p><strong>whileループ</strong>は、条件が満たされる限り、指定されたコマンドを繰り返し実行します。</p>

<h3>基本構文：</h3>
<pre><code>
while [ 条件 ]
do
    # 実行するコマンド
done
</code></pre>

<p>条件が偽（false）になると、ループは終了します。</p>

---

<h2>2. 基本的な使用例</h2>
<p>以下は、whileループを使った基本的な例です。</p>

<h3>例1：1から5までの数値を表示</h3>
<pre><code>
#!/bin/bash

i=1
while [ $i -le 5 ]
do
    echo "カウント: $i"
    ((i++))
done
</code></pre>

<p><strong>結果：</strong></p>
<pre><code>
カウント: 1
カウント: 2
カウント: 3
カウント: 4
カウント: 5
</code></pre>

<p>この例では、<code>i</code>が5以下である限りループが繰り返されます。</p>

---

<h2>3. 条件付き処理</h2>
<p>whileループは、条件によって動作を制御できます。</p>

<h3>例2：ファイルの存在をチェック</h3>
<pre><code>
#!/bin/bash

file="example.txt"
while [ ! -f "$file" ]
do
    echo "$file が存在しません。チェック中..."
    sleep 2
done

echo "$file が見つかりました！"
</code></pre>

<p><strong>結果：</strong> ファイルが見つかるまで2秒ごとにメッセージが表示されます。</p>

---

<h2>4. 無限ループと制御方法</h2>
<p>無限ループを作成することもできますが、制御しないとスクリプトが終了しません。</p>

<h3>例3：無限ループ</h3>
<pre><code>
#!/bin/bash

while true
do
    echo "このメッセージは繰り返されます"
    sleep 1
done
</code></pre>

<p>無限ループを終了するには、<kbd>Ctrl</kbd> + <kbd>C</kbd>を押して停止します。</p>

<h3>breakとcontinueを使用した制御：</h3>
<pre><code>
#!/bin/bash

i=1
while [ $i -le 10 ]
do
    if [ $i -eq 5 ]; then
        echo "中断します"
        break
    fi
    echo "カウント: $i"
    ((i++))
done
</code></pre>

---

<h2>5. 実用的な応用例</h2>
<p>以下は、whileループの実用的な使用例です。</p>

<h3>例4：ログファイルを監視</h3>
<pre><code>
#!/bin/bash

logfile="/var/log/syslog"
while true
do
    tail -n 10 $logfile
    sleep 5
done
</code></pre>

<p>このスクリプトは、指定されたログファイルの最後の10行を5秒ごとに表示します。</p>

<h3>例5：入力を検証</h3>
<pre><code>
#!/bin/bash

while true
do
    read -p "数字を入力してください (終了: 0): " num
    if [ $num -eq 0 ]; then
        echo "終了します"
        break
    elif [ $num -lt 0 ]; then
        echo "正の数を入力してください"
    else
        echo "入力された数字: $num"
    fi
done
</code></pre>

---

<h2>6. Bashスクリプトを学ぶ利点</h2>
<p>whileループを含むBashスクリプトを学ぶことで、タスクの自動化や効率的な処理が可能になります。</p>
<ul>
  <li>システム管理を簡単にする</li>
  <li>繰り返しタスクを自動化</li>
  <li>複雑な条件処理を簡潔に記述</li>
</ul>

---

<h2>7. さらに学びたい方へ</h2>
<p>Bashのwhileループやスクリプトの詳細をもっと学びたい方は、私たちの<a href="https://betashorts.gumroad.com/l/vvqikq" target="_blank"><strong>Bashスクリプトチートシート</strong></a>をご覧ください！初心者にも分かりやすいコード例やヒントが満載で、効率的にスキルを向上させることができます。</p>

---

<h2>まとめ</h2>
<p>Bashのwhileループは、条件付きでタスクを繰り返すための強力なツールです。本記事を参考に、基本から応用例までを学び、Bashスクリプトを使った自動化や効率化に挑戦してみましょう！</p>
<p>ぜひ<a href="https://betashorts.gumroad.com/l/vvqikq" target="_blank"><strong>Bashスクリプトチートシート</strong></a>もチェックして、さらにスクリプト作成のスキルを磨いてください！</p>
