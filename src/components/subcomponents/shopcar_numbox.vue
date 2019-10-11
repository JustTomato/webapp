<template>
    <div class="mui-numbox" data-numbox-min='1' style="height:25px;">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref="numbox" readonly/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
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
            console.log(this.$refs.numbox.value)
            //每当用户修改购物车页面商品数量时，我们要商品数量同步到购物车上去
            this.$store.commit('updateProductInfo',{
                id: this.productid, 
                count: this.$refs.numbox.value
                })
        }
    },
    props:['initcount','productid']
}
</script>
<style lang="scss" scoped>
    
</style>