<template>
    <div class="subject-con">
        <header-search placeHolder="音乐/歌手" stype="music"></header-search>
        <loading v-show="!!isLoading" />
        <div class="subject" v-if="item.id">
            <h1>{{item.title}}</h1>

            <section class="subject-info">
                <div class="right">
                    <img v-lazy="utils.imgProxy(item.image)" />
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
                    <li class="channel_tag" v-for="c in item.tags" :key="c.name">
                        <router-link :to="'/search/music/tag/' + c.name">{{c.name}}</router-link>
                    </li>
                </ul>
            </section>

            <section class="subject-catalog" v-if="item.attrs && item.attrs.tracks">
                <h2>曲目</h2>
                <pre>{{[...item.attrs.tracks].join('\n')}}</pre>
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
    name: 'MusicSubject',
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
            return this.item.summary;
        }
    },
    created() {

        this.isLoading = true;

        let queue = new utils.Queue();

        queue.run(()=>{
            Api.jsonp('https://api.douban.com/v2/music/' + this.$route.params.id)
            .then(res=>{
                this.item = res;
                queue.next();
            })
            .catch(err=>{
                this.err = err;
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
.subject-info .right img {
    width: 100px;
    height: 100px;
}
</style>
