<template>
    <div class="rating">
        <div class="rank" v-if="this.rating.average > 0">
            <span class="rating-stars">
                <template v-for="n in 5">
                    <span class="fa fa-star" v-if="star>=n" :key="n"></span>
                    <span class="fa fa-star gray" :key="n" v-else></span>
                </template>
            </span> 
            <span>{{this.rating.average}}</span>
            <span class="rating-count" v-if="this.ratings_count">{{ratings_count}}人评价</span>
        </div>
        <div class="rank" v-else>
            <span>暂无评分</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RatingStars',
    props: ['rating', 'ratings_count'],
    data () {
        return {
            star: Math.floor((this.rating.average || 0) / 2)
        };
    }
};
</script>

<style lang="scss" scoped>
.fa-star {
    color: rgb(255,183,18)
}
.fa-star.gray {
    color: #ccc;
}
.rating {
    color: #aaa;
}
.rating-count {
    color: #aaa;
    margin-left: 10px;
}
</style>
