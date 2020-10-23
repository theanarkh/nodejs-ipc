# tiny-application-layer-protocol
实现自己的应用层协议和解析器，可以使用于tcp，udp、unix域之上。
# 1 导出的功能
```
module.exports = {
    FSM,
    packet,
    seq,// 生成数据包的序列号函数
};
```
FSM
```
解析协议的状态机
const fsm = new FSM({cb: function() {}})
cb是解析到一个数据包的时候执行的回调，把字节流交给fsm.run函数处理即可
```
packet
```
封包函数packet(string, seq);seq可以不传，默认生成
```
seq
```
生成数据包的序列号，用于关联请求和响应
```
# 2 使用(见test目录)
## 2.1 启动服务器
```
node server.js
```
## 2.2 启动客户端（用例1）
```
node client.js
```
## 2.3 启动客户端（用例2）
```
node delayClient.js
```