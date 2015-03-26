### 毕业设计——个人博客设计与实现
> 使用node+express搭建博客框架，使用ejs模板进行页面渲染，mongoDB作为数据库

#### 1.目前实现的功能
- 登录
- 登出
- 写文章
- 导航点击跳转
- 文章跳详情页
- 对文章进行编辑
- 删除不想要的文章
- 翻页功能（bug）
- 搜索功能（效果）
- 图片上传功能
- 添加文章归档

#### 2.bug
- 翻页，还不是很完善,按数字翻页有bug
- 修改搜索框的大小
- 缺少404页面的静态样式资源
- 首页文章内容只显示部分，多出部分省略改成read more
- search 查找的结果要是没有匹配对象，要有个提示。类似这样“为找到匹配内容”
- 添加标签，还未添加标签页。目前存在问题
- 右边最新文章前五篇要从数据库中提出来

#### 3.持续的需求
- 搜索框增加动画效果
- 添加标签和标签页
- node 高亮代码插件
- 响应式

#### 4.matchMedia
- 媒体查询

#### 5.其他
- http://qywx.gitcafe.io/2014/11/14/%E5%BE%AE%E4%BF%A1webview%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E9%97%AE%E9%A2%98/
- https://github.com/xiangming/landscape-plus