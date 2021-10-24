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

https://developers.google.com/fit/android/get-api-key


549754340140-42ch893uf5q5f7h8atcbg61uv39khnr6.apps.googleusercontent.com
