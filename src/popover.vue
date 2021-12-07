<template>
  <div class="popover" @click.stop="onClick">
    <div class="content-wrapper" ref="contentWrapper" v-if="visible">
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
   // console.log(this.$refs.triggerWrapper)
  },
  methods:{
    onClick(event){
      console.log(event.target)
      if(this.$refs.triggerWrapper.contains(event.target)){
        console.log("下面")
        this.visible=!this.visible
        if(this.visible===true){
          this.$nextTick(()=>{
            document.body.appendChild(this.$refs.contentWrapper) // 移走这个元素，增加到document里
            let {width,height,top,left} = this.$refs.triggerWrapper.getBoundingClientRect()// 方法返回元素的大小及其相对于视口的位置
            this.$refs.contentWrapper.style.left = left+window.scrollX+'px'
            this.$refs.contentWrapper.style.top = top+window.scrollY+'px'
            let eventHandler =(event)=>{
              console.log(event.target)
              this.visible =false
              document.removeEventListener('click',eventHandler) // 移除x
            }
            document.addEventListener("click",eventHandler) // 解决this错误的问题
          })
        } else{
          console.log('组件自身隐藏 popover')
        }
      } else{
        console.log("上面")
      }
      // this.visible=!this.visible
      // console.log('切换visible')

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