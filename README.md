# Cordova & React & cordova-plugin-health


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
