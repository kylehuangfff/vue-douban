import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let Movie = {
    namespaced: true,
    state: {
        page: 1,
        size: 18,
        scrollTop: 0,
        cateList: ['动作', '喜剧', '爱情', '悬疑', '恐怖', '科幻', '治愈', '文艺', '成长', '动画']
    },
    mutations: {
        setKeyword (state, keyword) {
            state.keyword = keyword;
            state.tag = '';
        },
        setTag (state, tag) {
            state.tag = tag;
            state.keyword = '';
        },
        setPage (state, page) {
            state.page = page;
        },
        setScrollTop (state, scrollTop) {
            state.scrollTop = scrollTop;
        },
        setSize (state, size) {
            state.size = size;
        }
    }
};

let Book = {
    namespaced: true,
    state: {
        keyword: '',
        tag: ''
    },
    mutations: {
        setKeyword (state, keyword) {
            state.keyword = keyword;
            state.tag = '';
        },
        setTag (state, tag) {
            state.tag = tag;
            state.keyword = '';
        }
    }
};

export default new Vuex.Store({
    modules: {
        movie: Movie,
        book: Book
    }
});
