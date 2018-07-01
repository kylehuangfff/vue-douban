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
        page: 1,
        size: 36,
        scrollTop: 0,
        cateList: ['小说', '心理', '爱情', '历史', '青春', '励志', '随笔', '传记', '推理', '旅行', '奇幻', '经济', '管理', '创业']
    },
    mutations: {
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

let Music = {
    namespaced: true,
    state: {
        page: 1,
        size: 36,
        scrollTop: 0,
        cateList: ['流行', '摇滚', '民谣', '独立', '华语', '欧美', '日本', '韩国', '影视', '动漫', '游戏', '其他']
    },
    mutations: {
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

export default new Vuex.Store({
    modules: {
        movie: Movie,
        book: Book,
        music: Music
    }
});
