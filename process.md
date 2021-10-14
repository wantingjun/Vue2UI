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
### 问题
### 加stop阻止冒泡
### 点content不隐藏
* 在content上加.stop阻止冒泡，这样，点content就不会隐藏； 
* 只有点外面的时候才会隐藏