<template>
  <div class="home">
    <el-container>
      <el-header>
        <div>
          <h1>轨迹编辑器</h1>
        </div>
      </el-header>

      <el-container>
        <el-aside>
          <tool-bar></tool-bar>
        </el-aside>

        <el-main>
          <div>
            <World/>
          </div>
        </el-main>

        <el-aside>
          <div>
            <args-panel></args-panel>
          </div>
        </el-aside>
      </el-container>

      <el-footer>
        <div>
<!--          <bottom-bar></bottom-bar>-->
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import World from '@/components/World.vue'
import ArgsPanel from '@/components/ArgsPanel.vue'
import ToolBar from '@/components/ToolBar.vue'
import BottomBar from '@/components/BottomBar.vue'

export default {
  name: 'home',
  components: {
    World,
    ArgsPanel,
    ToolBar,
    BottomBar
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
