<template>
    <div class="subject-con">
        <header-search placeHolder="电影名" stype="movie"></header-search>
        <loading v-show="!!isLoading" />
        <div class="subject" v-if="item.id">
            <h1>{{item.title}}</h1>

            <section class="subject-info">
                <div class="right">
                    <a target="_blank" :href=" 'https://m.douban.com/movie/subject/' + item.id + '/all_photos' "><img v-lazy="utils.imgProxy(item.images.small)" /></a>
                </div>
                <div class="left">
                    <rating-stars :rating="item.rating" :ratings_count="item.ratings_count"></rating-stars>
                    <p class="meta">
                        {{meta}}
                    </p>
                </div>
            </section>

            <section class="subject-mark">
                <span>{{item.wish_count}}人想看</span>
                <span>{{item.collect_count}}人看过</span>
            </section>

            <section class="subject-channel">
                <h2>所属频道</h2>
                <ul>
                    <li class="channel_tag" v-for="c in item.genres" :key="c">
                        <router-link :to="'/search/movie/tag/' + c">{{c}}</router-link>
                    </li>
                </ul>
            </section>

            <section class="subject-intro">
                <h2>剧情简介</h2>
                <p>
                    {{item.summary}}
                </p>
            </section>

            <section class="subject-comments">
                <h2>影评</h2>
                <p>
                    <a :href="'https://m.douban.com/movie/subject/' + item.id + '/comments?from=subject'" target="_blank">查看短评({{item.comments_count}})</a>
                    <a :href="'https://m.douban.com/movie/subject/' + item.id + '/reviews?from=subject'" target="_blank">查看影评({{item.reviews_count}})</a>
                </p>
            </section>

            <section class="subject-people">
                <h2>影人</h2>
                <div class="section-content">
                    <ul class="row items">
                        <li class="item item__celebrity" v-for="p in people" :key="parseInt(p.id)">
                            <a :href="'https://m.douban.com/movie/celebrity/' + p.id" target="_blank">
                                <div class="item-image"><img v-lazy="utils.imgProxy(p.avatars.small)" /></div>
                                <span class="item-title name">{{p.name}}</span>
                                <span class="role">{{p.role}}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
        <div class="subject" v-if="err">读取详情失败：{{JSON.stringify(err)}}</div>
    </div>
</template>

<script>
import '@/assets/css/subject.scss';
import Api from '@/api';
import HeaderSearch from '@/components/HeaderSearch.vue';
import RatingStars from '@/components/RatingStars.vue';
import Loading from '@/components/Loading.vue';
import utils from '@/utils/common';

export default {
    name: 'MovieSubject',
    components: {
        HeaderSearch,
        RatingStars,
        Loading
    },
    data () {
        return {
            utils,
            item: {},
            err: null,
            isLoading: false
        };
    },
    computed: {
        meta: function () {
            let item = this.item;
            let meta = [
                ...item.genres,
                item.directors[0] && item.directors[0].name,
                ...item.casts.map(cast=>{
                    return cast.name;
                }),
                ...item.countries
            ];

            return meta.join(' / ');
        },
        people: function () {
            this.item.directors.forEach(item=>{
                item.role = '导演';
            });
            this.item.casts.forEach(item=>{
                item.role = '演员';
            });
            return [...this.item.directors, ...this.item.casts];
        }
    },
    created() {
        this.isLoading = true;
        Api.jsonp('https://api.douban.com/v2/movie/subject/' + this.$route.params.id)
        .then(res=>{
            this.isLoading = false;
            this.item = res;
        })
        .catch(err=>{
            this.isLoading = false;
            this.err = err;
        });
    },
    methods: {
        search: function (e) {

        }
    }
};
</script>

<style lang="scss" scoped>
.section-content .row {
    margin: 0;
    padding: 0;

    .role {
        color: #aaa;
    }
}
</style>
