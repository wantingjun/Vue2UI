import Toast from './toast'
export default {
    install(Vue,options){
        Vue.prototype.$toast = function(message){
            let Constructor = Vue.extend(Toast) //创建toast
            let toast = new Constructor({ //传props到toast
                propsData:{
                    closeButton:{
                        text:'知道了',
                        callback(){
                            console.log('用户知道了')
                        }
                    }
                }
            })
            toast.$slots.default = [message] //给toast插槽传东西
            toast.$mount()  // toast挂载一下
            document.body.appendChild(toast.$el) //把toast的元素放在body里

        }
    }
}
