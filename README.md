# Phaser Vue Temaplte

## コミットルール

[PPTよりご確認ください](https://azgjp.sharepoint.com/:p:/r/sites/pivot_pj-files/_layouts/15/Doc.aspx?sourcedoc=%7B3C80250E-4550-44FE-AF86-DB39E6DCF34E%7D&file=KALPA_git_rule.pptx&action=edit&mobileredirect=true)

## Getting Started

### ローカルで開発

#### 推奨環境

- node:v21以上

**JavaScript のパッケージ管理ツール**
bun | pnpm v8.15.4（推奨）

**install node_modules**

```bash
pnpm i
```

**run the development server:**

```bash
pnpm dev
```

### ローカルでビルド

**run the build bash:**

```bash
pnpm build
```

**preview in local server:**

```bash
pnpm preview
```

**quickly start to preview the production file in local server**

```bash
pnpm start
```

**upload to FTP server:**

ルートディレクトリでの.ftpconfig.sampleを参考し、.ftpconfigを作成した上、下記のコマンドを実行

```bash
pnpm upload
```

### ゲーム画面追加

`src/game/scenes/`にデフォルトのファイルを削除し、必要なシーンを追加してください。

**重要**：クラス名とキー名とファイル名を同じ単語にする必要があります。

下記のパスに上記の同じ単語でフォルダを作成し、必要な資源を配置します。その後シーンの中に、ファイル名をキーとして直接使います。

**重要**：違いシーンでも同じファイル名にしないてください。

また、使用しないファイルもローディング対象に入るため、シーン名としてのフォルダに入れないようにしてください。

- `src/assets/fonts/[sceneKey]` - ゲームで使用されるフォント資源。
- `src/assets/images/[sceneKey]` - ゲームで使用される画像資源。
- `src/assets/sounds/[sceneKey]` - ゲームで使用される音声資源。
- `src/assets/videos/[sceneKey]` - ゲームで使用される動画資源。
- **重要**：全シーンに使われるものは `src/assets/[fonts|images|sounds|videos]/Preloader`に配置してください。

例：

```js
// src/game/scenes/EXAMPLE.js
import { DefaultScene } from '@/game/libs/DefaultScene'

export default class EXAMPLE extends DefaultScene {
  constructor() {
    super('EXAMPLE')
  }

  start() {
    // 事前に次のシーンの資源をローディングすることが可能。（複数可能）
    DefaultScene.preload(this, 'NEXT_EXAMPLE')
    // DefaultScene.preload(this, "NEXT_EXAMPLE", "NEXT_EXAMPLE_2", "NEXT_EXAMPLE_3");

    const btn = addImageWithOrigin(this, 544, 544, '[filename]')

    // 仮にボタンが存在する場合
    btn.once('pointerdown', () => {
      DefaultScene.start(this, 'NEXT_EXAMPLE')
    })
  }
}
```

### Phaser DOMコンテナー内でvueコンポートを使用

phaserの設計上、ライフサイクルのcreate段階で作成しないといけないので、使い方は下記よりご参考ください。

```js
// src/game/scenes/EXAMPLE.js
import { DefaultScene } from '@/game/libs/DefaultScene'
import VueComponent from '@/component/VueComponent'
import { createFallAnimation } from '../animations/createFallAnimation'

export default class EXAMPLE extends DefaultScene {
  constructor() {
    super('EXAMPLE')
  }

  // phaserの設計上、ライフサイクルのcreate段階で作成しないといけない
  create() {
    super.create()
    // 512: 座標X 584: 座標Y
    // this.addVue(512, 584, VueComponent)

    // 操作したい場合
    this.vue = this.addVue(512, 584, VueComponent)
  }

  start() {
    createFallAnimation(this, this.vue)
  }
}
```


### 本プロジェクトであらかじめ用意した汎用的なメソッド

- `src/utils/getCookie`：クッキー取得
- `src/utils/setCookie`：クッキー設置
- `src/utils/toLocalISOString`：日本時間取得
- `src/games/utils/playNa`：音声再生または連続再生
- `src/games/utils/addImageWithOrigin`：原点を左上で画像追加
- `src/games/utils/addSpriteWithOrigin`：原点を左上でスプライト追加
- `src/games/animations/createAngleAnimation`：アングルアニメーション
- `src/games/animations/createFallAnimation`：墜落アニメーション
- `src/games/animations/createFallAnimation2`：墜落パターン２アニメーション
- `src/games/animations/createFloatAnimation`：浮かぶアニメーション
- `src/games/animations/createFrameAnimation`：フレームアニメーション
- `src/games/animations/createKiraAnimation`：キラキラアニメーション
- `src/games/animations/createPenAnimation`：ペンを動かすアニメーション
- `src/games/animations/createRotateAnimation`：回転アニメーション
- `src/games/animations/createScaleAnimation`：拡大縮小アニメーション
- `src/games/animations/createShowAnimation`：出現アニメーション
- `src/games/animations/createXYAnimation`：移動アニメーション

以上、ゲームの開発が可能になります。

## 使用技術一覧

[![Vite](https://img.shields.io/badge/Vite-2C3E50?style=for-the-badge&logo=vite&logoColor=4FC08D)](https://vitejs.dev/)

ビルトツールはViteを使用しています。ビルト設定はRollupを参考してください。

[![vue](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)](https://vuejs.org/)

SPAフレームワークはVUEを使用しています。

[![Pinia](https://img.shields.io/badge/Pinia-fce367?style=for-the-badge)](https://pinia.vuejs.org/)

状態管理はPiniaを使用しています。

[![PHASER](https://img.shields.io/badge/Phaser-99c3ea?style=for-the-badge)](https://phaser.io/)

ゲームエンジンはphaserを使用しています。

[![SASS](https://img.shields.io/badge/SASS-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)

CSSを拡張したメタ言語はSASSを使用しています。

[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)

コード検証ツールはESLintを使用しています。

[![prettier](https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)](https://prettier.io/)

コード整形ツールprettierを使用しています。

## テンプレートプロジェクト構造

開始するためのデフォルトのプロジェクト構造は以下の通りです：

- `index.html` - ゲームを含む基本的な HTML ページ。
- `src` - Vue のソースコードが含まれています。
- `src/main.js` - メイン **Vue** エントリーポイント。これは Vue アプリケーションを起動します。
- `src/App.vue` - メインの Vue コンポーネント。
- `src/stores/useAppStore` - メインの Vue アプリのグロバールデータの保存する場所。
- `src/components/` - Vue アプリの子コンポーネントの配置場所。
- `src/libs/` - 本PJにおいて、Vue アプリケーションに関わる共通メソッドが含まれています。
- `src/utils/` - Vue アプリケーションに関わる共通メソッドが含まれています。
- `src/game` - ゲームのソースコードが含まれています。
- `src/game/main.js` - メイン **game** エントリーポイント。これにはゲームの設定が含まれ、ゲームが開始されます。
- `src/game/PhaserGame.vue` - Phaser ゲームを初期化し、Vue と Phaser の間の橋渡しとして機能する Vue コンポーネント。
- `src/game/libs/EventBus.js` - Vue と Phaser の間で通信するためのシンプルなイベントバス。
- `src/game/animations` - ゲームの簡易的なアニメーションが含まれています。
- `src/game/libs` - 本PJにおいて、ゲームに関わる共通メソッドが含まれています。
- `src/game/utils` - ゲームに関わる共通メソッドが含まれています。
- `src/game/scenes/` - このフォルダに Phaser シーンがあります。
- `src/assets` - ゲームで使用される静的アセットが含まれています。
- `src/assets/fonts/[sceneKey]` - ゲームで使用されるフォント資源。
- `src/assets/images/[sceneKey]` - ゲームで使用される画像資源。
- `src/assets/sounds/[sceneKey]` - ゲームで使用される音声資源。
- `src/assets/videos/[sceneKey]` - ゲームで使用される動画資源。
- `public/` - 静的資源

### Vue と Phaser の間の通信

PhaserGame.vue コンポーネントは Vue と Phaser の間のブリッジです。Phaser ゲームを初期化し、二つのコンポーネントの間でイベントをやり取りします。

Vue と Phaser の間で通信するには、EventBus.js を使用できます。これは、Vue と Phaser の両方からイベントを発行およびリッスンすることができるシンプルなイベントバスです。

```js
// Vue で
import { EventBus } from './EventBus' // イベントを発行する
EventBus.emit('event-name', data) // Phaser で
// イベントをリッスンする
EventBus.on('event-name', (data) => {
  // データを使用する
})
```

さらに、PhaserGame コンポーネントは最新の Phaser シーンと共に Phaser ゲームインスタンスを公開します。Vue からこれらを取得するには `(defineExpose({ currentScene, game })) `を使用します。

一度公開されると、これらは通常のステート参照と同様にアクセスできます。

### Phaser シーンの処理

`src/game/scenes/`配下の全てのシーンを起動時に同時実行するようにしています。
既存のPhaserの `Scene`クラスを使って `DefaultScene`を作って使用しています。

`DefaultScene`は `preload`と `create`をデフォルトで設定しています。`preload`は自動的に `src/assets/[fonts|images|sounds|videos]/[sceneKey]`配下のものを読み込みます。
`create`はローディング完了したかの判断のロジックを行います。`EventBus`を通して、Vue アプリケーションにローディング画面起動するかの情報を渡しています。
シーンを起動時のメソッドはPhaserの既存のcreateにコードを記載するのではなく、startに記載するようにします。

**重要** : その上、次のシーンを起動する際には、まず事前に `DefaultScene.preload`シーンの起動準備をし、トリガーに `DefaultScene.start`を指定します。
事前に `DefaultScene.preload`シーンの起動準備をしないとローディングが発生します。

次のようにします:

```js
// src/game/scenes
import { DefaultScene } from '@/game/libs/DefaultScene'

export default class EXAMPLE extends DefaultScene {
  constructor() {
    super('EXAMPLE')
  }

  start() {
    // まず次のシーンをローディングします。（複数可能）
    DefaultScene.preload(this, 'NEXT_EXAMPLE')
    // DefaultScene.preload(this, "NEXT_EXAMPLE", "NEXT_EXAMPLE_2", "NEXT_EXAMPLE_3");

    // 仮にボタンが存在する場合
    btn.once('pointerdown', () => {
      DefaultScene.start(this, 'NEXT_EXAMPLE')
    })
  }
}
```

### Vue コンポーネントの例

Vue コンポーネント内で Phaser のデータにアクセスする方法の例です:

```
// 親コンポーネント内
<script setup>
import {(ref, toRaw)} from 'vue';
const phaserRef = ref();
const game = toRaw(phaserRef.value.game);
const scene = toRaw(phaserRef.value.scene);
const onCurrentActiveScene = (scene) =>{' '}
{
  // これが呼び出されます
}
</script>
```

上記のコードでは、ref() を呼び出すことで、現在の Phaser ゲームインスタンスと現在のシーンへの参照を取得できます。

この状態参照から、ゲームインスタンスは toRaw(phaserRef.value.game) を介して利用可能であり、最近アクティブだったシーンは toRaw(phaserRef.value.scene) を介して利用可能です。

### ローディング コンポーネントのカスタマイズ

`src/components/icons/LoaderIcon.vue`にデフォルトのローディングアイコンを配置しています。
必要に応じてSVGやCSSを変更することが可能です。

### デバッグ

開発環境において、画面上部にシーンの切り替え機能が搭載されています。クリックすると直接にシーンにアクセスできます。
画面下部にvueのデバッグ機能が搭載されています。それを使ってVUEやPINIAのデバッグが可能です。

### 本番環境へのデプロイ

本プロジェクトはSSGを使用しています。
`pnpm build` コマンドを実行すると、コードは単一のバンドルにビルドされ、dist フォルダに保存されます。プロジェクトがインポートしたその他のアセットや、public/assetsやsrc/assetsフォルダに保存されたアセットも同様です。

`pnpm build && pnpm preview`または `pnpm start`でビルド後のプロジェクトを確認できます。

ゲームをデプロイするには、dist フォルダのすべての内容を、公開向けの Web サーバーにアップロードする必要があります。
または、.ftpconfigを設置した上、`pnpm upload`でアップロード機能も搭載しています。

### テンプレートのカスタマイズ

Vite
CSS やフォントのローディングなど、ビルドをカスタマイズしたい場合は、vite/config.\*.mjs ファイルを変更してクロスプロジェクトの変更を行うか、package.json 内の特定の pnpm タスクで新しい設定ファイルを変更または作成し、それを対象とします。詳細については、Vite ドキュメント を参照してください。

### Phaser について

**ビジット:** ザ [Phaser 公式サイト](https://phaser.io)
**楽しもう:** 素敵なゲーム集 [#madewithphaser](https://twitter.com/search?q=%23madewithphaser&src=typed_query&f=live)
**ディスカバリー:** [API Docs](https://newdocs.phaser.io), [Support Forum](https://phaser.discourse.group/) と [StackOverflow](https://stackoverflow.com/questions/tagged/phaser-framework)
**コード:** 2000+ [サンプル](https://labs.phaser.io)
