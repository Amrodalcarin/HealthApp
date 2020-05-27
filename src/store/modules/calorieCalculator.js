const state = {
    calorieComponentKey: 0,
    consumedDayCalories: 0
};

const getters = {
    calorieComponentKey: state => state.calorieComponentKey,
    consumedDayCalories: state => state.consumedDayCalories
};

const actions = {
    async setCalorieComponentKey({ commit }) {
        commit('newCalorieComponentKey');
    },
    async setCalories({ commit }, val) {
        commit('newConsumedCalories', val)
    },
};

const mutations = {
    newCalorieComponentKey: (state) => (state.calorieComponentKey += 1),
    newConsumedCalories: (state, val) => (state.consumedDayCalories = val)
};

export default {
    state,
    getters,
    actions,
    mutations
};