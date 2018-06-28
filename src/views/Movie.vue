<template>
    <div class="movie-con">
        <header-search placeHolder="电影名" stype="movie"></header-search>
        <loading v-show="!!isLoading" />
        <section v-if="inTheaters && inTheaters.length > 0">
            <header>
                <h2>影院热映</h2>
                <!-- <a href="/movie/nowintheater?loc_id=108288">更多</a> -->
            </header>
            <div class="section-content">
                <ul class="row items">
                    <li class="item" v-for="item in inTheaters" :key="item.id">
                        <router-link :to="'/movie/subject/' + item.id">
                            <div class="item-image"><img :src="item.images.small" @error="this.src='../assets/images/nopic.png';" /></div>
                            <span class="item-title">{{item.title}}</span>
                            <rating-stars :rating="item.rating"></rating-stars>
                        </router-link>
                    </li>
                </ul>
            </div>
        </section>
        <section v-if="comingSoon && comingSoon.length > 0">
            <header>
                <h2>即将上映</h2>
                <!-- <a href="/movie/nowintheater?loc_id=108288">更多</a> -->
            </header>
            <div class="section-content">
                <ul class="row items">
                    <li class="item" v-for="item in comingSoon" :key="item.id">
                        <router-link :to="'/movie/subject/' + item.id">
                            <div class="item-image"><img :src="item.images.small" /></div>
                            <span class="item-title">{{item.title}}</span>
                            <rating-stars :rating="item.rating"></rating-stars>
                        </router-link>
                    </li>
                </ul>
            </div>
        </section>
        <section class="types">
            <header>
                <h2>分类浏览</h2>
            </header>
            <div class="section-content">
                <ul class="type-list">
                    <li v-for="(cate,index) in cateList" :key="index">
                        <router-link :to="'/search/movie/tag/' + cate">{{cate}}<span class="fa fa-angle-right"></span></router-link>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script>
import Api from '@/api';
import HeaderSearch from '@/components/HeaderSearch.vue';
import RatingStars from '@/components/RatingStars.vue';
import Loading from '@/components/Loading.vue';

export default {
    name: 'Movie',
    components: {
        HeaderSearch,
        RatingStars,
        Loading
    },
    computed: {
        cateList () {
            return this.$store.state.movie.cateList;
        }
    },
    data () {
        return {
            inTheaters: [],
            comingSoon: [],
            isLoading: false
        };
    },
    created: function () {

        this.isLoading = true;
        let count = 2;

        Api.jsonp('https://api.douban.com/v2/movie/in_theaters?count=20&city=厦门')
        .then(res=>{
            count--;
            !count && (this.isLoading = false);
            this.inTheaters = res.subjects;

        })
        .catch(err=>{
            count--;
            !count && (this.isLoading = false);
            console.log(err);
        });

        Api.jsonp('https://api.douban.com/v2/movie/coming_soon')
        .then(res=>{
            count--;
            !count && (this.isLoading = false);
            this.comingSoon = res.subjects;
        })
        .catch(err=>{
            count--;
            !count && (this.isLoading = false);
            console.log(err);
        });
    },
    methods: {
        search: function (e) {

        }
    }
};
</script>

<style lang="scss" scoped>
.movie-con {
    padding-top: 46px;
}
section header {
    padding: 0 0.4rem;
    line-height: 1rem;

    h2 {
        display: inline-block;
        color: #111;
        font-size: 0.46rem;
    }

    a {
        color: #42bd56;
        float: right;
        font-size: 0.4rem;
    }
}

section .section-content {
    margin-bottom: 0.5rem;

    .row {
        white-space: nowrap;
        overflow-x: auto;
        margin: 0 16px;

        .item {
            display: inline-block;
            text-align: center;
            width: 100px;
            margin-right: 5px;

            .item-image {
                width: 100px;
                height: 150px;
                margin-bottom: 5px;
                overflow: hidden;
            }
            img {
                height: 100%;
            }
        }

        .item-title {
            font-size: 0.4rem;
            color: #111;
            display: block;
            margin-bottom: 0.05rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
}

.type-list {
    padding: 0;
    color: #eee;
    font-size: 14px;
    overflow: hidden;
    margin-left: 20px;
    padding: 5px 0 0 2px;
}
.type-list li {
    width: 47%;
    border: solid 1px #eee;
    float: left;
    height: 40px;
    margin: -1PX 0 0 -1PX;
}
.type-list a {
    color: #42bd56;
    display: block;
    line-height: 40px;
    padding-left: 20px;
}
.type-list span {
    color: #ccc;
    float: right;
    font-size: 18px;
    margin: 10px 10px 0 0;
}
.type-list li:last-child, .type-list li:nth-last-child(2) {
    border-bottom: solid 1px #eee;
}
</style>
