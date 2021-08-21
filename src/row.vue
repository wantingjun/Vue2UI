<template>
    <div class="row" :style="rowStyle">
        <slot></slot>
    </div>
</template>
<script>
    export default{
        name:"wanRow",
        props:{
            gutter:{
                type:[Number, String]
            }
        },
        created(){
           // console.log(this.$children) //没有儿子
        },
        mounted(){
            console.log(this.$children)
          this.$children.forEach(each=>{
              each.gutter = this.gutter
          })
        },
        computed:{
            rowStyle(){
                    let {gutter} = this
                    return {marginLeft: -gutter/2 +'px', marginRight: -gutter/2+'px'}
            }
        }


    }
</script>
<style scoped lang="scss">
    .row{
        display: flex;
    }
</style>
