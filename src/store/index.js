import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './mutation-types';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

// initial state
const state = {
    added: [
        {
            id: 'cc919e21-ae5b-5e1f-d023-c40ee669520c',
            name: 'Cotton T-Shirt, Medium',
            description: '',
            price: 1.99,
            quantity: 1,
        },
        {
            id: 'bcd755a6-9a19-94e1-0a5d-426c0303454f',
            name: 'Baseball Cap, One Size',
            description: '',
            price: 2.99,
            quantity: 2,
        },
        {
            id: '727026b7-7f2f-c5a0-ace9-cc227e686b8e',
            name: 'Swim Shorts, Medium',
            description: '',
            price: 3.99,
            quantity: 1,
        },
    ],
    all: [
        {
            id: 'cc919e21-ae5b-5e1f-d023-c40ee669520c',
            name: 'Cotton T-Shirt, Medium',
            description: '',
            price: 1.99,
            quantity: 1,
        },
        {
            id: 'bcd755a6-9a19-94e1-0a5d-426c0303454f',
            name: 'Baseball Cap, One Size',
            description: '',
            price: 2.99,
            quantity: 2,
        },
        {
            id: '727026b7-7f2f-c5a0-ace9-cc227e686b8e',
            name: 'Swim Shorts, Medium',
            description: '',
            price: 3.99,
            quantity: 1,
        },
    ],
};

// getters
const getters = {
    allProducts: (state) => state.all, // would need action/mutation if data fetched async
    getNumberOfProducts: (state) => (state.all ? state.all.length : 0),
    cartProducts: (state) => {
        return state.added.map(({ id, quantity }) => {
            const product = state.all.find((p) => p.id === id);

            return {
                name: product.name,
                price: product.price,
                id: product.id,
                quantity,
            };
        });
    },
};

// actions
const actions = {
    updateQuantity({ commit }, product) {
        commit(types.UPDATE_QUANTITY, {
            id: product.id,
            q: event.target.value,
        });
    },

    incrementCart({ commit }, product) {
        commit(types.INCREMENT_CART, {
            id: product.id,
        });
    },

    decrementCart({ commit }, product) {
        commit(types.DECREMENT_CART, {
            id: product.id,
        });
    },

    makeQuantityZero({ commit }, { product, quantity }) {
        commit(types.MAKE_QUANTITY_ZERO, {
            id: product.id,
            q: quantity,
        });
    },
};

// mutations
const mutations = {
    [types.UPDATE_QUANTITY](state, { id, q }) {
        const record = state.added.find((p) => p.id === id);
        if (record) {
            record.quantity = q;
        }
    },

    [types.INCREMENT_CART](state, { id }) {
        const record = state.added.find((p) => p.id === id);
        if (!record) {
            state.added.push({
                id,
                quantity: 1,
            });
        } else {
            if (record.quantity < 10) {
                record.quantity++;
            }
        }
    },

    [types.DECREMENT_CART](state, { id }) {
        const record = state.added.find((p) => p.id === id);

        if (record.quantity > 1) {
            record.quantity--;
        }
    },

    [types.MAKE_QUANTITY_ZERO](state, { id, q }) {
        const record = state.added.find((p) => p.id === id);
        if (record) {
            record.quantity = q;
        }
    },
};

// one store for entire application
export default new Vuex.Store({
    state,
    strict: debug,
    getters,
    actions,
    mutations,
});
