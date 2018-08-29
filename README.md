# Myportal
##Description
动态门户网站

目前项目整体框架构建好了,实现了栏目、首页展区、文章等其他基本功能,完成了当在后台管理中设置数据的显示,而在前台页面中各组件间样式自动变化，从而动态化。

项目是用[Angular CLI](https://github.com/angular/angular-cli) version 1.7.3创建的。

[项目组织结构](https://www.processon.com/view/link/5b84a4b7e4b075b9fe2a2380)
## The package
**angular cli**自动依赖的包我就不介绍了，这里讲下我手动添加的第三方包
- [Angular Materrial 5.2](https://material.angular.io/)：angular ui库，本项目的后台管理采用了该库，官网最近抽风了访问不了。
- [Angular Flex-Layout](https://github.com/angular/flex-layout) : angular 弹性布局库，前台首页展区部分的动态化就利用该库实现
- [Froala](https://www.froala.com/wysiwyg-editor): 国外一款富文本编辑库，比什么UEditor强大一百倍
- [angular-fontawesome](https://github.com/FortAwesome/angular-fontawesome): 开发angular 必备的icon库

## Install
````
git clone https://github.com/Cloudintheking/myportal.git yourdir
cd youdir
npm i
````

## Serve
run  `ng serve -e test` //启动测试模式

run  `ng serve -e prod` //启动生产模式

then open [http://localhost:4200](http://localhost:4200)

PS: 运行该命令前,请先克隆[myportal服务端项目](https://github.com/Cloudintheking/myportal_server)并启动后端服务

## Build

run ng build -e test //生成测试模式下站点文件

run ng build -e prod //生成生产模式下站点文件


## Further help
如果安装或是启动过程中遇到什么问题，欢迎到issue里留言。最后,如果你觉着项目写的还可以,记得star额~
