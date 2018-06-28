<template>
    <div>
        <header-search placeHolder="书名" stype="book"></header-search>
    </div>
</template>

<script>
import HeaderSearch from '@/components/HeaderSearch.vue';
import Loading from '@/components/Loading.vue';

export default {
    name: 'Book',
    components: {
        HeaderSearch
    },
    data () {
        return {};
    }
};
</script>

<style lang="scss" scoped>

</style>
