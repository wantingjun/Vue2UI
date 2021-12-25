<template>
  <div class="popover" @click="onClick" ref ="popover">
    <div class="content-wrapper" ref="contentWrapper" v-if="visible">
      <slot name="content"></slot>
    </div>
    <span ref="triggerWrapper" style="display:inline-block">
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
    positionContent(){ // 定位内容
      document.body.appendChild(this.$refs.contentWrapper) // 移走这个元素，增加到document里
      let {width,height,top,left} = this.$refs.triggerWrapper.getBoundingClientRect()// 方法返回元素的大小及其相对于视口的位置
      this.$refs.contentWrapper.style.left = left+window.scrollX+'px'
      this.$refs.contentWrapper.style.top = top+window.scrollY+'px'
    },
    onClickDocument(e){ //处理document的点击事件
        if(this.$refs.popover &&
           (this.$refs.popover ===e.target || this.$refs.popover.contains(e.target))){ // 如果在contentWrapper（弹出框里点击），就什么也不做
          console.log("contentWrapper-弹出层")
        } // 如果点击的不是内容区域，关闭popover
      if(this.$refs.contentWrapper &&
              (this.$refs.contentWrapper ===e.target || this.$refs.contentWrapper.contains(e.target))){
      return
      }
         this.close()
    },
    open(){ // 开启弹窗
      this.visible = true
      this.$nextTick(()=>{
        this.positionContent() // 调整弹窗位置
        document.addEventListener("click",this.onClickDocument) // 解决this错误的问题
      })
    },
    close(){
      this.visible =false
      document.removeEventListener("click",this.onClickDocument) // 移除document的监听
    },
    onClick(event){
      if(this.$refs.triggerWrapper.contains(event.target)){ // 如果点击的是按钮，就切换
        if(this.visible===true){
          this.close() // 关闭popover
        } else{
          this.open() // 开启popover
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  $border-color:#999;
  $border-radius: 4px;
.popover{
  display:inline-block;
  vertical-align: top;
  position:relative;
}
.content-wrapper{
  position:absolute;
  border:1px solid $border-color;
  border-radius: $border-radius;
  filter:drop-shadow(0 0 1px rgba(0,0,0,0.5));
  background:white;
  transform: translateY(-100%);
  margin-top:-10px;
  padding: .5em 1em;
  max-width:20em;// 最大宽度
  word-break:break-all; //自动换行
  & ::before, & ::after{
    content:"";
    display:block;
    border:10px solid transparent;
    width:0;
    height:0;
    position:absolute;
    left:10px;
  }
  & ::before{
    border-top-color:black;
    top:100%;
  }
  & ::after{
    border-top-color:white;
    top:calc(100% - 1px);
  }
}

</style>
