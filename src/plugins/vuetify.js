import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify, {
    iconfont: 'fa'
})

export default new Vuetify({
    theme: {
        dark: true,
        themes: {
            dark: {
                primary: '#2F855A',
                secondary: '#643C21',
                accent: '#795548',
                error: '#f44336',
                warning: '#ffc107',
                info: '#009688',
                success: '#4caf50'
            },
            light: {
                primary: '#2F855A',
                secondary: '#643C21',
                accent: '#795548',
                error: '#f44336',
                warning: '#ffc107',
                info: '#009688',
                success: '#4caf50'
            },
        },
    },
});
