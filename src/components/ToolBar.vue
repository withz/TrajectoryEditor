<template>
  <div>
    <div class="custom-tree-container">
      <div class="block">
        <el-button-group>
          <el-button type="primary" @click="insertLast">前插</el-button>
          <el-button type="primary" @click="fresh">刷新</el-button>
          <el-button type="primary" @click="deleteNode">删除</el-button>
          <el-button type="primary" @click="insertNext">后插</el-button>
        </el-button-group>
        <el-tree
          :data="tree"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false">
          <span class="custom-tree-node" slot-scope="{ node }">
            <span @click="selectLine(node.label)">{{ node.label }}</span>
          </span>
        </el-tree>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToolBar',
  data () {
    return {
      tree: [],
      selectItem: ''
    }
  },

  methods: {
    fresh () {
      this.tree = []
      let points = this.$store.state.trajectory.points
      let node = {
        id: 'root',
        label: 'root',
        expanded: true,
        children: []
      }
      this.tree.push(node)
      for (let point in points) {
        console.log()
        node = {
          id: points[point].name,
          label: points[point].name
        }
        this.tree[0].children.push(node)
      }
    },
    deleteNode () {
      if (this.selectItem && this.selectItem !== '') {
        let id = this.selectItem
        this.$store.commit('deletePoint', { id })
        this.selectItem = ''
      }
    },
    insertLast () {
      if (this.selectItem && this.selectItem !== '') {
        let id = this.selectItem
        this.$store.commit('insertPointLast', { id })
      }
    },
    insertNext () {
      if (this.selectItem && this.selectItem !== '') {
        let id = this.selectItem
        this.$store.commit('insertPointNext', { id })
      }
    },
    selectLine (id) {
      this.$store.commit('selectPoint', id)
      this.selectItem = id
    }
  },
  computed: {
    updateTree () {
      return this.$store.state.trajectory
    }
  },
  watch: {
    updateTree (val) {
      this.fresh()
    }
  },
  mounted () {
    this.fresh()
  }
}
</script>

<style scoped>

</style>
