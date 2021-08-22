<template>
    <div class="row" :style="rowStyle" :class="rowClass">
        <slot></slot>
    </div>
</template>
<script>
    export default{
        name:"wanRow",
        props:{
            gutter:{
                type:[Number, String]
            },
            align:{
                type:String,
                validator(value){
                    return ['left','right','center'].includes(value)
                }
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
            },
            rowClass() {
                let {align} = this
                return [align && `align-${align}`]
            }
        }


    }
</script>
<style scoped lang="scss">
    .row{
        display: flex;
        flex-wrap: wrap;
        &.align-right{
            justify-content: flex-end;
        }
        &.align-left{
            justify-content: flex-start;
        }
        &.align-center{
            justify-content: center;
        }
    }
</style>
