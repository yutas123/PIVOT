import { DefaultScene } from 'phaser-ez'

export default class MainMenu extends DefaultScene {
  constructor() {
    super('MainMenu')
  }

  start() {
    // 次のシーンの準備
    DefaultScene.preload(this, 'GameScene')

    // 背景
    this.bg = this.add.image(512, 384, 'bg')
    this.bg.setDisplaySize(1024, 768)

    // タイトルロゴ
    this.logo = this.add.image(512, 180, 'logo')
    // ロゴのサイズ調整（必要に応じて）
    this.logo.setScale(0.8)

    // メニュー項目を作成
    this.createMenuItems([
      { text: 'START GAME', y: 400 },
      { text: 'HOW TO PLAY', y: 480 },
      { text: 'RANKING', y: 560 }
    ])

    // アニメーション効果
    this.tweens.add({
      targets: this.logo,
      y: 200,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.inOut'
    })
  }

  createMenuItems(items) {
    this.menuItems = items.map(item => {
      const text = this.add.text(512, item.y, item.text, {
        fontFamily: 'Arial Black',
        fontSize: 36,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 6,
        align: 'center'
      })
      .setOrigin(0.5)
      .setInteractive()

      // ホバー効果
      text.on('pointerover', () => {
        text.setScale(1.1)
        text.setColor('#88ff88')
      })

      text.on('pointerout', () => {
        text.setScale(1)
        text.setColor('#ffffff')
      })

      // クリックイベント
      text.on('pointerdown', () => {
        switch(item.text) {
          case 'START GAME':
            DefaultScene.start(this, 'GameScene')
            break
          case 'HOW TO PLAY':
            // チュートリアルシーンへ
            // DefaultScene.start(this, 'TutorialScene')
            break
          case 'RANKING':
            // ランキングシーンへ
            // DefaultScene.start(this, 'RankingScene')
            break
        }
      })

      return text
    })
  }

  dispose() {
    this.bg.destroy()
    this.logo.destroy()
    this.menuItems.forEach(item => item.destroy())
  }
}