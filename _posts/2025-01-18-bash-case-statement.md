---
layout: post
title: "Bashのcase文をマスターする：初心者向けガイド"
date: 2025-01-18
lang: "ja"
meta: '<meta name="description" content="Bashスクリプトでのcase文の使い方を初心者向けに解説。構文から実用例まで、条件分岐を簡単にする方法を紹介します。"><meta name="keywords" content="Bash case文, Bashスクリプト, 条件分岐, Linux, Bash初心者ガイド"><meta name="author" content="Beta Shorts"><meta name="robots" content="index, follow"><link rel="canonical" href="https://betashorts.com/bash-case-statement">'
og: >
  title: "Bashのcase文をマスターする：初心者向けガイド"
  description: "Bashスクリプトのcase文を初心者向けに解説。複数の条件を簡潔に処理する便利な方法を学びましょう。"
  url: "https://betashorts.com/bash-case-statement"
  type: "article"
  image: "https://betashorts.com/logo.jpg"
tags: [Bash, Linux, スクリプト, 条件分岐, 初心者向け, 自動化]
---

<p>Bashスクリプトを作成する際、複数の条件を簡潔に処理するには<strong>case文</strong>が便利です。if-else文を使うよりも読みやすく、条件分岐が多い場合には特に有効です。本記事では、Bashのcase文の基本構文から応用例までを初心者向けに解説します。</p>

---

<h2>1. Bashのcase文の基本構文</h2>
<p>case文は、特定の値に基づいて実行する処理を分岐させる際に使用されます。</p>

<h3>構文：</h3>
<pre><code>
case 値 in
    パターン1)
        # パターン1に一致した場合のコマンド
        ;;
    パターン2)
        # パターン2に一致した場合のコマンド
        ;;
    *)
        # どのパターンにも一致しない場合のコマンド
        ;;
esac
</code></pre>

<h3>例：</h3>
<p>以下の例では、入力された値に基づいて異なるメッセージを出力します。</p>
<pre><code>
#!/bin/bash

echo "入力してください: "
read input

case $input in
    "yes")
        echo "はいを選択しました"
        ;;
    "no")
        echo "いいえを選択しました"
        ;;
    *)
        echo "不明な入力です"
        ;;
esac
</code></pre>

<h3>出力例：</h3>
<pre><code>
入力してください: yes
はいを選択しました
</code></pre>

---

<h2>2. 数値や文字列のパターンマッチング</h2>
<p>case文では、数値や文字列、ワイルドカードを使用してパターンを指定できます。</p>

<h3>例：数値のパターン</h3>
<pre><code>
#!/bin/bash

echo "数値を入力してください: "
read num

case $num in
    1)
        echo "数値は1です"
        ;;
    [2-5])
        echo "数値は2から5の間です"
        ;;
    *)
        echo "数値が範囲外です"
        ;;
esac
</code></pre>

<h3>出力例：</h3>
<pre><code>
数値を入力してください: 3
数値は2から5の間です
</code></pre>

---

<h2>3. ワイルドカードと正規表現</h2>
<p>case文では、ワイルドカード（<code>*</code>）や正規表現を使って柔軟な条件分岐が可能です。</p>

<h3>例：ファイル拡張子の判定</h3>
<pre><code>
#!/bin/bash

file="example.txt"

case $file in
    *.txt)
        echo "これはテキストファイルです"
        ;;
    *.jpg | *.png)
        echo "これは画像ファイルです"
        ;;
    *)
        echo "不明なファイル形式です"
        ;;
esac
</code></pre>

<h3>出力例：</h3>
<pre><code>
これはテキストファイルです
</code></pre>

---

<h2>4. 複数条件の処理</h2>
<p>case文を使うと、複数の条件を効率的に処理できます。</p>

<h3>例：メニュー選択</h3>
<pre><code>
#!/bin/bash

echo "メニューを選択してください: "
echo "1. スタート"
echo "2. ストップ"
echo "3. リセット"
read choice

case $choice in
    1)
        echo "スタートが選択されました"
        ;;
    2)
        echo "ストップが選択されました"
        ;;
    3)
        echo "リセットが選択されました"
        ;;
    *)
        echo "無効な選択です"
        ;;
esac
</code></pre>

---

<h2>5. 実用的な応用例</h2>
<p>以下は、case文を使った実践的な例です：</p>

<h3>例1：シンプルなスクリプト実行フロー</h3>
<pre><code>
#!/bin/bash

action=$1

case $action in
    start)
        echo "サービスを開始します"
        ;;
    stop)
        echo "サービスを停止します"
        ;;
    restart)
        echo "サービスを再起動します"
        ;;
    *)
        echo "使用方法: $0 {start|stop|restart}"
        ;;
esac
</code></pre>

<h3>例2：ネットワークステータスの確認</h3>
<pre><code>
#!/bin/bash

echo "ネットワークステータスを確認中..."
status=$(ping -c 1 google.com > /dev/null 2>&1 && echo "online" || echo "offline")

case $status in
    online)
        echo "インターネット接続は正常です"
        ;;
    offline)
        echo "インターネット接続がありません"
        ;;
esac
</code></pre>

---

<h2>まとめ</h2>
<p>Bashのcase文を活用することで、複数の条件を簡潔かつ効率的に処理できます。初心者の方でも、基本構文を理解するだけで柔軟なスクリプトを作成できます。</p>
<p>さらにBashスクリプトを学びたい方は、私たちの<a href="https://betashorts.gumroad.com/l/vvqikq" target="_blank"><strong>Bashスクリプトチートシート</strong></a>もご覧ください！初心者から上級者まで役立つ情報が満載です。</p>
