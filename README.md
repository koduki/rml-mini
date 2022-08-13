# README

## Overview

以下の解説動画で利用している自作プログラミング言語のサンプルコードです。modules以下に各サンプル実装が含まれています。
解説に関しては、動画の方を御覧ください。

https://www.youtube.com/playlist?list=PLSvCGXiKL6C6_2uHBAuj6heSqt-R9in51

## Demo Application

デモアプリケーションはPure JavaScriptで作成されています。以下のファイルとフォルダをGitHub PagesやAmazon S3など任意のWebサーバにデプロイさせれば動作させることが出来ます。ビルド等は不要です。

- index.html
- modules

また、以下のようにWSLやMacを利用している場合はPythonのワンライナーでWebサーバを起動してデモアプリを動かす事も出来ます。

```bash
$ python3 -m http.server 8000
$ open http://localhost:8000
```

## Unit Test

開発及び動作自体には依存がありませんが、UnitTestの実行のみ[Deno](https://deno.land/)を利用しています。必要に応じて導入してください。

```bash
$ deno test
```
