import Vuex from 'vuex'
import axios from 'axios'
import moment from 'moment'

const baseUrl = `https://api.propublica.org/congress/v1`
axios.defaults.headers.common['X-API-Key'] = process.env.API_KEY

const createStore = () => {
  return new Vuex.Store({
    state: {
      senate: {
        today: {
          votes: {},
          floor_actions: {}
        },
        recent: {
          date: moment().subtract(1, 'days').toISOString(),
          votes: {},
          floor_actions: {}
        },
        isInSession: false
      },
      house: {
        today: {
          votes: {},
          floor_actions: {}
        },
        recent: {
          date: moment().subtract(1, 'days').toISOString(),
          votes: {},
          floor_actions: {}
        },
        isInSession: false
      }
    },
    mutations: {
      setVotes (state, payload) {
        if (payload.day === 'today') {
          if (payload.chamber === 'house') {
            state.house.today.votes = payload.votes
          } else {
            state.senate.today.votes = payload.votes
          }
        } else {
          if (payload.chamber === 'house') {
            state.house.recent.votes = payload.votes
          } else {
            state.senate.recent.votes = payload.votes
          }
        }
      },
      setFloorActions (state, payload) {
        if (payload.day === 'today') {
          if (payload.chamber === 'house') {
            state.house.today.floor_actions = payload.floor_actions
          } else {
            state.senate.today.floor_actions = payload.floor_actions
          }
        } else {
          if (payload.chamber === 'house') {
            state.house.recent.floor_actions = payload.floor_actions
          } else {
            state.senate.recent.floor_actions = payload.floor_actions
          }
        }
      },
      setRecentDate (state, payload) {
        if (payload.chamber === 'house') {
          state.house.recent.date = payload.date
        } else {
          state.senate.recent.date = payload.date
        }
      },
      setInSession (state, payload) {
        if (payload.chamber === 'house') {
          state.house.isInSession = payload.value
        } else {
          state.senate.isInSession = payload.value
        }
      }
    },
    actions: {
      async getTodaysVotes ({ commit }, params) {
        let today = moment().format('YYYY-MM-DD')
        const houseVotes = await getVotesForDay(today, 'house')
        const senateVotes = await getVotesForDay(today, 'senate')

        commit('setVotes', {
          chamber: 'house',
          day: 'today',
          votes: houseVotes
        })
        commit('setVotes', {
          chamber: 'senate',
          day: 'today',
          votes: senateVotes
        })
      },
      async getTodaysFloorActions ({ commit }, params) {
        let today = moment().format('YYYY/MM/DD')
        const houseFloorActions = await getActionsForDay(today, 'house')
        const senateFloorActions = await getActionsForDay(today, 'senate')

        commit('setFloorActions', {
          chamber: 'house',
          day: 'today',
          floor_actions: houseFloorActions
        })
        commit('setFloorActions', {
          chamber: 'senate',
          day: 'today',
          floor_actions: senateFloorActions
        })
      },
      async getRecentVotes ({ commit }, params) {
        // get the most recent votes, only for the same day as the most recent item
        // recent date is shared between votes/actions, but not between chambers
        const houseDate = await getRecentSession('house')
        const senateDate = await getRecentSession('senate')

        const houseVotes = await getVotesForDay(houseDate.format('YYYY-MM-DD'), 'house')
        const senateVotes = await getVotesForDay(senateDate.format('YYYY-MM-DD'), 'senate')

        commit('setVotes', {
          chamber: 'house',
          day: 'recent',
          votes: houseVotes
        })
        commit('setVotes', {
          chamber: 'senate',
          day: 'recent',
          votes: senateVotes
        })
        commit('setRecentDate', {
          chamber: 'house',
          date: houseDate.toISOString()
        })
        commit('setRecentDate', {
          chamber: 'senate',
          date: senateDate.toISOString()
        })
      },
      async getRecentFloorActions ({ commit }, params) {
        // get the most recent actions, only for the same day as the most recent item
        const houseDate = await getRecentSession('house')
        const senateDate = await getRecentSession('senate')

        const houseActions = await getActionsForDay(houseDate.format('YYYY/MM/DD'), 'house')
        const senateActions = await getActionsForDay(senateDate.format('YYYY/MM/DD'), 'senate')

        commit('setFloorActions', {
          chamber: 'house',
          day: 'recent',
          floor_actions: houseActions
        })
        commit('setFloorActions', {
          chamber: 'senate',
          day: 'recent',
          floor_actions: senateActions
        })
      },
      async getCongressSession ({ commit }, params) {
        const houseSession = await getRecentSession('house')
        const senateSession = await getRecentSession('senate')
        const houseInSession = moment().format('YYYY-MM-DD') === houseSession.format('YYYY-MM-DD')
        const senateInSession = moment().format('YYYY-MM-DD') === senateSession.format('YYYY-MM-DD')

        commit('setInSession', {
          chamber: 'house',
          value: houseInSession
        })
        commit('setInSession', {
          chamber: 'senate',
          value: senateInSession
        })
      }
    }
  })
}

async function getRecentSession (chamber) {
  const { data: voteData } = await axios.get(`${baseUrl}/${chamber}/votes/recent.json`)
  let { data: actionData } = await axios.get(`${baseUrl}/115/${chamber}/floor_updates.json`)

  // ProPublica may send back a malformed JSON response, with strings containing unescaped newlines
  if (typeof actionData === 'string') {
    actionData = actionData.replace(/\n\n/g, '\\n')
    actionData = JSON.parse(actionData)
  }
  let recentVote = moment(voteData.results.votes[0].date)
  let recentAction = moment(actionData.results[0].floor_actions[0].date)

  // Return the more recent of the two days, if they differ
  if (recentVote.format('X') > recentAction.format('X')) {
    return recentVote
  } else {
    return recentAction
  }
}

async function getVotesForDay (date, chamber) {
  try {
    const { data } = await axios.get(`${baseUrl}/${chamber}/votes/${date}/${date}.json`)
    return data.results.votes
  } catch (err) {
    console.error(err)
  }
}

async function getActionsForDay (date, chamber) {
  let numResults = 20
  let offset = 0
  let actions = []

  // ProPublica provides pagination with results of 20 per page,
  // so we offset til num_results shows we're at the last page
  while (numResults === 20) {
    let { data } = await axios.get(`${baseUrl}/${chamber}/floor_updates/${date}.json?offset=${offset}`)
    // ProPublica may send back a malformed JSON response, with strings containing unescaped newlines
    if (typeof data === 'string') {
      data = data.replace(/\n\n/g, '\\n')
      data = JSON.parse(data)
    }
    numResults = data.results[0].num_results
    offset += 20
    actions.push(...data.results[0].floor_actions)
  }

  // Earliest first
  return actions.sort((a, b) => {
    return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  })
}

export default createStore
