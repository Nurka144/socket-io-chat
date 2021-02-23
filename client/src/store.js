import {createStore} from 'vuex';

const store = createStore({
    state: {
        userid: ""
    },
    mutations: {
        login(state, userid) {
            state.userid = userid;
        }
    }
})

export default store;