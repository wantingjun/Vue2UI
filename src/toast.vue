<template>
    <div class="toast">
<slot></slot>
        <div class="line"></div>
        <span v-if="closeButton" class="close" @click="onClickClose">
            {{closeButton.text}}
        </span>
    </div>
</template>

<script>

    export default {
        name: "gtoast",
        props:{
            autoClose:{
                type:Boolean,
                default:true
            },
            autoCloseDelay:{
                type:Number,
                default:50
            },
            closeButton:{
                type: Object,
                default:()=>{
                    return {
                        text:'关闭',
                        callback:()=>{
                            toast.close()
                        }
                }
                }
            }
        },
        mounted(){
            if(this.autoClose){
                setTimeout(()=>{
                    this.close() // 调用remove方法
                }, this.autoCloseDelay * 1000)
            }
        },
        methods:{
            close(){ // 关闭自己
                this.$el.remove() // 移除自己
                this.$destroy() // 让组件死掉
            },
            onClickClose(){
                this.close()
                if(this.closeButton && typeof this.closeButton.callback === 'function'){
                    this.closeButton.callback()
                }

            }
        }
    }
</script>

<style scoped lang="scss">
    $font-size: 14px;
    $toast-height: 40px;
    $toast-bg: rgba(0, 0, 0, 0.75);
.toast{
    position:fixed;
    top:0;
    left:50%;
    transform: translateX(-50%);
    font-size: 14px;
    line-height:$font-size;
    height:$toast-height;
    display:flex;
    align-items:center;
    background: $toast-bg;
    color:white;
    border-radius: 4px;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.50);
    padding: 0 16px;

}
    .close{
        padding-left:16px;
    }
    .line{
        height:100%;
        border-left:1px solid #666;
        margin-left:10px;
    }
</style>
