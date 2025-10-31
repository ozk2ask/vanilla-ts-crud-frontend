# 🚀 Vanilla TypeScript CRUD Frontend 開発ガイド

このドキュメントは、TypeScript、ハッシュベースのルーティング、および `http-server` を使用したシングルページアプリケーション (SPA) のフロントエンド開発に必要な情報を提供します。

---

## 📂 1. ディレクトリ構成

プロジェクトのファイルは、責務（役割）に応じて以下の通りに分離されています。

```
vanilla-ts-crud-frontend/
├── dist/                # 💡 TypeScript (src) のコンパイル結果 (JSファイル)
│   ├── main.js
│   ├── api/
│   └── ...
├── src/                 # 📘 TypeScriptのソースコード
│   ├── api/             # バックエンドAPIとの通信 (fetch) を担う
│   │   └── itemApi.ts   # GET/POST/PUT/DELETE 関数を定義
│   ├── pages/           # 各画面の描画とイベント処理ロジック
│   │   ├── List.ts      # 一覧画面 (#/list) の描画ロジック
│   │   └── Edit.ts      # 登録・編集画面 (#/edit / #/edit/id) の描画ロジック
│   ├── router/          # ルーティング処理を担当
│   │   └── Router.ts    # URLハッシュの監視とページ描画関数の呼び出し
│   ├── types/           # 共有する型定義
│   │   └── Item.ts      # Itemインターフェースの定義
│   └── main.ts          # アプリケーションのエントリーポイント（ルーターの初期化）
├── index.html           # アプリケーションの土台 (メインコンテナ #app を含む)
├── package.json         # 依存関係とnpmスクリプト
└── tsconfig.json        # TypeScriptコンパイル設定
```


---

## ⚙️ 2. 開発に必要な環境と起動方法

このアプリケーションは、**3つの独立したプロセス**を同時に実行することで動作します。

### 2.1. 必要なツール

1.  **TypeScriptコンパイラ**: `npm run dev` で実行
2.  **フロントエンド配信サーバー**: `http-server` (グローバルインストール済み)
3.  **バックエンドサーバー**: `vanilla-ts-crud-backend` フォルダで起動

### 2.2. 起動コマンド

3つのターミナルを開き、それぞれ以下のコマンドを実行してください。

| ターミナル | フォルダ | コマンド | 役割 |
| :--- | :--- | :--- | :--- |
| **1** (BE) | `vanilla-ts-crud-backend` | `npm run dev` | **APIサーバー**を起動 (`http://localhost:8080`) |
| **2** (FE 監視) | `vanilla-ts-crud-frontend` | `npm run dev` | **TSファイルの自動コンパイル** (`.ts` → `.js`) |
| **3** (FE サーバー) | `vanilla-ts-crud-frontend` | `http-server . -p 3000` | **HTML/JSファイルを配信** (`http://localhost:3000`) |

### 2.3. アクセス方法

すべてのプロセスが起動した後、ブラウザで以下のURLにアクセスしてください。
http://localhost:3000/


---

## 🗺️ 3. ルーティングとURLのルール

本アプリは、**ハッシュベースのルーティング**を採用しており、URLの `#` 以降を変更することで画面を切り替えます。

| 機能 | ルーターパス定義 | アクセスURL (ハッシュ部分) |
| :--- | :--- | :--- |
| **初期画面 / 一覧** | `''` / `list` | `http://localhost:3000/` または `#/list` |
| **新規登録** | `edit` | `#/edit` |
| **項目編集** | `edit/:id` | `#/edit/123` (例) |
| **詳細表示** | `detail/:id` | `#/detail/123` (例) |

---

## 🔄 4. 処理の実行フロー

ブラウザが `http://localhost:3000/#/list` にアクセスした際の処理の流れは以下の通りです。

1.  **`index.html` 読み込み**: ブラウザが `index.html` と `dist/main.js` を読み込む。
2.  **`main.ts` 実行**: `main.js` が実行され、`Router.init()` が呼び出される。
3.  **ハッシュの取得**: `Router.ts` がURLのハッシュ（`/list`）を読み取る。
4.  **描画関数の呼び出し**: `Router.ts` が `/list` に対応する `renderListPage` 関数を呼び出す。
5.  **DOMのクリア**: `renderListPage` 内で `#app` コンテナがクリアされる。
6.  **API通信**: `renderListPage` が `src/api/itemApi.ts` の `fetchItems()` を呼び出し、`http://localhost:8080/api/items` へ **GETリクエスト**を送信。
7.  **HTMLレンダリング**: 取得したデータ（`Item[]`）に基づき、**テンプレートリテラル**を使用してHTML文字列を生成し、`#app` に挿入して画面が完成する。

---

## ⚠️ 5. トラブルシューティング

| 現象 | 最も可能性の高い原因と解決策 |
| :--- | :--- |
| **`Uncaught ReferenceError: exports is not defined`** | `tsconfig.json` の `"module"` が `"commonjs"` のままになっているか、`index.html` に `type="module"` がない。`"module": "esnext"` に変更し、`<script type="module">` を追加。 |
| **画面が404になる / メッセージが変わらない** | 1. **`http-server` が起動していない**。2. `index.html` に **`<div id="app"></div>`** がない。 |
| **一覧画面でエラーが出る** | **バックエンドサーバー (BE)** が起動していない。`http://localhost:8080` にアクセスしてBEが動いているか確認。 |
