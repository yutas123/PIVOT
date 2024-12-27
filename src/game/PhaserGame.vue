<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { useAppStore } from '@/stores/useAppStore'
import SceneDebug from '@/components/SceneDebug.vue'
import { Main, DefaultScene, Preloader, EventBus } from 'phaser-ez'
import Phaser from 'phaser-ez/Phaser'

const appStore = useAppStore()
const isDev = false

const gameContainerId = 'game-container'
const game = ref()
const selectedScene = ref(null)
const scenesStatus = ref(null)
const scenesKeys = computed(() => {
  if (!scenesStatus.value) return []
  return Array.from(scenesStatus.value.keys())
})

const startGame = async () => {
  // const Phaser = await import('phaser').then((module) => module.default)
  // const { DefaultScene, Preloader, Main, EventBus } = await import('phaser-ez')

  // Phaser configuration
  // https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
  const config = {
    parent: gameContainerId,
    type: Phaser.CANVAS,
    width: 1024,
    height: 768,
    scale: {
      // mode: Phaser.Scale.FIT, // フィットモードを使用
      // autoCenter: Phaser.Scale.CENTER_BOTH, // 親要素の中央に配置
    },
    autoFocus: true,
  }
  // シーンの読み込み
  const sceneModules = import.meta.glob(['./scenes/*.js'], {
      import: 'default'
  })
  const scenes = {}
  for (const [path, importer] of Object.entries(sceneModules)) {
    scenes[path] = await importer()
  }

  // サウンド、画像、ビデオの読み込み
  DefaultScene.soundsContext = import.meta.glob('@/assets/sounds/**/*', {
    eager: true
  })
  DefaultScene.imagesContext = import.meta.glob('@/assets/images/**/*', {
    eager: true
  })
  DefaultScene.videosContext = import.meta.glob('@/assets/videos/**/*', {
    eager: true
  })

  //コモン資源の読み込み
  Preloader.imagesCommonContext = import.meta.glob('@/assets/common/images/Preloader/*', {
    eager: true
  })
  Preloader.soundsCommonContext = import.meta.glob('@/assets/common/sounds/Preloader/*', {
    eager: true
  })
  Preloader.videosCommonContext = import.meta.glob('@/assets/common/videos/Preloader/*', {
    eager: true
  })

  // Preloaderの設定
  // デフォルトの次のシーンキーは　'Main'
  Preloader.nextSceneKey = 'MainMenu'
  // コモン資源のファイル名のキーワード
  Preloader.imagesCommonFilenames = ['btn_ok', 'btn_quit']
  Preloader.soundsCommonFilenames = ['SE_03']

  const phaser = Main({
    config: config,
    scenes: scenes,
  })
  game.value = phaser.game
  scenesStatus.value = phaser.scenesStatus

  if(scenesStatus.value){
    Array.from(scenesStatus.value.keys()).map(sceneKey => appStore.addScene(sceneKey))
  }

  EventBus.on('scene-loading', (scene) => {
    const { sceneKey, isLoading } = scene
    appStore.setSceneLoading(sceneKey, isLoading)
  })

  EventBus.on('scene-start', (scene) => {
    selectedScene.value = scene.sceneKey
  })  
}

onMounted(() => {
  startGame()
})

onUnmounted(() => {
  if (!game.value) return
  game.value.destroy(true)
  game.value = null
})

defineExpose({ game })
</script>

<template>
  <div :id="gameContainerId">
    <SceneDebug
      :scene-keys="scenesKeys"
      :game="game"
      :selectedScene="selectedScene"
      v-if="game && isDev"
    />
  </div>
</template>
