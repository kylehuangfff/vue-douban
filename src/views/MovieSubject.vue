<template>
    <div class="movie-con">
        <header-search placeHolder="电影名" stype="movie"></header-search>
        <loading v-show="!!isLoading" />
        <div class="subject" v-if="item.id">
            <h1>{{item.title}}</h1>

            <section class="subject-info">
                <div class="right">
                    <img :src="item.images.small" @error="this.src='../assets/images/nopic.png';" />
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

            <section class="subject-people" v-if="false">
                <header>
                    <h2>影人</h2>
                </header>
                <div class="section-content">
                    <ul class="row items">
                        <li class="item item__celebrity" v-for="p in people" :key="p.name">
                            <a href="https://movie.douban.com/celebrity/1027204/">
                                <div class="item-image"><img :src="p.avatars.small" /></div>
                                <span class="item-title name">{{p.name}}</span>
                                <span class="item-title role">{{p.role}}</span>
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
import Api from '@/api';
import HeaderSearch from '@/components/HeaderSearch.vue';
import RatingStars from '@/components/RatingStars.vue';
import Loading from '@/components/Loading.vue';

export default {
    name: 'MovieSubject',
    components: {
        HeaderSearch,
        RatingStars,
        Loading
    },
    data () {
        return {
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
.movie-con {
    padding-top: 46px;
}
h1 {
    margin: 20px 0 5px;
    font-size: 24px;
    line-height: 32px;
    word-break: break-all;
}
h2 {
    color: #aaa;
    margin: 0 0 15px;
    font-size: 15px;
}
section {
    margin-bottom: 20px;
}
.subject {
    margin: 0 18px;
}

.subject-info {
    position: relative;
    overflow: hidden;
    .right {
        float: right;

        img {
            width: 100px;
            height: 150px;
        }
    }
    .left {
        margin-right: 100px;
    }
    .rating {
        line-height: 18px;
        font-size: 15px;
        color: #494949;
    }
    .meta {
        color: #494949;
        margin-top: 15px;
        padding-right: 24px;
        font-size: 14px;
        line-height: 1.6;
        word-wrap: break-word;
    }
}

.subject-mark {
    margin-bottom: 30px;
    text-align: center;
    span {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        border: 1px solid #ffb712;
        border-radius: 3px;
        margin-right: 10px;
        color: #ffb712;
        font-size: 15px;
        text-align: center;
        padding: 0 20px;
    }
}

.subject-channel {
    .channel_tag {
        background-color: #effaf0;
        border: 1px solid #42bd56;
        display: inline-block;
        margin-right: 10px;
        font-size: 13px;
        padding: 5px 10px;
        border-radius: 15px;
        margin-bottom: 10px;
    }
    .channel_tag a {
        color: #42bd56;
        background: url("../assets/images/green_arrow.png") right center/8px no-repeat;
        padding-right: 10px;
    }
}

.subject-intro {
    p {
        font-size: 15px;
        color: #494949;
        line-height: 22px;
        word-wrap: break-word;
        margin: 0;
        padding: 0;
    }
}

.section-content {
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

        .role {
            color: #aaa;
        }
    }
}
</style>
