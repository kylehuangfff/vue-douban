<template>
    <div :class="{loading: true, inline: inline}">

    </div>
</template>

<script>
export default {
    name: 'Loading',
    props: ['inline'],
    data () {
        return {};
    }
};
</script>

<style lang="scss">
.loading {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: url("../assets/images/loading.gif") no-repeat center center;
    z-index: 10;
    background-size: 50px; 
}
.inline {
    position: static;
    height: 40px;
    z-index: 0;
    background-size: contain;
    margin-bottom: 20px;
}
</style>
