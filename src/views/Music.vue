<template>
    <div class="list-con">
        <header-search placeHolder="音乐/歌手" stype="music"></header-search>
        <loading v-show="!!isLoading" />

        <section v-for="(pItem, index) in allList" :key="index" v-if="pItem.list.length > 0">
            <header>
                <h2>{{pItem.tag}}</h2>
            </header>
            <div class="section-content">
                <ul class="row items">
                    <li class="item" v-for="item in pItem.list" :key="parseInt(item.id)">
                        <router-link :to="'/music/subject/' + item.id">
                            <div class="item-image"><img v-lazy="utils.imgProxy(item.image)" /></div>
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
                        <router-link :to="'/search/music/tag/' + cate">{{cate}}<span class="fa fa-angle-right"></span></router-link>
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
    name: 'Music',
    components: {
        HeaderSearch,
        RatingStars,
        Loading
    },
    computed: {
        cateList () {
            return this.$store.state.music.cateList;
        }
    },
    data () {
        return {
            utils,
            allList: [
                {
                    tag: '华语',
                    list: []
                },{
                    tag: '欧美',
                    list: []
                },{
                    tag: '日本',
                    list: []
                },{
                    tag: '韩国',
                    list: []
                },{
                    tag: '影视',
                    list: []
                },{
                    tag: '动漫',
                    list: []
                },{
                    tag: '游戏',
                    list: []
                }
            ],
            isLoading: false
        };
    },
    created: function () {

        let tmpList = [];

        let loadData = (index)=>{

            let cur = this.allList[index];

            if(!cur) {
                this.isLoading = false;
                setTimeout(()=>{
                    this.isLoading = false;
                    this.allList = tmpList;
                }, 1500);
                return;
            }

            Api.jsonp('https://api.douban.com/v2/music/search?tag=' + cur.tag)
            .then(res=>{
                tmpList.push({
                    tag: cur.tag,
                    list: res.musics
                })
                loadData(++index);
            })
            .catch(err=>{
                console.log(err);
                loadData(++index);
            });
        };

        this.isLoading = true;

        loadData(0);
    },
    methods: {
        
    }
};
</script>

<style lang="scss" scoped>
.section-content {

    .item {

        .item-image {
            width: 100px;
            height: 100px;
        }

    }

}
</style>
