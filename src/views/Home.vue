<template>
    <div>
        <div class="logo"><img src="../assets/images/logo.png" /></div>
        <ul class="menu">
            <li>
                <router-link to="/movie" style="color: rgb(35, 132, 232)">
                    <strong>电影</strong>
                    <span>影院热映</span>
                </router-link>
            </li>
            <li v-if="false">
                <router-link to="/music" style="color: rgb(244, 143, 46);">
                    <strong>音乐</strong>
                    <span>新碟榜</span>
                </router-link>
            </li>
            <li v-if="false">
                <router-link to="/book" style="color: rgb(159, 120, 96);">
                    <strong>图书</strong>
                    <span>畅销排行</span>
                </router-link>
            </li>
            <li v-if="false">
                <router-link to="/event" style="color: rgb(230, 70, 126);">
                    <strong>同城</strong>
                    <span>周末活动</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data () {
        return {};
    }
};
</script>

<style lang="scss" scoped>
    .logo {
        margin: 1rem auto;
        text-align: center;
    }
    .menu {
        overflow: hidden;

        li {
            float: left;
            width: 33.3%;
            text-align: center;
            margin-bottom: 25px;

            strong {
                display: block;
                font-weight: 400;
                font-size: 0.75rem;
                line-height: 1rem;
            }

            span {
                display: block;
                color: #999;
                font-size: 0.32rem;
                letter-spacing: 1px;
            }
        }

    }
</style>
