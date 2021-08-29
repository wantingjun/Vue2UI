import Toast from './toast'
export default {
    install(Vue,options){
        Vue.prototype.$toast = function(message){
            let Constructor = Vue.extend(Toast)
            let toast = new Constructor()
            toast.$slots.default = [message] //给toast插槽传东西
            toast.$mount()  // toast挂载一下
            document.body.appendChild(toast.$el) //把toast的元素放在body里

        }
    }
}
