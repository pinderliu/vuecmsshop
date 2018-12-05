<template>
    <div>
        <h1>图片详情{{id}}</h1>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                id:this.$route.params.id
            }
        }
    }
</script>

<style scoped>

</style>