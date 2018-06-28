<template>
    <header>
        <router-link to="/" replace>
            <span class="logo"></span>
        </router-link>
        <div class="search">
            <form @submit.prevent="submit">
                <input type="hidden" name="stype" :value="stype" />
                <input id="keyword" name="q" type="text" autocomplete="off" v-model="skey" :placeholder="placeHolder" />
                <label for="keyword"><span class="fa fa-close" v-show="!!skey" @click="clear"></span></label>
            </form>
        </div>
    </header>
</template>

<script>
export default {
    name: 'HeaderSearch',
    props: ['placeHolder', 'stype', 'keyword'],
    data () {
        return {
            skey: this.keyword
        };
    },
    watch: {
        '$route' (to, from) {
            this.skey = to.params.keyword;
        }
    },
    created() {
        
    },
    methods: {
        clear: function () {
            this.skey = '';
        },
        submit: function () {
            this.$router.push({ path: `/search/${this.stype}/q/${this.skey}`});
        }
    }
};
</script>

<style lang="scss" scoped>
#keyword {
    font-size: 14px;
}
header {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 11;
    height: 46px;
    border-bottom: 1px solid #f3f3f3;
    padding: 0 18px;
    background: #fff;
    .logo {
        height: 22px;
        width: 46px;
        background: url("../assets/images/logo.png") no-repeat center center;
        background-size: contain;
        float: left;
        margin: 12px 0 0 0;
    }

    .search {
        float: right;
        margin: 10px 0 0 0;
        padding: 4px;
        border-radius: 5px;
        width: 76%;
        height: 22px;
        background: #f3f3f3;
        position: relative;

        input[type="text"] {
            background: url("../assets/images/search.png") no-repeat left center;
            background-size: 18px;
            width: 90%;
            height: 22px;
            border: none;
            padding-left: 22px;
        }

        .fa-close {
            position: absolute;
            right: 4px;
            top: 4px;
            font-size: 22px;
            color: #ccc;
        }
    }
}
</style>
