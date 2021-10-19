<template>
  <div class="popover" @click.stop="xxx">
    <div class="content-wrapper" ref="contentWrapper" v-if="visible"  @click.stop>
      <slot name="content"></slot>
    </div>
    <span ref="triggerWrapper">
       <slot ></slot>
    </span>

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
  mounted(){
    console.log(this.$refs.triggerWrapper)
  },
  methods:{
    xxx(){
      this.visible=!this.visible
      console.log('切换visible')
      if(this.visible===true){
        this.$nextTick(()=>{
          document.body.appendChild(this.$refs.contentWrapper) // 移走这个元素，增加到document里
          let {width,height,top,left} = this.$refs.triggerWrapper.getBoundingClientRect()// 方法返回元素的大小及其相对于视口的位置
          console.log(width,height,top,left)
          this.$refs.contentWrapper.style.left = left+'px'
          this.$refs.contentWrapper.style.top = top+'px'
          console.log('新增监听器 eventHandler')
          let eventHandler =()=>{
            console.log('点击关闭')
            this.visible =false
            console.log('document隐藏popover')
            document.removeEventListener('click',eventHandler) // 移除x
            console.log('删除监听器')
          }
          document.addEventListener("click",eventHandler) // 解决this错误的问题
        })
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

}
.content-wrapper{
  position:absolute;
  border:1px solid red;
  box-shadow: 0 0 3px rgba(0,0,0,0.5);
  transform: translateY(-100%);
}

</style>