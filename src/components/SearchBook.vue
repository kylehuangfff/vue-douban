<template>
    <ul class="items">
        <li class="item" v-for="(item, index) in list" :key="parseInt(item.id + '' + index)">
            <router-link :to="'/book/subject/' + item.isbn13" @click.native="$emit('viewSubject')">
                <div class="item-image"><img v-lazy="utils.imgProxy(item.images.small)" /></div>
                <span class="item-title">{{item.title}}</span>
                <rating-stars :rating="item.rating"></rating-stars>
            </router-link>
        </li>
    </ul>
</template>

<script>
import Api from '@/api';
import RatingStars from '@/components/RatingStars.vue';
import utils from '@/utils/common';

export default {
    name: 'Movie',
    props: ['list'],
    components: {
        RatingStars
    },
    data () {
        return {
            utils
        };
    },
    created () {
        
    },
    methods: {
        imgProxy (url) {
            return utils.imgProxy(url);
        }
    }
};
</script>

<style lang="scss" scoped>
.items {
    padding: 20px 10px;
}
.item {
    display: inline-block;
    text-align: center;
    width: 33.333333%;
    box-sizing: border-box;
    padding: 0 7.3px;
    margin-bottom: 20px;
    .item-image {
        width: 100%;
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
</style>
