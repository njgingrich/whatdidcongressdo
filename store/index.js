import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      votes: {
        house: {},
        senate: {}
      }
    },
    mutations: {
      setVotes (state, payload) {
        if (payload.chamber === 'house') {
          state.votes.house = payload.votes
        } else {
          state.votes.senate = payload.votes
        }
      }
    },
    actions: {
      async getTodaysVotes ({ commit }, params) {
        axios.defaults.headers.common['X-API-Key'] = 'wy7lAERzwY95CUEKsJFmX8gCLXD2JcBYue1fSnaQ'
        const { data: houseData } = await axios.get(`https://api.propublica.org/congress/v1/house/votes/2017-12-21/2017-12-21.json`)
        const { data: senateData } = await axios.get(`https://api.propublica.org/congress/v1/senate/votes/2017-12-21/2017-12-21.json`)
        commit('setVotes', {
          chamber: 'house',
          votes: houseData.results.votes
        })
        commit('setVotes', {
          chamber: 'senate',
          votes: senateData.results.votes
        })
      }
    }
  })
}

export default createStore
