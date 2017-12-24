import Vuex from 'vuex'
import axios from 'axios'
import moment from 'moment'

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
        let today = moment().subtract(2, 'days').format('YYYY-MM-DD')
        axios.defaults.headers.common['X-API-Key'] = 'wy7lAERzwY95CUEKsJFmX8gCLXD2JcBYue1fSnaQ'
        const { data: houseData } = await axios.get(`https://api.propublica.org/congress/v1/house/votes/${today}/${today}.json`)
        const { data: senateData } = await axios.get(`https://api.propublica.org/congress/v1/senate/votes/${today}/${today}.json`)

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
        let today = moment().subtract(2, 'days').format('YYYY/MM/DD')
        axios.defaults.headers.common['X-API-Key'] = 'wy7lAERzwY95CUEKsJFmX8gCLXD2JcBYue1fSnaQ'
        // Get House results
        let numResults = 20
        let offset = 0
        let houseFloorActions = []
        while (numResults === 20) {
          let req = `https://api.propublica.org/congress/v1/house/floor_updates/${today}.json?offset=${offset}`
          let { data: houseData } = await axios.get(req)
          numResults = houseData.results[0].num_results
          offset += 20
          houseFloorActions.push(...houseData.results[0].floor_actions)
        }
        houseFloorActions = houseFloorActions.sort((a, b) => {
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        })

        // Get Senate results
        numResults = 20
        offset = 0
        let senateFloorActions = []
        while (numResults === 20) {
          let req = `https://api.propublica.org/congress/v1/senate/floor_updates/${today}.json?offset=${offset}`

          let { data: senateData } = await axios.get(req)
          // ProPublica may send back a malformed JSON response, with strings containing unescaped newlines
          if (typeof senateData === 'string') {
            senateData = senateData.replace(/\n\n/g, '\\n')
            senateData = JSON.parse(senateData)
          }
          numResults = senateData.results[0].num_results
          offset += 20
          senateFloorActions.push(...senateData.results[0].floor_actions)
        }
        senateFloorActions = senateFloorActions.sort((a, b) => {
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        })

        commit('setFloorActions', {
          chamber: 'house',
          floor_actions: houseFloorActions
        })
        commit('setFloorActions', {
          chamber: 'senate',
          floor_actions: senateFloorActions
        })
      }
    }
  })
}

export default createStore
