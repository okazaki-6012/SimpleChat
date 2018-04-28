// サーバ作成
var express = require('express'), http = require('http');
var app = express(), server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(8080)
var connect_num = 0;
var chat_log = [];
console.log("starting server");

function SendMessage(socket, _message, _is_announce){
    is_announce = _is_announce == undefined? false : _is_announce
    var message = (is_announce? "System" : socket.id) + ": " + _message;
    chat_log.push(message);
    io.emit("sendMessageToClient", {value: message});
}

// クライアント接続があると、以下の処理をさせる。
io.on('connection', function (socket) {
    // 接続通知をクライアントに送信
    connect_num++;
    chat_log.forEach(log => {
	io.to(socket.id).emit("sendMessageToClient", {value: log});
    });
    SendMessage(socket, "入室しました。(現在："+connect_num+"人)", true);
    console.log("connect");
    
    // クライアントからの受信イベントを設定
    socket.on("sendMessageToServer", function (data) {
	SendMessage(socket, data.value);
	console.log("data:" + data.value);
    });

    // 接続切れイベントを設定
    socket.on("disconnect", function () {
	connect_num--;
	SendMessage(socket, "退室しました。(現在："+connect_num+"人)", true);
    });
});

// このファイルがある部分をカレントディレクトリとして
// publicフォルダに入ってるものを参照する
app.use(express.static('public'));
