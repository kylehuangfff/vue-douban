<template>
    <div class="list-con">
        <header-search placeHolder="书名/作者/ISBN" stype="book"></header-search>
        <loading v-show="!!isLoading" />

        <section v-for="(pItem, index) in allList" :key="index" v-if="pItem.list.length > 0">
            <header>
                <h2>{{pItem.tag}}</h2>
            </header>
            <div class="section-content">
                <ul class="row items">
                    <li class="item" v-for="item in pItem.list" :key="parseInt(item.isbn13)">
                        <router-link :to="'/book/subject/' + item.isbn13">
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
                        <router-link :to="'/search/book/tag/' + cate">{{cate}}<span class="fa fa-angle-right"></span></router-link>
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
    name: 'Book',
    components: {
        HeaderSearch,
        RatingStars,
        Loading
    },
    computed: {
        cateList () {
            return this.$store.state.book.cateList;
        }
    },
    data () {
        return {
            utils,
            allList: [
                {
                    tag: '文学',
                    list: []
                },{
                    tag: '文化',
                    list: []
                },{
                    tag: '流行',
                    list: []
                },{
                    tag: '生活',
                    list: []
                },{
                    tag: '经济',
                    list: []
                },{
                    tag: '管理',
                    list: []
                },{
                    tag: '科技',
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
                setTimeout(()=>{
                    this.isLoading = false;
                    this.allList = tmpList;
                }, 1500);
                return;
            }

            Api.jsonp('https://api.douban.com/v2/book/search?tag=' + cur.tag)
            .then(res=>{
                tmpList.push({
                    tag: cur.tag,
                    list: res.books
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

</style>
