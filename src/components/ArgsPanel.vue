<template>
    <div>
      <el-row>
        <el-col :span="24">
          <input ref="getFile" type="file" style="display: none" @change="onFilename">
          <el-button-group>
            <el-button type="primary" @click="loadData">载入</el-button>
            <el-button type="primary" @click="saveData">保存</el-button>
            <el-button type="primary" @click="outputData">导出</el-button>
          </el-button-group>
        </el-col>
      </el-row>
      <br>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="ID">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="坐标">
          <el-col :span="8">
            <el-input v-model="ruleForm.pos.x"></el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="ruleForm.pos.y"></el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="ruleForm.pos.z"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="俯仰">
          <el-input v-model="ruleForm.org.pitch"></el-input>
        </el-form-item>
        <el-form-item label="方向">
          <el-input v-model="ruleForm.org.yaw"></el-input>
        </el-form-item>
        <el-form-item label="激光">
          <el-checkbox v-model="ruleForm.laser">启动激光</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
export default {
  name: 'ArgsPanel',
  data () {
    return {
      ruleForm: {
        name: '',
        pos: { x: 0, y: 0, z: 0 },
        org: { pitch: 0, yaw: 0 },
        laser: true
      },
      rules: {
        name: [
          { required: true, message: 'ID不能为空', trigger: 'blur' }
        ],
        laser: [
          { type: 'boolean', required: true, message: '是否在该段启动激光', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      let point = this.ruleForm
      let id = this.$store.state.trajectory.selected
      this.$store.commit('modifyPoint', { id, point })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    onFilename (event) {
      let reader = new FileReader()
      reader.readAsText(event.target.files[0])
      reader.onload = (event) => {
        let fileString = event.target.result
        let traj = JSON.parse(fileString)
        this.$store.commit('onLoad', { traj })
      }
      this.$refs.getFile.value = ''
    },
    saveData () {
      let data = this.$store.state.trajectory
      this.saveFile(data, 'save')
    },
    loadData () {
      this.$refs.getFile.click()
    },
    outputData () {
      let data = this.$store.state.trajectory
      let output = {
        name: 'ArmTrajectoryPath',
        method: 'set',
        data: {
          length: data.points.length,
          velocity: data.velocity,
          trajectoryPoint: []
        }
      }
      for (let i in data.points) {
        output.data.trajectoryPoint.push({
          x: data.points[i].pos.x,
          y: data.points[i].pos.y,
          z: data.points[i].pos.z,
          roll: 0,
          pitch: data.points[i].org.pitch,
          yaw: data.points[i].org.yaw,
          laser: data.points[i].laser
        })
      }
      this.saveFile(output, 'output')
    },
    saveFile (data, finename) {
      data = JSON.stringify(data)
      let blob = new Blob([data], { type: 'text/plain;charset=UTF-8' })
      let URL = window.URL || window.webkitURL
      let bloburl = URL.createObjectURL(blob)
      let anchor = document.createElement('a')
      if ('download' in anchor) {
        anchor.style.visibility = 'hidden'
        anchor.href = bloburl
        anchor.download = finename + Date.parse(new Date())
        document.body.appendChild(anchor)
        let evt = document.createEvent('MouseEvents')
        evt.initEvent('click', true, true)
        anchor.dispatchEvent(evt)
        document.body.removeChild(anchor)
      } else if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, finename + Date.parse(new Date()))
      } else {
        location.href = bloburl
      }
    }
  },
  computed: {
    getSelectPoint () {
      return this.$store.state.trajectory
    }
  },
  watch: {
    getSelectPoint (newval, oldval) {
      let point = newval.points.find(d => d.name === newval.selected)
      if (point) {
        this.ruleForm.name = point.name
        this.ruleForm.pos.x = point.pos.x
        this.ruleForm.pos.y = point.pos.y
        this.ruleForm.pos.z = point.pos.z
        this.ruleForm.org.pitch = point.org.pitch
        this.ruleForm.org.yaw = point.org.yaw
        this.ruleForm.laser = point.laser
      }
    }
  }
}
</script>

<style scoped>

</style>
