<template>
  <div class="popover" @click.stop="xxx">
    <div class="content-wrapper"  v-if="visible"  @click.stop>
      <slot name="content"></slot>
    </div>
    <slot ></slot>
  </div>
</template>

<script>
export default {
  name: "popover",
  data(){
    return {
      visible:false
    }
  },
  methods:{
    xxx(){
      this.visible=!this.visible
      console.log('切换visible')
      if(this.visible===true){
        setTimeout(()=>{
          console.log('新增监听器 eventHandler')
          let eventHandler =()=>{
            console.log('点击关闭')
            this.visible =false
            console.log('document隐藏popover')
            document.removeEventListener('click',eventHandler) // 移除x
            console.log('删除监听器')
          }
          document.addEventListener("click",eventHandler) // 解决this错误的问题
        },1000)

      } else{
        console.log('组件自身隐藏 popover')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.popover{
  display:inline-block;
  vertical-align: top;
  position:relative;
  .content-wrapper{
    position:absolute;
    bottom:100%;//bottom:100% 让他出现在顶部
    left:0;
    border:1px solid red;
    box-shadow: 0 0 3px rgba(0,0,0,0.5);
  }
}

</style>