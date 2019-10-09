<template>
    <!-- 由于max是从productinfo.vue中的getProductinfo函数获取到的然后通过父组件向
    子组件传值从而取到max的值，但是此时的max为undefined原因是因为getProductinfo函数
    是异步获取函数的，当vue组件在解析的时候向子组件传递max的值时，getProductinfo函数还
    没请求到product.stock_quantity的值（product.stock_quantity => max）
    解决办法：通过watch属性来监听父组件传递过来的max值，不管watch触发几次，
    但是最后一次触发watch的值肯定是一个合法的值 -->
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
    <!-- 通过父子组件事件调用机制把父组件定义的事件传递给子组件
    但是我们需要知道子组件什么时候把count的值传递给父组件？
    分析：当我们点击选中数量的加号和减号时或者手动在方框内输入数量时都必须把选中的数量值传递给父组件
    无论给选中数量的 + - 或者手动输入绑定事件，会导致需要绑定三个事件，这样会麻烦许多，
    我们另开辟一个思路：即是无论是点击+ - 或者是手动输入时，
    方框内的数值都会发生改变（即@change事件），我们可以监测数值的改变传递赋值   -->
</template>
<script>
import mui from '../../lib/mui/js/mui.js'
export default {  
    mounted(){
        mui('.mui-numbox').numbox();
    },
    methods:{
        //当数值框内的数值发生改变时，立即通过父子组件的事件调用机制把子组件的值传递给父组件。
        countChanged(){
            //console.log(this.$refs.numbox.value)
            this.$emit('getcount',parseInt(this.$refs.numbox.value))
        }
    },
    props:["max"],
    watch:{
        max: function(newVal,oldVal){
            //mui的官方文档中有对应的api

            //发现了一个bug
            //在点击+ -时 快速双击它后 再点击+ - 会导致数值成2增加 即 1变为3 3 变为5
            mui(".mui-numbox").numbox().setOption('max',newVal);
        }
    }
}
</script>
<style lang="scss" scoped>
    
</style>