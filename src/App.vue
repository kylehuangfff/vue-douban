<template>
    <div id="app">
        <router-view/>
        <keep-alive>
            <router-view name="movie"/>
        </keep-alive>
    </div>
</template>

<script>
export default {
    name: 'App'
};
</script>
