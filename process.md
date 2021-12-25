# popover
## 需求
1. 点击之后出现div
2. div里有一些复杂的内容
## 想法
```html
    <div v-if="x" class="xxx"></div>
    <button @click="x=true">点我</button>
```
* 重点在于如何让这个div出现在button的上方
## 问题：
1. 给slot上加不了@click和class，加了也无效
## 实现点一下有content，点一下没有
* 
```css
.popover{
  display:inline-block;
  vertical-align: top;
  position:relative;
  .content-wrapper{
    position:absolute;
    bottom:100%;
    left:0;
  }
}
```
## 如何监听点击外面空白部分，content消失
1. 直接监听
```
    xxx(){
      this.visible=!this.visible
      console.log('切换visible')
      if(this.visible===true){
        document.body.addEventListener("click",()=>{
          console.log('点击关闭')
          this.visible =false
        })
      }
    }
```
由于冒泡机制，所以popover不会弹出，点按钮相当于两个都出发了
2. 使用$nextTick可以解决上面的问题
3. 发现电机外面有时候好用有时候不好用，发现是因为监听的body，但是body有时候会很矮。那就不监听body，直接监听document
4. 发现多次点击切换，第2次之后就失效了。同时看log，会发现随着点击次数的增加，监听器次数也增加。
* 因为每次点击都会在document上增加一个click监听，产生了多次监听
* 解决方法：多余的监听应该被移除掉。每次新增的时候，把之前增加的移除
* 为了移除点击事件，需要removeListener，给定绑定的事件一个名字，所以需要把箭头函数改为function，这会导致`this`错误，所以需要在外面绑定一个this
``` js
    xxx(){
      this.visible=!this.visible
      console.log('切换visible')
      if(this.visible===true){
        this.$nextTick(()=>{
          console.log('新增监听器')
          document.addEventListener("click",function x(){ // remove事件需要有事件的名字
            console.log('点击关闭')
            this.visible =false
            document.removeEventListener('click',x) // 移除x
          }.bind(this)) // 解决this错误的问题
        })

      }
    }
```
5. 发现还有问题，还是不对
* 因为绑定的函数是x().bind(this),但是删除的是x()
* 方法： 把x单独取出来，在前面定义
* 
```js
    xxx(){
      this.visible=!this.visible
      console.log('切换visible')
      if(this.visible===true){
        setTimeout(()=>{
          console.log('新增监听器 eventHandler')
          let eventHandler =()=>{
            console.log('点击关闭')
            this.visible =false
            document.removeEventListener('click',eventHandler) // 移除x
            console.log('删除监听器')
          }
          document.addEventListener("click",eventHandler) // 解决this错误的问题
        },1000)

      }
    }
```
6. 阻止冒泡：发现content隐藏了两遍
* 由于冒泡，组件和document都隐藏了popover。当点击按钮的时候，首先会触发按钮（组件自身的事件），然后document也会触发。
* 所以增加.stop阻止冒泡
* 点content也不隐藏，content也加阻止冒泡
```html
  <div class="popover" @click.stop="xxx">
    <div class="content-wrapper"  v-if="visible"  @click.stop>
        <slot name="content"></slot>
    </div>
    <slot ></slot>
</div>
```
### 问题
* 在组件里增加.stop虽然可以阻止冒泡，但是同时也会打破用户的点击事件，比如用户调用组件时，在外面增加了一个点击事件，就不会被触发
* 所以在组件上增加.stop的方法还是不对

### content可能被挡住看不见的问题
* 因为`content-wrapper`在里面，被hidden了，所以肯定看不见。
1. 如果使用ref加载content-wrapper上，一开始看不到ref。由于v-if一开始是false，所以看不到，可以改用`v-show`
2. 移动元素到document，这时只影响元素的位置，不影响之前做的功能。这样他就不会被上面的div遮住
* 比如点击按钮、content和document的消失与出现。
3. 更改刚才移动位置的content-wrapper
* 由于slot不支持ref，可以在<slot>外面加一层<span>
4. getBoundingClientRect()方法返回元素的大小及其相对于视口的位置
5. css加了scoped的话，可能会无效，因为scoped限制，只作用于当前组件和.popover里面，所以要把conytent-wrappaer移出去
6. 总结：
* 先把content的div移动到body里
* 获取按钮的位置
* 把body中的content的div放到按钮的上面去
### 还存在的问题：
* 如果在当前div上面再加一个div
```html
<div class="test" style="border:1px solid blue;height:1000px;"></div>
<div id="app" style="padding-top:100px;padding-left: 100px;border:1px solid red"></div>
```
* 这个时候点击popover的按钮。上面的提示框会出现在很上方。
1. 因为getBoundingClientRect是相对于视口位置的，但是绝对定位是相对于body元素的
2. 解决方法：增加scrollY和scrollX的距离
 ![IaTBB8.png](https://z3.ax1x.com/2021/11/10/IaTBB8.png)
3. 有的浏览器会有兼容性的问题。搜索“元素相对于整个页面的top或者left”
```html
   this.$refs.contentWrapper.style.left = left+window.scrollX+'px'
   this.$refs.contentWrapper.style.top = top+window.scrollY+'px'
```
### 当click popover的时候判断用户点击的是按钮还是弹出层
如果点击按钮，就切换弹出层是否现实，如果点击的是弹出层，就什么都不做，如果点外面，也关闭弹出框
#### 问题：怎判断用户点击的是哪里？
1. 点击的时候会传入一个event参数，有一个target参数
```
this.$refs.triggerWrapper.contains(event.target)
```
通过这个判断，是否在哪一层
2.  不能用阻止冒泡的方式，
 ```
listenToDocument(){
      let eventHandler =(e)=>{
        console.log(e.target)
        if(this.$refs.contentWrapper.contains(e.target)){ // 如果在contentWrapper（弹出框里点击），就什么也不做
          console.log("contentWrapper-弹出层")
        } else{ // 如果点击的不是内容区域关闭
          this.visible =false
          document.removeEventListener('click',eventHandler) // 移除x
          console.log("关闭")
        }
      }
      document.addEventListener("click",eventHandler) // 解决this错误的问题
    },
```
#### 总结问题
1. overflow：hidden -》body.appendChild
2. 关闭重复->分开，document只管外面，popover只管里面
3. 忘了取消监听document -》 收拢close
### 样式问题
* 加一个三角形
1。 做一个三角形
```css
& ::before{
    content:"";
    display:block;
    border:10px solid red;
    border-top-color:black;
    border-bottom-color:transparent;
    border-left-color:transparent;
    border-right-color:transparent;
    width:0;
    height:0;
    position:absolute;
    top:100%;
    left:10px;
  }
  & ::after{
    content:"";
    display:block;
    border:10px solid red;
    border-top-color:white;
    border-bottom-color:transparent;
    border-left-color:transparent;
    border-right-color:transparent;
    width:0;
    height:0;
    position:absolute;
    top:calc(100% - 1px);
    left:10px;
  }
```
2. 设置一个默认最大宽度
* 20em
* 自动换行
