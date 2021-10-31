import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

type queryData = {
  endDate: Date;
  startDate: Date;
  unit: string;
  value: number;
};

const App = () => {
  const [stepResult, setStepElement] = useState<React.ReactElement>();

  const clickHandler = () => {
    (navigator as any).health.isAvailable(
      successAvailableCallback,
      (err: any) => {
        console.log(`isAvailable error: ${err}`);
      },
    );
  };

  const successAvailableCallback = (available: boolean) => {
    (navigator as any).promptInstallFit(requestAuthorization, (err: any) => {
      console.error(`promptInstallFit error: ${err}`);
    });
  };

  const requestAuthorization = () => {
    (navigator as any).health.requestAuthorization(
      [
        {
          read: ['steps'],
        },
      ],
      queryAggregated,
      (err: any) => {
        console.error(`requestAuthorization error: ${err}`);
      },
    );
  };

  const queryAggregated = () => {
    (navigator as any).health.queryAggregated(
      {
        startDate: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
        endDate: new Date(),
        dataType: 'steps',
        bucket: 'day',
      },
      queryAggregatedSuccessCallback,
      (err: any) => {
        console.error(`queryAggregated error: ${err}`);
      },
    );
  };

  const queryAggregatedSuccessCallback = (data: queryData[]) => {
    const totalStep = data.reduce((prev, cur) => prev + cur.value, 0);
    console.log(`today step count ${data.slice(-1)[0]}`);
    console.log(`1 month total  ${totalStep.toFixed(1)}`);
    console.log(`step per day ${(totalStep / data.length).toFixed(1)}`);

    const result = (
      <div>
        <div>{`today step count: ${data.slice(-1)[0].value}`}</div>
        <div>{`1 month total count: ${totalStep.toFixed(1)}`}</div>
      </div>
    );
    setStepElement(result);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={clickHandler}>get step count from google fit</button>
        <div>{stepResult}</div>
      </header>
    </div>
  );
};

export default App;
