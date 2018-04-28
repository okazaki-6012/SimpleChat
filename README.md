## 前準備
- Node.js
- npm

...とかがが必要。( この辺は調べてわからなかったら聞いてくれ～ )

## 乱雑な説明
1. npm install <- このチャットに必要なモジュールのインストール
2. node app.js( chatのフォルダ内で打つ ) <- 起動

## 雑な概要
public/index.htmlの20行らへんが接続URL
> // 接続先の指定(192.168.8.89)  
> var url = "http://" + window.location.hostname + ":8080";

..みたいなところ。