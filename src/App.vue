<template>
    <div id="app">
        <router-view/>
        <keep-alive>
            <router-view name="movie"/>
        </keep-alive>
        <keep-alive>
            <router-view name="book"/>
        </keep-alive>
    </div>
</template>

<script>
export default {
    name: 'App'
};
</script>
