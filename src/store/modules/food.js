const state = {
    foodID: null,
    foodName: null
};

const getters = {
    foodID: state => state.foodID,
    foodName: state => state.foodName
};

const actions = {
    async setFoodId({ commit }, val) {
        commit('newFoodId', val.id);
        commit('newFoodName', val.name);
    }
};

const mutations = {
    newFoodId: (state, val) => (state.foodID = val),
    newFoodName: (state, val) => (state.foodName = val)
};

export default {
    state,
    getters,
    actions,
    mutations
};