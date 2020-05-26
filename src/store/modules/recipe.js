const state = {
    recipeID: null,
};

const getters = {
    recipeID: state => state.recipeID
};

const actions = {
    async setRecipeId({ commit }, val) {
        commit('newRecipeId', val);
    }
};

const mutations = {
    newRecipeId: (state, val) => (state.recipeID = val)
};

export default {
    state,
    getters,
    actions,
    mutations
};