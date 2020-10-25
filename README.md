# nodejs-ipc
使用自定义的应用层协议，实现nodejs进程间通信
<br/>
本机进程间：<br/>
    windows下通过tcp、非windows下通过unix域<br/>
远程进程间：<br/>
    tcp<br/>
支持在长连接中并行发送多个请求和响应处理。使用例子见test目录
