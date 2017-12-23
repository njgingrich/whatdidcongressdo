import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      senate: {
        votes: {},
        floor_actions: {}
      },
      house: {
        votes: {},
        floor_actions: {}
      }
    },
    mutations: {
      setVotes (state, payload) {
        if (payload.chamber === 'house') {
          state.house.votes = payload.votes
        } else {
          state.senate.votes = payload.votes
        }
      },
      setFloorActions (state, payload) {
        if (payload.chamber === 'house') {
          state.house.floor_actions = payload.floor_actions
        } else {
          state.senate.floor_actions = payload.floor_actions
        }
      }
    },
    actions: {
      async getTodaysVotes ({ commit }, params) {
        axios.defaults.headers.common['X-API-Key'] = 'wy7lAERzwY95CUEKsJFmX8gCLXD2JcBYue1fSnaQ'
        // const { data: houseData } = await axios.get(`https://api.propublica.org/congress/v1/house/votes/2017-12-21/2017-12-21.json`)
        // const { data: senateData } = await axios.get(`https://api.propublica.org/congress/v1/senate/votes/2017-12-21/2017-12-21.json`)

        const { data: houseData } = await axios.get(`http://localhost:3000/testdata/house.json`)
        const { data: senateData } = await axios.get(`http://localhost:3000/testdata/senate.json`)
        commit('setVotes', {
          chamber: 'house',
          votes: houseData.results.votes
        })
        commit('setVotes', {
          chamber: 'senate',
          votes: senateData.results.votes
        })
      },
      async getTodaysFloorActions ({ commit }, params) {
        axios.defaults.headers.common['X-API-Key'] = 'wy7lAERzwY95CUEKsJFmX8gCLXD2JcBYue1fSnaQ'

        const { data: houseData } = await axios.get(`http://localhost:3000/testdata/house_floor.json`)
        const { data: senateData } = await axios.get(`http://localhost:3000/testdata/senate_floor.json`)
        console.log('housedata:', houseData)
        commit('setFloorActions', {
          chamber: 'house',
          floor_actions: houseData.results[0].floor_actions
        })
        commit('setFloorActions', {
          chamber: 'senate',
          floor_actions: senateData.results[0].floor_actions
        })
      }
    }
  })
}

export default createStore
