---
layout: post
title: "Bash配列の使い方：初心者向けガイド"
date: 2025-01-19
lang: "ja"
meta: '<meta name="description" content="Bashスクリプトでの配列の使い方を初心者向けに解説。基本構文、要素の操作、ループ処理などを実用例を交えて紹介します。"><meta name="keywords" content="Bash 配列, Bashスクリプト, 配列の使い方, Linux, Bash初心者ガイド"><meta name="author" content="Beta Shorts"><meta name="robots" content="index, follow"><link rel="canonical" href="https://betashorts.com/bash-arrays">'
og: >
  title: "Bash配列の使い方：初心者向けガイド"
  description: "Bashスクリプトで配列を使う方法を解説。基本構文からループ処理、実用例まで、配列操作のすべてを学びましょう。"
  url: "https://betashorts.com/bash-arrays"
  type: "article"
  image: "https://betashorts.com/logo.jpg"
tags: [Bash, Linux, 配列, スクリプト, 初心者向け, 自動化, 配列操作]
---

<p>Bashスクリプトを効率的に書くためには<strong>配列</strong>の使用が不可欠です。配列を使うことで、複数の値を1つの変数に格納し、効率的にデータを操作することができます。本記事では、Bash配列の基本構文から応用的な使い方までを初心者向けに解説します。</p>

---

<h2>1. Bash配列の基本構文</h2>
<p>Bashでは、配列を使用して複数の値を管理できます。配列は1つの変数に複数の値を格納し、それぞれの値をインデックスでアクセスします。</p>

<h3>配列の宣言：</h3>
<pre><code>
# 配列の宣言と初期化
array_name=(値1 値2 値3)
</code></pre>

<h3>例：</h3>
<p>以下の例では、果物の名前を配列に格納しています。</p>
<pre><code>
#!/bin/bash

fruits=("apple" "banana" "cherry")
echo ${fruits[0]}  # 配列の最初の要素を表示
echo ${fruits[1]}  # 配列の2番目の要素を表示
</code></pre>

<h3>出力結果：</h3>
<pre><code>
apple
banana
</code></pre>

---

<h2>2. 配列要素の操作</h2>
<p>Bash配列では、要素の追加、削除、変更が可能です。</p>

<h3>要素の追加：</h3>
<pre><code>
fruits+=("orange")  # 配列の末尾に追加
</code></pre>

<h3>要素の変更：</h3>
<pre><code>
fruits[1]="blueberry"  # 2番目の要素を変更
</code></pre>

<h3>要素の削除：</h3>
<pre><code>
unset fruits[2]  # 3番目の要素を削除
</code></pre>

<h3>配列の全要素を表示：</h3>
<pre><code>
echo ${fruits[@]}  # 全ての要素を表示
</code></pre>

---

<h2>3. 配列の長さを取得</h2>
<p>配列の長さ（要素数）を取得するには、以下の構文を使用します。</p>

<h3>例：</h3>
<pre><code>
#!/bin/bash

fruits=("apple" "banana" "cherry")
length=${#fruits[@]}
echo "配列の要素数: $length"
</code></pre>

<h3>出力結果：</h3>
<pre><code>
配列の要素数: 3
</code></pre>

---

<h2>4. 配列を使ったループ処理</h2>
<p>配列内の要素をループで処理するのは非常に便利です。</p>

<h3>例：配列内の全要素をループで表示</h3>
<pre><code>
#!/bin/bash

fruits=("apple" "banana" "cherry")
for fruit in "${fruits[@]}"; do
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

<h2>5. 配列操作の応用例</h2>
<p>以下は、配列を使った実践的な例です。</p>

<h3>例1：ファイル名の管理</h3>
<pre><code>
#!/bin/bash

files=("file1.txt" "file2.txt" "file3.txt")
for file in "${files[@]}"; do
    if [ -e "$file" ]; then
        echo "$file は存在します"
    else
        echo "$file は存在しません"
    fi
done
</code></pre>

<h3>例2：数値配列を使った計算</h3>
<pre><code>
#!/bin/bash

numbers=(10 20 30)
sum=0
for num in "${numbers[@]}"; do
    sum=$((sum + num))
done
echo "合計: $sum"
</code></pre>

<h3>出力結果：</h3>
<pre><code>
合計: 60
</code></pre>

---

<h2>まとめ</h2>
<p>Bash配列を使うことで、複数の値を効率的に操作でき、スクリプトの柔軟性が大幅に向上します。基本構文や操作方法を理解し、実用例を参考にしてスクリプトを改善してみましょう。</p>
<p>さらにBashスクリプトを学びたい方は、私たちの<a href="https://betashorts.gumroad.com/l/vvqikq" target="_blank"><strong>Bashスクリプトチートシート</strong></a>もご覧ください！初心者から上級者まで役立つ情報が満載です。</p>
