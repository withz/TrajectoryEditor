<template>
    <div>
      <el-row>
        <el-col :span="24">
          <el-row :gutter="12">
            <el-col :span="3" v-for="item in examplesLabel" :key="item.id">
              <el-card shadow="hover" @click="applyExample(item.id)">
                <div class="demo-image">
                  <div class="block">
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="item.url"
                      fit="scale-down"></el-image>
                  </div>
                  <div>
                    {{ item.label }}
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
</template>

<script>
export default {
  name: 'BottomBar',
  data () {
    return {
      examplesLabel: this.$store.state.shapes,
      examples: [
        {
          id: 1,
          line: { }
        }
      ]
    }
  },
  methods: {
    applyExample (id) {

    }
  }
}
</script>

<style scoped>

</style>
