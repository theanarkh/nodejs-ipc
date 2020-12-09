# nodejs-ipc
使用自定义的应用层协议，实现nodejs进程间通信
<br/>
本机进程间：<br/>
    windows下通过命名管道、非windows下通过unix域<br/>
远程进程间：<br/>
    tcp<br/>
支持在长连接中并行发送一个或多个请求和响应处理。通过end函数可以断开连接，nodejs默认会断开读写两端，如果一端调用end后，另一端还希望给另一端发送数据，则设置allowHalfOpen：true，使用例子见test目录。

