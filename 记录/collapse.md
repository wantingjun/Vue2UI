## collapse
### 基本样式
1. 不能用slot作为根组建
2. title的四个角要和外边框的border-radius相同，其他的自己定
```scss
.collapseItem {
  > .title {
    border: 1px solid $grey;
    margin-top: -1px;
    margin-left: -1px;
    margin-right: -1px;
    min-height: 32px;
    display: flex;
    align-items: center;
    padding: 0 8px;
  }
  &:first-child {
    > .title {
      border-top-left-radius: $border-radius;
      border-top-right-radius: $border-radius;
    }
  }
  &:last-child {
    > .title:last-child {
      border-bottom-left-radius: $border-radius;
      border-bottom-right-radius: $border-radius;
    }
  }
  > .content {
    padding: 8px;
  }
}
```
3. 控制content是否展开
* 通过open控制
```vue
 <div class="collapseItem">
    <div class="title" @click="open=!open">
      {{title}}
    </div>
    <div class="content" v-if="open">
      <slot></slot>
    </div>
  </div>
```
### 控制展开哪一项选项
1. 使用事件总线eventBus触发事件
2. 使用single设置是否设置单个打开
### 统一设置是否single
1. 想要控制是否要single打开，如果不single想打开多个的话，要用数组控制
2. selected需要是一个数组,用来控制选中的item
3. 一开始selected传给子组件，选中那些item
4. 做法：
* 在一个地方控制，不要在不同的组件加很多逻辑。可以在collapse组件做处理。
* collapse-item中发送增加还是减少事件到collapse组件
* collapse中监听是增加打开的item还是减少item。
* 如果增加的话，就增加selected的item的数组。然后告诉collapse-item最新的需要打开的item。
* 特点：单项数据流，更新只在一边做。由父组件触发打开哪个，子组件等父组件告诉他，应该展开哪个。
* single的话，selected只保留最新点击的那个item
```js
    mounted () {
    // 初始状态就通知把selected的item选中
      this.eventBus.$emit('update:selected', this.selected)
      // 监听打开
      this.eventBus.$on('update:addSelected', (name) => {
        let selectedCopy = JSON.parse(JSON.stringify(this.selected))
        if (this.single) {
          selectedCopy = [name]
        } else {
          selectedCopy.push(name)
        }
        // 通知item子组件，打开相应的selected item
        this.eventBus.$emit('update:selected', selectedCopy)
        // 通知父组件
          this.$emit('update:selected', selectedCopy)
      })
      //监听移除
      this.eventBus.$on('update:removeSelected', (name) => {
        let selectedCopy = JSON.parse(JSON.stringify(this.selected))
        let index = selectedCopy.indexOf(name)
        selectedCopy.splice(index, 1)
        // 通知item子组件，打开相应的name item
        this.eventBus.$emit('update:selected', selectedCopy)
        this.$emit('update:selected', selectedCopy)
      })
    }
```
