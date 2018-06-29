<template>
    <div class="list-con">
        <header-search placeHolder="电影名" stype="movie"></header-search>
        <loading v-show="!!isLoading" />
        <section v-if="inTheaters && inTheaters.length > 0">
            <header>
                <h2>影院热映</h2>
                <!-- <a href="/movie/nowintheater?loc_id=108288">更多</a> -->
            </header>
            <div class="section-content">
                <ul class="row items">
                    <li class="item" v-for="item in inTheaters" :key="parseInt(item.id)">
                        <router-link :to="'/movie/subject/' + item.id">
                            <div class="item-image"><img v-lazy="utils.imgProxy(item.images.small)" /></div>
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
                    <li class="item" v-for="item in comingSoon" :key="parseInt(item.id)">
                        <router-link :to="'/movie/subject/' + item.id">
                            <div class="item-image"><img v-lazy="utils.imgProxy(item.images.small)" /></div>
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
import '@/assets/css/channel.scss';

import Api from '@/api';
import HeaderSearch from '@/components/HeaderSearch';
import RatingStars from '@/components/RatingStars';
import Loading from '@/components/Loading';
import utils from '@/utils/common';

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
            utils,
            inTheaters: [],
            comingSoon: [],
            isLoading: false
        };
    },
    created: function () {

        this.isLoading = true;

        let queue = new utils.Queue();

        queue.run(()=>{
            Api.jsonp('https://api.douban.com/v2/movie/in_theaters?count=20&city=厦门')
            .then(res=>{
                this.inTheaters = res.subjects;

                queue.next();
            })
            .catch(err=>{
                console.log(err);
                queue.next();
            });
        }).run(()=>{
            Api.jsonp('https://api.douban.com/v2/movie/coming_soon')
            .then(res=>{
                this.comingSoon = res.subjects;
                queue.next();
            })
            .catch(err=>{
                console.log(err);
                queue.next();
            });
        }).run(()=>{
            this.isLoading = false;
        }).start();
    },
    methods: {
        
    }
};
</script>

<style lang="scss" scoped>

</style>
