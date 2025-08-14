# 为个人网站准备的导航栏复用，测试项目

## How to use 如何使用

- 获取：

#### /final/navbar.html  可以直接修改内容
#### /final/navbar.css   可以直接修改样式
#### /final/navbar.js    可以直接修改导航栏逻辑

#### /final/load-navbar.js    用于导入navbar.html

- 按照自己需求更改内容和样式

- 然后在你的新页面中：

```html
<link rel="stylesheet" href="navbar.css"> 用于为引入的navbar提供css

<script src="load-navbar.js"></script> 用于引入navbar的html代码

<script src="navbar.js"></script> 用于引入navbar所需的逻辑
```

