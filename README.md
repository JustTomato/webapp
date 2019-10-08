# 这是使用vue和webpack结合的webapp项目
+ 这是修改项目说明文件来测试push操作
+ 第二次测试


## 制作app组件
 1.完成Header区域，使用Mint-ui组件中的Header组件
 2.制作地步Tabbar区域，使用mui的tapbar样式
 3.要在中间区域放置一个router-view的组件
 4.在src目录下新建一个components文件夹用来存放路由组件
    + 在components文件内新建一个tapbar文件夹
    + 在tabbar文件夹里分别新建四个对应按钮的.vue文件



## 制作Photo.vue导航条滑动的坑
1.关于webpack4取消严格模式的插件
   + 安装 @babel/plugin-transform-modules-commonjs @babel/plugin-transform-strict-mode
   ```
   cnpm i @babel/plugin-transform-modules-commonjs @babel/plugin-transform-strict-mode -D
   ```
   + 在.babelrc文件中增加
   ```
   ["@babel/plugin-transform-modules-commonjs", { "strictMode": false }]
   ```
2.以上操作还是出现mint-ui报错 Uncaught ReferenceError: _Header is not defined 
   + mint-ui按需引入组件报错，说没有定义
   + 解决办法：全局引入
   ```
   import MintUI from 'mint-ui'
   Vue.use(MintUI)
   ```
## 制作图片列表区域
   1.图片列表需要进行懒加载