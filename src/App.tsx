import React from 'react';
import logo from './logo.svg';
import './App.css';

const click = () => {
  //navigator.vibrate(1000);
  (navigator as any).health.isAvailable(successCallback, errorCallback);
  // alert('test');
};

var successCallback = function () {
  console.log('success');
  promptInstallFit();
};

var errorCallback = function (msg: any) {
  console.log(`error: ${msg}`);
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={click}>click</button>
      </header>
    </div>
  );
}
const promptInstallFit = () => {
  (navigator as any).health.promptInstallFit(
    function (data: any) {
      (navigator as any).health.requestAuthorization(
        [
          {
            read: ['steps'],
          },
        ],
        function (data: any) {
          (navigator as any).health.queryAggregated(
            {
              startDate: new Date(
                new Date().getTime() - 27 * 24 * 60 * 60 * 1000,
              ),
              endDate: new Date(),
              dataType: 'steps',
              bucket: 'day',
            },
            query1monthSuccessCallback,
            (err: any) => {},
          );
        },
        function (err: any) {
          // ons.notification.alert({
          //   title: 'エラー',
          //   message: '歩数を取得する権限が許可されていません。',
          //   callback: function (index) {},
          // });
          console.error(`歩数を取得する権限が許可されていません。${err}`);
        },
      );
    },
    function (err: any) {
      //alert("この端末に、GoogleFitがインストールされていません。歩数の連携を行うにはGoogleFitアプリをインストールしてください。"+err);
      // ons.notification.alert({
      //   title: 'エラー',
      //   message:
      //     'この端末に、GoogleFitがインストールされていません。歩数の連携を行うにはGoogleFitアプリをインストールしてください。',
      //   callback: function (index) {},
      // });
      console.error(
        'この端末に、GoogleFitがインストールされていません。歩数の連携を行うにはGoogleFitアプリをインストールしてください。',
      );
    },
  );
};

var query1monthSuccessCallback = function (msg3: any) {
  //alert("１ヶ月：" + JSON.stringify(msg3))

  var total = 0;
  for (var i = msg3.length - 1; i >= 0; i--) {
    //alert(i)
    if (msg3[i]) {
      if (msg3[i].value) {
        total = total + msg3[i].value;
      }
    }

    if (i === msg3.length - 1) {
      console.log(`stepToday ${total.toFixed(1)}`);
    } else if (i === msg3.length - 14) {
      console.log(`step2week ${(total / 14).toFixed(1)}`);
    }

    console.log(`step1month ${(total / msg3.length).toFixed(1)}`);
  }
};

export default App;
