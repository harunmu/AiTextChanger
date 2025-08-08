**以下の文章は生成AIを利用して作っています**

# AI文章変換ツール

Next.jsを使用して作成された文章変換ツールです。文章を入力すると、AIによって変換された結果を表示できます。

## 機能

- 📝 **文章入力フィールド**: 変換したい文章を入力できます
- 🤖 **AI変換**: Gemini APIを使用して入力された文章を変換します
- 🎨 **テーマ選択**: ポジティブ、ネガティブ、ギャル、メスガキの4つのテーマから選択可能
- 📱 **X投稿機能**: 変換結果をX（旧Twitter）に投稿できます
- 📋 **共有機能**: 変換結果を共有またはクリップボードにコピーできます
- 🎨 **モダンなUI**: レスポンシブデザインで美しいインターフェース
- ⌨️ **キーボードショートカット**: Ctrl+Enterで変換実行

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

プロジェクトのルートディレクトリに `.env.local` ファイルを作成し、以下の内容を追加してください：

```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

Gemini APIキーは [Google AI Studio](https://makersuite.google.com/app/apikey) で取得できます。

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認できます。

## 使用方法

1. 左側の入力フィールドに変換したい文章を入力します
2. テーマを選択します（ポジティブ、ネガティブ、ギャル、メスガキ）
3. 「変換実行」ボタンをクリックします
4. 右側に変換結果が表示されます
5. 「Xでポストする」ボタンでXに投稿、または「共有する」ボタンで共有できます

## キーボードショートカット

- `Ctrl + Enter`: 変換実行

## ファイル構成

```
ai-text-changer/
├── src/
│   └── app/
│       ├── page.js           # メインのページコンポーネント
│       ├── page.module.css   # CSSスタイルシート
│       ├── layout.js         # レイアウトコンポーネント
│       └── globals.css       # グローバルスタイル
├── public/                   # 静的ファイル
├── test.py                   # Pythonテストファイル
├── package.json              # 依存関係
├── next.config.mjs           # Next.js設定
└── README.md                 # このファイル
```

## 技術スタック

- **フレームワーク**: Next.js 14
- **スタイリング**: CSS Modules
- **AI API**: Google Gemini API
- **言語**: JavaScript (React)

## カスタマイズ

### 新しいテーマの追加

`src/app/page.js` の `themes` 配列と `getThemePrompt` 関数を編集することで、新しいテーマを追加できます。

### スタイルのカスタマイズ

`src/app/page.module.css` を編集することで、色やレイアウトをカスタマイズできます。

## ブラウザ対応

- Chrome (推奨)
- Firefox
- Safari
- Edge

## デプロイ

### Vercel（推奨）

1. [Vercel](https://vercel.com) にアカウントを作成
2. GitHubリポジトリを接続
3. 環境変数 `NEXT_PUBLIC_GEMINI_API_KEY` を設定
4. デプロイ

### その他のプラットフォーム

Next.jsアプリケーションは、Netlify、Railway、その他のプラットフォームでもデプロイ可能です。

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 注意事項

- Gemini APIキーは適切に管理し、公開リポジトリにコミットしないでください
- 大量のテキストを処理する場合は、APIの制限にご注意ください
- 本番環境では、APIキーを環境変数として適切に設定してください
