<template>
    <div class="list-con">
        <template v-if="this.field === 'q'">
            <header-search :placeHolder="placeHolder" :stype="type" :keyword="keyword"></header-search>
        </template>
        <template v-else-if="this.field === 'tag'">
            <header-search :placeHolder="placeHolder" :stype="type" ></header-search>
            <h1>{{this.keyword + this.cate}}</h1>
        </template>
        
        <component :is="searchComponent" :list="list" @viewSubject="viewSubject"></component>
        <loading v-show="!!isLoading" :inline="true" />
    </div>
</template>

<script>
import Api from '@/api';
import HeaderSearch from '@/components/HeaderSearch';
import Loading from '@/components/Loading';
import SearchMovie from '@/components/SearchMovie';
import SearchBook from '@/components/SearchBook';
import SearchMusic from '@/components/SearchMusic';

export default {
    name: 'Search',
    components: {
        HeaderSearch,
        Loading
    },
    data () {
        return {
            list: [],
            keyword: this.$route.params.keyword,
            type: this.$route.params.type,
            field: this.$route.params.field,
            isLoading: false
        };
    },
    computed: {
        page () {
            return this.$store.state[this.type].page;
        },
        size () {
            return this.$store.state[this.type].size;
        },
        placeHolder () {
            return ({
                'movie': '电影名',
                'music': '音乐/歌手',
                'book': '书名/作者/ISBN'
            })[this.type];
        },
        cate () {
            return ({
                'movie': '电影',
                'music': '音乐',
                'book': '图书'
            })[this.type];
        },
        listField () {
            return  ({
                'movie': 'subjects',
                'music': 'musics',
                'book': 'books'
            })[this.type];
        },
        searchComponent () {
            switch(this.type) {
                case 'movie':
                    return SearchMovie;
                case 'book':
                    return SearchBook;
                case 'music':
                    return SearchMusic;
            }
        },
        cacheKey () {
            return this.type + '-' + this.field + '-' + this.keyword;
        }
    },
    methods: {
        search () {

            if(this.isLoading) {
                return;
            }

            this.isLoading = true;

            Api.jsonp(`https://api.douban.com/v2/${this.type}/search?${this.field}=${this.keyword}&count=${this.size}&start=${this.size*(this.page-1)}`)
            .then(res=>{

                this.isLoading = false;

                this.list = [...this.list, ...res[this.listField]];

                sessionStorage.setItem(this.cacheKey, JSON.stringify({page: this.page, list: this.list}));

                if(res.total < res.start + res.count) {
                    this.unbindScroll();
                }
            })
            .catch(err=>{
                this.isLoading = false;
                console.log(err);
            });
        },
        scroll () {
            let docHeight = document.documentElement.offsetHeight;
            let winHeight = document.documentElement.clientHeight;
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

            if(scrollTop + winHeight > docHeight - 120 && !this.isLoading) {

                this.$store.commit(`${this.type}/setPage`, this.page + 1);

                this.search();
            }
        },
        bindScroll () {
            window.addEventListener('scroll', this.scroll, false);
        },
        unbindScroll () {
            window.removeEventListener('scroll', this.scroll, false);
        },
        viewSubject () {
            this.$store.commit(`${this.type}/setScrollTop`, document.documentElement.scrollTop);
        }
    },
    created () {

        let dataCache = sessionStorage.getItem(this.cacheKey);
        if(dataCache) {
            dataCache = JSON.parse(dataCache);
            this.list = dataCache.list;
            this.$store.commit(`${this.type}/setPage`, dataCache.page);
            this.$store.commit(`${this.type}/setScrollTop`, 0);

            document.documentElement.scrollTop = this.sctollTop;
        } else {
            this.search();
        }
        
        this.bindScroll();
    },
    beforeDestroy() {
        this.$store.commit(`${this.type}/setPage`,1);
        this.unbindScroll();
    },
    watch: {
        '$route' (to, from) {
            this.keyword = to.params.keyword;
            this.$store.commit(`${this.type}/setPage`,1);
            this.field = to.params.field;
    
            let dataCache = sessionStorage.getItem(this.cacheKey);
            if(dataCache) {
                dataCache = JSON.parse(dataCache);
                this.list = dataCache.list;
                this.$store.commit(`${this.type}/setPage`, dataCache.page);
                this.$store.commit(`${this.type}/setScrollTop`, 0);
                
                document.documentElement.scrollTop = 0;
            } else {
                this.list = [];
                this.search();
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.list-con {
    padding-top: 46px; 
}
h1 {
    padding: 0 20px;
    line-height: 30px;
    display: inline-block;
    color: #111;
    font-size: 24px;
    margin-top: 20px;
}
</style>
