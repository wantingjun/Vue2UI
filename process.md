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
### 加.stop阻止冒泡
### 点content不隐藏
* 在content上加.stop阻止冒泡，这样，点content就不会隐藏； 
* 只有点外面的时候才会隐藏