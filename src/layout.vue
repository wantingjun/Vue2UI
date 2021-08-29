<template>
    <div  class = "layout" :class="layoutClass">
        <slot></slot>
    </div>
</template>
<script>
    export default{
        name:"gLayout",
        data(){
            return {
                layoutClass:{
                    hasSider:false
                }
            }
        },
        mounted(){
            console.log(this.$children)
            this.$children.forEach(vm=>{
                if(vm.$options.name === 'gSider'){
                    this.layoutClass.hasSider = true
                }
            })
        }

    }
</script>
<style lang="scss" scoped>
    .layout{
        display:flex;
        flex-direction: column;
        border:1px solid red;
        &.hasSider{
            flex-direction:row;
        }

    }
</style>
