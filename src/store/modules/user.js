const fb = require('../../../firebaseConfig')

const state = {
    currentUser: null,
    userProfile: {}
};

const getters = {
};

const actions = {
    fetchUserProfile({ commit, state }) {
        fb.usersCollection.doc(state.currentUser.uid).get().then(res => {
            commit('setUserProfile', res.data())
        }).catch(err => {
            console.log(err)
        })
    }
};

const mutations = {
    setCurrentUser(state, val) {
        state.currentUser = val
    },
    setUserProfile(state, val) {
        state.userProfile = val
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};