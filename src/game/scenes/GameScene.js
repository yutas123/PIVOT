import { DefaultScene } from 'phaser-ez'

export default class GameScene extends DefaultScene {
  constructor() {
    super('GameScene')
  }

  start() {
    // プレイヤー
    this.player = this.add.image(512, 700, 'player')
    this.player.setScale(0.5)

    // キー入力の設定
    this.keyLeft = this.input.keyboard.addKey('LEFT')
    this.keyRight = this.input.keyboard.addKey('RIGHT')
    this.keySpace = this.input.keyboard.addKey('SPACE')

    // スコアの初期化
    this.score = 0
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '32px',
      fill: '#fff'
    })
  }

  update() {
    // プレイヤーの移動
    if (this.keyLeft && this.keyLeft.isDown && this.player.x > 50) {
      this.player.x -= 5
    }
    if (this.keyRight && this.keyRight.isDown && this.player.x < 974) {
      this.player.x += 5
    }
  }

  dispose() {
    if (this.player) this.player.destroy()
    if (this.scoreText) this.scoreText.destroy()
  }
}