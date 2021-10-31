# Cordova & React & cordova-plugin-health

## 必要なこと
1. Google Cloud Platform コンソールでプロジェクトを作成する。

https://console.cloud.google.com/cloud-resource-manager

1. googlefit apiを有効にする

https://console.cloud.google.com/apis

`APIとサービスの有効化` から'Fitness API'を検索して有効化する

1. 認証情報を作成

https://console.cloud.google.com/apis/credentials


`OAuth 2.0 クライアント ID`にAndoroid用のクライアントIDと、ウェブアプリケーション用のIDの2つを追加する。
画面上部`認証情報の作成`から2つ作成する。

*  cordovaのアプリはネイティブアプリのため`Andoroid用のクライアントID` のみの設定で問題ないと思ったが、API利用の認証を得るために、ウェブアプリケーション用のIDも必要なようです。




|  アプリケーション種類  |  android  |
| ---- | ---- |
|  パッケージ名  |  config.xml の widget の idから |
|  SHA-1のフィンガープリント  |  keytool -list -v -keystore  |

|  アプリケーション種類  |  ウェブアプリケーション  |
| ---- | ---- |
|  承認済みの JavaScript 生成元  |  設定不要 |
|  承認済みのリダイレクト URI  |  設定不要  |


## How to build & run

cordovaコマンドは、`config.xml`と`wwww`が存在しない場合、`Current working directory is not a Cordova-based project.`というエラーになるため、先に`www`フォルダを作ります。

1. `npm install`
1. `mkdir www`
1. `cordova prepare`
1. `npm run build`
1. `cordova run browser`


```
cordova plugin add cordova-plugin-health --variable HEALTH_READ_PERMISSION='App needs read access' --variable HEALTH_WRITE_PERMISSION='App needs write access'
```

`config.xml`に`<preference name="AndroidXEnabled" value="true" />`を追加



```
npm run build-inlinemap
cordova run --list
cordova run android --target=b764afd4
```
https://developers.google.com/fit/android/get-api-key
https://console.cloud.google.com/flows/enableapi?apiid=fitness

C:\Program Files (x86)\Java\jdk1.8.0_181\bin>keytool -list -v -keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android

keytool -genkey -v -keystore debug.keystore -alias androiddebugkey -keyalg RSA -validity 10000 -dname "CN=Android Debug,O=Android,C=US"
