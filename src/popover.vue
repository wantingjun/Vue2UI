<template>
  <div class="popover" @click="onClick" ref ="popover">
    <div class="content-wrapper" ref="contentWrapper" :class="`position-${position}`" v-if="visible">
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
  props:{
    position:{
      type:String,
      default:'top',
      validator(value){
        return ['top','bottom','left','right'].indexOf(value) >=0
      }
    }
  },
  mounted(){
   // console.log(this.$refs.triggerWrapper)
  },
  methods:{
    positionContent(){ // 定位内容
      const {contentWrapper,triggerWrapper} = this.$refs
      document.body.appendChild(contentWrapper) // 移走这个元素，增加到document里
      let {width,height,top,left} = triggerWrapper.getBoundingClientRect()// 方法返回元素的大小及其相对于视口的位置 , 按钮的高度宽度，顶部左侧的距离
      if(this.position == 'top'){
        contentWrapper.style.left = left+window.scrollX+'px'
        contentWrapper.style.top = top+window.scrollY+'px'
      } else if(this.position == 'bottom'){
        contentWrapper.style.left = left+window.scrollX+'px'
        contentWrapper.style.top = top+height+window.scrollY+'px'
      } else if(this.position == 'left'){
       contentWrapper.style.left = left+window.scrollX+'px'
        let {height:height2} = contentWrapper.getBoundingClientRect() // 弹出按钮的高度
        contentWrapper.style.top = top + window.scrollY + (height - height2)/2 +'px' // 按钮的高度和弹出框的高度差除2
      } else if(this.position == 'right'){
        contentWrapper.style.left = left+window.scrollX+width+'px'
        contentWrapper.style.top = top+window.scrollY+'px'
        let {height:height2} = contentWrapper.getBoundingClientRect() // 弹出按钮的高度
        contentWrapper.style.top = top + window.scrollY + (height - height2)/2 +'px' // 按钮的高度和弹出框的高度差除2

      }

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
  }
  &.position-top{
    transform: translateY(-100%);
    margin-top:-10px;
    & ::before, & ::after{
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
  &.position-bottom{
    margin-top:10px;
    & ::before, & ::after{
      left:10px;
    }
    & ::before{
      border-bottom-color:black;
      bottom:100%;
    }
    & ::after{
      border-bottom-color:white;
      bottom:calc(100% - 1px);
    }
  }
  &.position-left{
    transform: translateX(-100%);
    margin-left:-10px;
    & ::before, & ::after{
      top:50%;
      transform :translateY(-50%);
    }
    & ::before{
      border-left-color:black;
      left:100%;
    }
    & ::after{
      border-left-color:white;
      left:calc(100% - 1px);
    }
  }
  &.position-right{
    margin-left:10px;
    & ::before, & ::after{
      top:50%;
      transform :translateY(-50%);
    }
    & ::before{
      border-right-color:black;
      right:100%;
    }
    & ::after{
      border-right-color:white;
      right:calc(100% - 1px);
    }
  }
}

</style>
