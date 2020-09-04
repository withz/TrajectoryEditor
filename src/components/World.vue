<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
import * as THREE from 'three'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      camera: null,
      scene: null,
      renderer: null,
      obj: null,
      subobj: null,
      container: null,
      mouse: {
        key: false,
        btn: null,
        point: null
      },
      lookatPoint: {
        x: 0, y: 0, z: 0
      }
    }
  },
  methods: {
    init: function () {
      this.container = document.getElementById('container')
      let container = this.container
      this.scene = new THREE.Scene()

      this.camera = new THREE.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 30)
      this.camera.position.x = 2
      this.camera.position.y = 2
      this.camera.position.z = 1
      this.camera.up.x = 0
      this.camera.up.y = 0
      this.camera.up.z = 1
      this.camera.lookAt(new THREE.Vector3(this.lookatPoint.x, this.lookatPoint.y, this.lookatPoint.z))

      this.subobj = new THREE.Object3D()
      this.obj = new THREE.Object3D()
      this.obj.add(this.subobj)
      this.obj.add(new THREE.AxisHelper(0.5))
      this.scene.add(this.obj)

      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setSize(container.clientWidth, container.clientHeight)
      container.appendChild(this.renderer.domElement)

      container.addEventListener('mousemove', this.onDocumentMouseMove, false)
      container.addEventListener('mousewheel', this.onDocumentMouseScoll, false)
      container.addEventListener('mouseup', this.onDocumentMouseUp, false)
      container.addEventListener('mousedown', this.onDocumentMouseDown, false)
      container.addEventListener('touchstart', this.onDocumentTouchStart, false)
      container.addEventListener('touchmove', this.onDocumentTouchMove, false)

      window.addEventListener('resize', this.onWindowResize, false)

      this.update(this.$store.state.trajectory.lines)
    },
    animate: function () {
      // requestAnimationFrame(this.animate)
      this.renderer.render(this.scene, this.camera)
    },
    onWindowResize () {
      this.camera.aspect = this.container.clientWidth / this.container.clientHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
      this.renderer.render(this.scene, this.camera)
    },

    onDocumentMouseDown (event) {
      let point = this.getPosition(event)
      this.mouse.key = true
      this.mouse.btn = event.button
      this.mouse.point = point
    },
    onDocumentMouseMove (event) {
      if (this.mouse.key) {
        event.preventDefault()
        let point = this.getPosition(event)
        let x = point.x - this.mouse.point.x
        let y = point.y - this.mouse.point.y
        if (this.mouse.btn === 0) {
          this.obj.rotation.z += x * 0.01
          this.camera.position.z += y * 0.01
          this.camera.lookAt(new THREE.Vector3(this.lookatPoint.x, this.lookatPoint.y, this.lookatPoint.z))
        } else {
          this.lookatPoint.x -= x * 0.01
          this.lookatPoint.y -= y * 0.01
          this.camera.lookAt(new THREE.Vector3(this.lookatPoint.x, this.lookatPoint.y, this.lookatPoint.z))
        }
        this.mouse.point = point
        this.renderer.render(this.scene, this.camera)
      }
    },
    onDocumentMouseScoll (event) {
      event.preventDefault()
      this.camera.position.x += this.camera.position.x * event.wheelDelta * 0.001
      this.camera.position.y += this.camera.position.y * event.wheelDelta * 0.001
      this.camera.position.z += this.camera.position.z * event.wheelDelta * 0.001
      this.camera.lookAt(new THREE.Vector3(this.lookatPoint.x, this.lookatPoint.y, this.lookatPoint.z))
      this.renderer.render(this.scene, this.camera)
    },
    onDocumentMouseUp (event) {
      let point = this.getPosition(event)
      this.mouse.key = false
      this.mouse.point = point
    },

    getPosition (e) {
      let box = this.container.getBoundingClientRect()
      let mouseX = e.clientX - box.left
      let mouseY = e.clientY - box.top
      return { x: mouseX, y: mouseY }
    },
    onDocumentTouchStart (event) {
      if (event.touches.length === 1) {
        event.preventDefault()
        let mouseX = event.touches[0].pageX
        let mouseY = event.touches[0].pageY
      }
    },
    onDocumentTouchMove (event) {
      if (event.touches.length === 1) {
        event.preventDefault()
        let mouseX = event.touches[0].pageX
        let mouseY = event.touches[0].pageY
      }
    },
    update (val) {
      let points = this.$store.state.trajectory.points
      let id = this.$store.state.trajectory.selected

      let geometry = new THREE.Geometry()
      let material = new THREE.LineBasicMaterial({ vertexColors: true })
      let color = new THREE.Color(0xFFFFFF)

      for (let i in points) {
        if (points[i]) {
          let p = points[i].pos
          var p1 = new THREE.Vector3(p.x, p.y, p.z)
          geometry.vertices.push(p1)
          if (id === points[i].name) {
            geometry.colors.push(new THREE.Color(0xFF0000))
          } else {
            geometry.colors.push(color)
          }
        }
      }

      let dir = new THREE.Geometry()
      for (let i in points) {
        if (points[i]) {
          if (id === points[i].name) {
            let point = points[i]
            let p = point.pos
            let len = 0.2
            let yaw = point.org.yaw
            let pitch = point.org.pitch
            let r = {
              x: len * Math.cos(yaw) * Math.sin(pitch),
              y: len * Math.sin(yaw) * Math.sin(pitch),
              z: len * Math.cos(pitch)
            }
            var pa = new THREE.Vector3(p.x, p.y, p.z)
            var pb = new THREE.Vector3(p.x * 1.0 + r.x, p.y * 1.0 + r.y, p.z * 1.0 + r.z)
            dir.vertices.push(pa, pb)
            dir.colors.push(new THREE.Color(0x00FF00), new THREE.Color(0x00FF00))
          }
        }
      }
      let mesh1 = new THREE.Line(geometry, material)
      let mesh2 = new THREE.Line(dir, material)
      this.obj.remove(this.subobj)
      this.subobj = new THREE.Object3D()
      this.subobj.add(mesh1)
      this.subobj.add(mesh2)
      this.obj.add(this.subobj)
      this.renderer.render(this.scene, this.camera)
    }
  },
  mounted () {
    this.init()
    this.animate()
  },
  computed: {
    getSelectLine () {
      return this.$store.state.trajectory.points
    }
  },
  watch: {
    getSelectLine (newval) {
      this.update(newval)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#container{
  height: 600px;
}
</style>
