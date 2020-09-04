import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    trajectory: {
      velocity: 0.5,
      selected: null,
      points: [
        {
          name: 'no1',
          pos: { x: 0.3, y: 0.1, z: 0 },
          org: { pitch: 2.0, yaw: 0 },
          laser: false
        },
        {
          name: 'no2',
          pos: { x: 0.3, y: 0.4, z: 0 },
          org: { pitch: 2.0, yaw: 0 },
          laser: false
        },
        {
          name: 'no3',
          pos: { x: 0.4, y: 0.4, z: 0.1 },
          org: { pitch: 1.6, yaw: 0 },
          laser: false
        },
        {
          name: 'no4',
          pos: { x: 0.4, y: 0.1, z: 0.1 },
          org: { pitch: 1.6, yaw: 0 },
          laser: false
        },
        {
          name: 'no5',
          pos: { x: 0.45, y: 0.1, z: 0.2 },
          org: { pitch: 1.3, yaw: 0 },
          laser: false
        },
        {
          name: 'no6',
          pos: { x: 0.45, y: 0.4, z: 0.2 },
          org: { pitch: 1.3, yaw: 0 },
          laser: false
        },
        {
          name: 'no7',
          pos: { x: 0.4, y: 0.4, z: 0.3 },
          org: { pitch: 0.9, yaw: 0 },
          laser: false
        },
        {
          name: 'no8',
          pos: { x: 0.4, y: 0.1, z: 0.3 },
          org: { pitch: 0.9, yaw: 0 },
          laser: false
        },
        {
          name: 'no9',
          pos: { x: 0.3, y: 0.1, z: 0.4 },
          org: { pitch: 0.6, yaw: 0 },
          laser: false
        },
        {
          name: 'no10',
          pos: { x: 0.3, y: 0.4, z: 0.4 },
          org: { pitch: 0.6, yaw: 0 },
          laser: false
        },
        {
          name: 'no11',
          pos: { x: 0.1, y: 0.6, z: 0.4 },
          org: { pitch: 0.6, yaw: 0 },
          laser: false
        },
        {
          name: 'no12',
          pos: { x: 0.2, y: 0.7, z: 0.3 },
          org: { pitch: 0.9, yaw: 0 },
          laser: false
        },
        {
          name: 'no13',
          pos: { x: 0.4, y: 0.5, z: 0.3 },
          org: { pitch: 0.9, yaw: 0 },
          laser: false
        },
        {
          name: 'no14',
          pos: { x: 0.45, y: 0.6, z: 0.2 },
          org: { pitch: 1.3, yaw: 0 },
          laser: false
        },
        {
          name: 'no15',
          pos: { x: 0.3, y: 0.8, z: 0.2 },
          org: { pitch: 1.5, yaw: 0 },
          laser: false
        }
      ]
    },
    update: function (state) {
      let temp = state.trajectory
      state.trajectory = {}
      state.trajectory = temp
    },
    copyPoint: function (dest, src) {
      dest.pos = {}
      dest.org = {}
      dest.pos.x = src.pos.x
      dest.pos.y = src.pos.y
      dest.pos.z = src.pos.z
      dest.org.pitch = src.org.pitch
      dest.org.yaw = src.org.yaw
      dest.laser = src.laser
    },
    counter: 0
  },
  getters: {
    selectedId: state => {
      return state.trajectory.selected
    }
  },
  mutations: {
    selectPoint: function (state, id) {
      let points = this.state.trajectory.points
      let i = points.findIndex(d => d.name === id)
      this.state.trajectory.selected = id
      this.state.update(state)
    },
    modifyPoint: function (state, { id, point }) {
      let points = this.state.trajectory.points
      let i = points.findIndex(d => d.name === id)
      this.state.copyPoint(points[i], point)
      this.state.update(state)
    },
    insertPointLast: function (state, { id }) {
      let points = this.state.trajectory.points
      let i = points.findIndex(d => d.name === id)
      let point = {}
      this.state.copyPoint(point, points[i])
      point.name = 'point' + this.state.counter++
      points.splice(i, 0, point)
      this.state.update(state)
    },
    insertPointNext: function (state, { id }) {
      let points = this.state.trajectory.points
      let i = points.findIndex(d => d.name === id)
      let point = {}
      this.state.copyPoint(point, points[i])
      point.name = 'point' + this.state.counter++
      points.splice(i + 1, 0, point)
      this.state.update(state)
    },
    deletePoint: function (state, { id }) {
      let points = this.state.trajectory.points
      let i = points.findIndex(d => d.name === id)
      points.splice(i, 1)
      this.state.update(state)
    },
    onLoad: function (state, { traj }) {
      state.trajectory = traj
    }
  },
  actions: {

  }
})
