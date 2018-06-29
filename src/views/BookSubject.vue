<template>
    <div class="subject-con">
        <header-search placeHolder="书名/作者/ISBN" stype="book"></header-search>
        <loading v-show="!!isLoading" />
        <div class="subject" v-if="item.id">
            <h1>{{item.title}}</h1>

            <section class="subject-info">
                <div class="right">
                    <img v-lazy="utils.imgProxy(item.images.small)" />
                </div>
                <div class="left">
                    <rating-stars :rating="item.rating" :ratings_count="item.rating.numRaters"></rating-stars>
                    <p class="meta">
                        {{meta}}
                    </p>
                </div>
            </section>

            <section class="subject-channel">
                <h2>所属频道</h2>
                <ul>
                    <li class="channel_tag" v-for="c in item.tags" :key="c.title">
                        <router-link :to="'/search/book/tag/' + c.title">{{c.title}}</router-link>
                    </li>
                </ul>
            </section>

            <section class="subject-catalog" v-if="item.catalog">
                <h2>目录</h2>
                <pre>{{item.catalog}}</pre>
            </section>

            <section class="subject-intro">
                <h2>内容简介</h2>
                <p>
                    {{item.summary}}
                </p>
            </section>

            <section class="subject-comments">
                <h2>书评</h2>
                <p>
                    <a :href="'https://m.douban.com/book/subject/' + item.id + '/comments?from=subject'" target="_blank">查看短评</a>
                </p>
            </section>

            <section class="subject-review">
                <h2>读书笔记</h2>
                <ul>
                    <li v-for="review in reviews" :key="review.id">
                        <a :href="'https://m.douban.com/people/' + review.author_user.id" target="_blank">
                            <img class="avatar" v-lazy="utils.imgProxy(review.author_user.avatar)" >
                        </a>
                        <div class="desc">
                            <span class="uname">{{review.author_user.name}}</span> <span class="date">{{utils.moment(review.time).fromNow()}}</span>
                        </div>
                        <div class="summary">
                            <div class="cont" v-html="utils.nl2br( (review.isExpend ? review.content : review.summary).replace(/<\/?[^>]*>/g, '') ) "></div>
                            <span v-if="review.content.length > review.summary.length" class="expend" v-show="!review.isExpend" @click="expend(review)">[展开]</span>
                        </div>
                    </li>
                </ul>
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
    name: 'BookSubject',
    components: {
        HeaderSearch,
        RatingStars,
        Loading
    },
    data () {
        return {
            utils,
            item: {},
            reviews: [],
            err: null,
            isLoading: false
        };
    },
    computed: {
        meta: function () {
            let item = this.item;
            let meta = [
                ...item.author,
                ...item.translator,
                item.publisher,
                item.pages + '页',
                item.binding,
                item.price,
                item.pubdate
            ];

            return meta.join(' / ');
        }
    },
    created() {

        this.isLoading = true;

        let queue = new utils.Queue();

        queue.run(()=>{
            Api.jsonp('https://api.douban.com/v2/book/isbn/' + this.$route.params.id)
            .then(res=>{
                this.item = res;
                queue.next();
            })
            .catch(err=>{
                this.err = err;
                this.isLoading = false;
            });
        }).run(()=>{
            Api.jsonp('https://api.douban.com/v2/book/' + this.item.id + '/annotations?count=10')
            .then(res=>{
                this.reviews = res.annotations;
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
        expend: function (review) {
            this.$set(review, 'isExpend', !review.isExpend);
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
