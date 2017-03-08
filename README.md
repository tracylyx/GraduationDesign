stop
### 毕业设计——个人博客设计与实现
> 使用node+express搭建博客框架，使用ejs模板进行页面渲染，mongoDB作为数据库.tracy blog

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
- 添加标签，还未添加标签页。目前存在问题
- <del>翻页按钮样式显示问题</del>
- <del>编辑和删除前边的小logo要处理</del>
- <del>返回顶部的样式</del>
- <del>修改搜索框的大小</del>
- <del>首页or文章内容只显示部分，多出部分省略改成read me(临时解决)</del>
- <del>search 查找的结果要是没有匹配对象，要有个提示。类似这样“为找到匹配内容”</del>
- <del>右边最新文章前五篇要从数据库中提出来</del>

#### 3.持续的需求
- 评论
- 滚动轴，自己改样式
- 缺少404页面的静态样式资源
- 添加标签和标签页
- <del>登录界面美化</del>
- <del>搜索框增加动画效果</del>
- <del>上传图片样式问题的</del>
- <del>响应式</del>
- <del>node 高亮代码插件——使用markdown来编辑文章，可以暂时解决此问题</del>
- 右边最新文章前五篇要从数据库中提出来(已处理但存在问题)
- 关于，四张图片改成自己的社交网站的链接，并且加上一些自己的经历
- 更换背景
- 每篇文章的图片展示是不一样的
- icon的像素不够，需要重新找过

#### 4.matchMedia
- 媒体查询

#### 5.其他
- http://qywx.gitcafe.io/2014/11/14/%E5%BE%AE%E4%BF%A1webview%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E9%97%AE%E9%A2%98/
- https://github.com/xiangming/landscape-plus

#### 6.关于论文
- 论文初稿检查时间：4-10

#### 7.关于登录
- 背景颜色： #efefef


#### 8.login.ejs

```
<form class="form-horizontal" method="post">
  <div class="form-group">
    <label for="inputEmail3" class="col-sm-3 control-label">用户名</label>
    <div class="col-sm-9">
      <input type="text" name="name" class="form-control" id="inputEmail3" placeholder="用户名">
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword3" class="col-sm-3 control-label">密码</label>
    <div class="col-sm-9">
      <input type="password" name="password" class="form-control" id="inputPassword3" placeholder="密码">
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <div class="checkbox">
        <label>
          <input type="checkbox"> 记住我
        </label>
      </div>
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-default">登录</button>
    </div>
  </div>
</form>
```

