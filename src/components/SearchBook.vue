<template>
    <div class="list-con">
        书籍搜索结果
    </div>
</template>

<script>
import Api from '@/api';
import RatingStars from '@/components/RatingStars.vue';

export default {
    name: 'Movie',
    components: {
        RatingStars
    },
    data () {
        return {
            list: [],
            isLoading: false
        };
    },
    created: function () {

    },
    methods: {
        
    }
};
</script>

<style lang="scss" scoped>
.list-con {
    padding-top: 46px; 
}
</style>
