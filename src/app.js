import Vue from 'vue'
import Button from './button'
import Icon from './icon'
import ButtonGroup from './button-group'
import Input from './input'
import Row from './row'
import Col from './col'
import Header from './header'
import Content from './content'
import Footer from './footer'
import Layout from './layout'
import Sider from './sider'
import Toast from './toast'
import plugin from './plugin'
import popover from './popover'
import Collapse from './collapse'
import CollapseItem from './collapse-item'


Vue.component('g-button', Button)
Vue.component('g-icon', Icon)
Vue.component('g-button-group', ButtonGroup)
Vue.component('g-input', Input)
Vue.component('g-row', Row)
Vue.component('g-col', Col)
Vue.component('g-layout', Layout)
Vue.component('g-footer', Footer)
Vue.component('g-sider', Sider)
Vue.component('g-header', Header)
Vue.component('g-content', Content)
Vue.component('g-toast', Toast)
Vue.component('g-popover', popover)
Vue.component('g-collapse', Collapse)
Vue.component('g-collapse-item', CollapseItem)

Vue.use(plugin)

new Vue({
  el: '#app',
  data:{
    loading1:false,
    message: 'hi',
    selectedTab: ['2','1']
  },
  created(){
    // setTimeout(()=>{
    //   let event = new Event('change');
    //   let inputElement = this.$el.querySelector('input')
    //   inputElement.dispatchEvent(event)
    //   console.log('hi')
    // },3000)
    // this.$toast('我是 message')

  },

  methods: {
    inputChange (e) {
      console.log(e)
    },
    showToast(toast){
      this.$toast('我是 message')
    }
  }
})
// import chai from 'chai'
// import spies from 'chai-spies'
// chai.use(spies)
//
// const expect = chai.expect
// // 单元测试
// { // 测icon
//   const Constructor = Vue.extend(Button)
//   const vm = new Constructor({
//     propsData: {
//       icon: 'settings'
//     }
//   })
//   vm.$mount() // mount到内存上
//   let useElement = vm.$el.querySelector('use')
//   let href = useElement.getAttribute('xlink:href')
//   expect(href).to.eq('#i-settings') // 期待href等于isettings。断言，如果主管判断和事实是一样的，就说明代码没问题
//   vm.$el.remove()
//   vm.$destroy()
// }
// { //测loading
//   const Constructor = Vue.extend(Button)
//   const vm = new Constructor({ // 传值进去
//     propsData: {
//       icon: 'settings',
//       loading: true
//     }
//   })
//   vm.$mount()
//   let useElement = vm.$el.querySelector('use') // 找到svg
//   let href = useElement.getAttribute('xlink:href')
//   expect(href).to.eq('#i-loading') // 如果在loading，那么setting按钮应该看不见
//   vm.$el.remove()
//   vm.$destroy()
// }
// { //测order
//   const div = document.createElement('div') // 创建div
//   document.body.appendChild(div) // 把div放到body里面
//   const Constructor = Vue.extend(Button)
//   const vm = new Constructor({
//     propsData: {
//       icon: 'settings'
//     }
//   })
//   vm.$mount(div)
//   let svg = vm.$el.querySelector('svg') // 找到svg
//   let {order} = window.getComputedStyle(svg) // 获取svg的order
//   expect(order).to.eq('1') // 1是字符串
//   vm.$el.remove() // 从页面删掉
//   vm.$destroy() // 把元素删除
// }
// {
//   const div = document.createElement('div')
//   document.body.appendChild(div)
//   const Constructor = Vue.extend(Button)
//   const vm = new Constructor({
//     propsData: {
//       icon: 'settings',
//       iconPosition: 'right'
//     }
//   })
//   vm.$mount(div)
//   let svg = vm.$el.querySelector('svg')
//   let {order} = window.getComputedStyle(svg)
//   expect(order).to.eq('2')
//   vm.$el.remove()
//   vm.$destroy()
// }
// {
//   // mock
//   const Constructor = Vue.extend(Button)
//   const vm = new Constructor({
//     propsData: {
//       icon: 'settings',
//     }
//   })
//   vm.$mount()
//   let spy = chai.spy(function(){})
//
//   vm.$on('click', spy)
//   // 希望这个函数被执行
//   let button = vm.$el
//   button.click()
//   expect(spy).to.have.been.called()
// }
