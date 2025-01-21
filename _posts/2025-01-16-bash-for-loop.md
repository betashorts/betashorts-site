---
layout: post
title: "Bashのforループをマスターする：初心者向けガイド"
date: 2025-01-16
lang: "ja"
meta: '<meta name="description" content="Bashスクリプトのforループを初心者向けに解説。構文から応用例、ファイル操作までをわかりやすく紹介します。"><meta name="keywords" content="Bash forループ, Bashスクリプト, Linux, for文, Bash初心者ガイド"><meta name="author" content="Beta Shorts"><meta name="robots" content="index, follow"><link rel="canonical" href="https://betashorts.com/bash-for-loop">'
og: >
  title: "Bashのforループをマスターする：初心者向けガイド"
  description: "Bashスクリプトのforループを初心者向けに解説。構文や応用例を交えて、効率的なスクリプト作成をサポートします。"
  url: "https://betashorts.com/bash-for-loop"
  type: "article"
  image: "https://betashorts.com/images/bash-for-loop-guide.jpg"
tags: [Bash, Linux, スクリプト, ループ, ファイル操作, 初心者向け]
---

<p>Bashスクリプトを使う際、繰り返し処理を効率的に実行するには<strong>forループ</strong>が欠かせません。例えば、複数のファイルを操作する場合やリスト内のデータを処理する際に、forループを活用することで簡単に自動化できます。本記事では、Bashのforループの基本構文から実践的な使い方までを初心者向けに解説します。</p>

---

<h2>1. Bashのforループの基本構文</h2>
<p>forループは、リスト内の各要素に対して処理を繰り返す際に使用されます。</p>

<h3>基本構文：</h3>
<pre><code>
for item in list; do
    # 各要素に対して実行するコマンド
done
</code></pre>

<h3>例：</h3>
<p>以下の例では、リスト内の値を順番に出力します。</p>
<pre><code>
#!/bin/bash

for fruit in apple banana cherry; do
    echo "果物: $fruit"
done
</code></pre>

<h3>出力結果：</h3>
<pre><code>
果物: apple
果物: banana
果物: cherry
</code></pre>

---

<h2>2. 数値の範囲を使ったループ</h2>
<p>数値の範囲を指定することで、特定の回数だけループを実行することができます。</p>

<h3>構文：</h3>
<pre><code>
for i in {start..end..step}; do
    # 処理
done
</code></pre>

<h3>例：</h3>
<p>1から10までを2ずつ増加させながら出力します。</p>
<pre><code>
#!/bin/bash

for i in {1..10..2}; do
    echo "数値: $i"
done
</code></pre>

<h3>出力結果：</h3>
<pre><code>
数値: 1
数値: 3
数値: 5
数値: 7
数値: 9
</code></pre>

---

<h2>3. ファイル操作での応用</h2>
<p>forループは、複数のファイルを効率的に処理する際に便利です。</p>

<h3>例：ディレクトリ内の全ファイルを出力</h3>
<pre><code>
#!/bin/bash

for file in /path/to/directory/*; do
    echo "ファイル名: $file"
done
</code></pre>

<h3>例：特定の拡張子のファイルを処理</h3>
<pre><code>
#!/bin/bash

for file in *.txt; do
    echo "テキストファイル: $file"
done
</code></pre>

---

<h2>4. ループ内で条件を使用する</h2>
<p>forループ内で条件分岐を使用すると、より柔軟なスクリプトを作成できます。</p>

<h3>例：</h3>
<pre><code>
#!/bin/bash

for i in {1..10}; do
    if (( i % 2 == 0 )); then
        echo "$i は偶数です"
    else
        echo "$i は奇数です"
    fi
done
</code></pre>

---

<h2>5. 実用的な応用例</h2>
<p>以下は、forループを使った実用的な例です：</p>

<h3>例1：ログファイルのバックアップ</h3>
<pre><code>
#!/bin/bash

for file in /var/log/*.log; do
    cp "$file" /backup/$(basename "$file")
done
</code></pre>

<h3>例2：複数ファイルの検索と置換</h3>
<pre><code>
#!/bin/bash

for file in *.txt; do
    sed -i 's/oldtext/newtext/g' "$file"
done
</code></pre>

---

<h2>まとめ</h2>
<p>Bashのforループを習得することで、タスクの自動化や効率化が格段に向上します。基本構文を理解し、実践例を参考にしながら、自分のニーズに合ったスクリプトを作成してみましょう。</p>
<p>さらにBashスクリプトを学びたい方は、私たちの<a href="https://betashorts.gumroad.com/l/vvqikq" target="_blank"><strong>Bashスクリプトチートシート</strong></a>もご覧ください！</p>
