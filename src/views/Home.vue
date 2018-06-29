<template>
    <div class="home">
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
            <li>
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

        <a href="https://github.com/kylehuangfff/vue-douban" target="_blank" class="github">
            <svg height="24" class="octicon octicon-mark-github" viewBox="0 0 16 16" version="1.1" width="24" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
        </a>
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
    .home {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

        .github {
            position: absolute;
            bottom: 10px;
            left: 50%;
            margin-left: -12px;
        }
    }
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
