开发应遵循的原则
1。 appRoute的render中，不能对Switch中的Route条目进行隐藏显示。只能在其中页面进行逻辑跳转
2。 index.html中尽可能的减少，乃至不要cdn链接引入。（注）
3。 node中开发loadable版本号尽可能的不升级。以免影响出错。其他照常升级。 命令为npm update
