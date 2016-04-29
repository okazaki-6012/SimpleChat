// サーバ作成
var express = require('express'), http = require('http');
var app = express(), server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(8080)
var connect_num = 0;
console.log("starting server");

// クライアント接続があると、以下の処理をさせる。
io.on('connection', function (socket) {
	// 接続通知をクライアントに送信
	connect_num++;
	io.emit("sendMessageToClient", {value:"入室しました。(現在："+connect_num+"人)"});
	console.log("connect");
	
	// クライアントからの受信イベントを設定
	socket.on("sendMessageToServer", function (data) {
		io.emit("sendMessageToClient", {value:data.value});
		console.log("data:" + data.value);
	});

	// 接続切れイベントを設定
	socket.on("disconnect", function () {
		connect_num--;
		io.emit("sendMessageToClient", {value:"退室しました。(現在："+connect_num+"人)"});
	});
});

// このファイルがある部分をカレントディレクトリとして
// publicフォルダに入ってるものを参照する
app.use(express.static('public'));
