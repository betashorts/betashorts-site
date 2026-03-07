---
layout: post
title: "Bashのif elseステートメントガイド：初心者向け解説"
date: 2025-01-16
lang: "ja"  # Set the language for this blog
meta: '<meta name="description" content="Bashスクリプトでのif elseステートメントの基本、構文、実践的な例を初心者向けに詳しく解説します。ファイルチェックや正規表現の活用方法も紹介します。"><meta name="keywords" content="Bash if else, Bashスクリプト, Linuxスクリプト, ファイルチェック, 条件文, Bash初心者ガイド"><meta name="author" content="Beta Shorts"><meta name="robots" content="index, follow"><link rel="canonical" href="https://betashorts.com/bash-if-else-guide">'
og: >
  title: "Bashのif elseステートメントガイド：初心者向け解説"
  description: "Bashのif elseステートメントを初心者向けに解説。基本構文からファイルチェック、正規表現まで、実用的な例を多数紹介します。"
  url: "https://betashorts.com/bash-if-else-guide"
  type: "article"
  image: "https://betashorts.com/logo.jpg"
tags: [Bash, Linux, スクリプト, 条件文, 初心者向け, ファイルチェック, 正規表現]
---

<p>Bashスクリプトは、Linuxユーザーやエンジニアにとって必須のスキルです。その中でも、<strong>if elseステートメント</strong>は条件に基づいて処理を切り替える重要な構文です。本記事では、Bashのif elseステートメントの基本構文から、ファイルチェックや正規表現を活用した応用例まで、初心者向けにわかりやすく解説します。</p>

---

<h2>1. if elseステートメントの基本</h2>
<p>if elseステートメントは、条件が「真」または「偽」の場合に異なる処理を実行します。</p>

<h3>基本構文：</h3>
<pre><code>
if [ 条件 ]; then
    # 条件が真の場合のコマンド
else
    # 条件が偽の場合のコマンド
fi
</code></pre>

<p><strong>注意点：</strong></p>
<ul>
  <li>スペースが重要：<code>[</code>の後と<code>]</code>の前にスペースを入れる必要があります。</li>
  <li>セミコロン（;）：<code>then</code>を同じ行に書く場合は、セミコロンが必要です。</li>
</ul>

<h3>例：</h3>
<pre><code>
#!/bin/bash

num=10
if [ $num -gt 5 ]; then
    echo "数値は5より大きい"
else
    echo "数値は5以下です"
fi
</code></pre>

---

<h2>2. elifを使った複数条件の処理</h2>
<p><code>elif</code>を使用することで、複数の条件を順番に評価できます。</p>

<h3>構文：</h3>
<pre><code>
if [ 条件1 ]; then
    # 条件1が真の場合のコマンド
elif [ 条件2 ]; then
    # 条件2が真の場合のコマンド
else
    # 全ての条件が偽の場合のコマンド
fi
</code></pre>

<h3>例：</h3>
<pre><code>
#!/bin/bash

num=15
if [ $num -lt 10 ]; then
    echo "数値は10未満です"
elif [ $num -eq 15 ]; then
    echo "数値はちょうど15です"
else
    echo "数値は15より大きいです"
fi
</code></pre>

---

<h2>3. 条件演算子の使い方</h2>
<p>Bashでは、数字や文字列、ファイルの状態を評価するための条件演算子が用意されています。</p>

<h3>数値の比較：</h3>
<ul>
  <li><code>-lt</code>：未満</li>
  <li><code>-le</code>：以下</li>
  <li><code>-gt</code>：より大きい</li>
  <li><code>-ge</code>：以上</li>
  <li><code>-eq</code>：等しい</li>
  <li><code>-ne</code>：等しくない</li>
</ul>

<h3>文字列の比較：</h3>
<ul>
  <li><code>=</code>：等しい</li>
  <li><code>!=</code>：等しくない</li>
  <li><code>-z</code>：文字列が空かどうかをチェック</li>
  <li><code>-n</code>：文字列が空でないかをチェック</li>
</ul>

<h3>ファイルチェック：</h3>
<ul>
  <li><code>-e</code>：ファイルが存在する</li>
  <li><code>-f</code>：通常のファイルが存在する</li>
  <li><code>-d</code>：ディレクトリが存在する</li>
  <li><code>-r</code>：ファイルが読み取り可能</li>
  <li><code>-w</code>：ファイルが書き込み可能</li>
  <li><code>-x</code>：ファイルが実行可能</li>
</ul>

<h3>例：</h3>
<pre><code>
file="/etc/passwd"
if [ -r $file ]; then
    echo "ファイルは読み取り可能です"
fi
</code></pre>

---

<h2>4. 高度な条件構文の活用</h2>
<p>Bashでは、<code>[[ ]]</code>や<code>(( ))</code>を使用することで、より柔軟な条件評価が可能です。</p>

<h3>正規表現のマッチング：</h3>
<pre><code>
name="John123"
if [[ "$name" =~ ^John ]]; then
    echo "名前はJohnで始まります"
fi
</code></pre>

<h3>算術演算：</h3>
<pre><code>
a=5
b=10
if (( a < b )); then
    echo "aはbより小さい"
fi
</code></pre>

---

<h2>5. 実践例</h2>
<p>学んだ内容を活用したいくつかの例を紹介します。</p>

<h3>例1：複数条件のチェック</h3>
<pre><code>
#!/bin/bash

num=8
if (( num > 5 )) && [ $num -lt 10 ]; then
    echo "数値は5より大きく、10未満です"
fi
</code></pre>

<h3>例2：ファイルの存在と実行可能性のチェック</h3>
<pre><code>
#!/bin/bash

file="/bin/bash"
if [ -e "$file" ]; then
    echo "ファイルは存在します"
    if [ -x "$file" ]; then
        echo "ファイルは実行可能です"
    fi
else
    echo "ファイルは存在しません"
fi
</code></pre>

---

<h2>まとめ</h2>
<p>Bashのif elseステートメントを習得することで、スクリプトを柔軟で強力なものにできます。基本から応用までを理解して、効率的なスクリプト作成に役立てましょう。</p>
<p>さらにBashスクリプトを学びたい方は、私たちの<a href="https://betashorts.gumroad.com/l/vvqikq" target="_blank"><strong>Bashスクリプトチートシート</strong></a>もご覧ください！</p>
