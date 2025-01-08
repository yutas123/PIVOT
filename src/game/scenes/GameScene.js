import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' })
    this.clickCount = 0
  }

  create() {
    // 画面の中央座標を取得
    const centerX = this.cameras.main.centerX
    const centerY = this.cameras.main.centerY

    // クリック回数表示テキスト
    this.countText = this.add.text(centerX, centerY - 100, 'クリック回数: 0', {
      fontSize: '32px',
      fill: '#fff'
    }).setOrigin(0.5)

    // クリックボタン作成
    this.button = this.add.rectangle(centerX, centerY, 200, 100, 0x00ff00)
    this.button.setInteractive()
    
    // ボタンテキスト
    this.buttonText = this.add.text(centerX, centerY, 'クリック！', {
      fontSize: '32px',
      fill: '#000'
    }).setOrigin(0.5)

    // ボタンクリックイベント
    this.button.on('pointerdown', () => {
      this.clickCount++
      this.countText.setText(`クリック回数: ${this.clickCount}`)

      if (this.clickCount >= 10) {
        this.countText.setText('クリア！')
        this.button.setFillStyle(0xff0000)
        this.buttonText.setText('完了')
        this.button.disableInteractive()
      }
    })
  }
}