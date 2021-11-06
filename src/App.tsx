import React, { ChangeEvent, useEffect, useState } from 'react';
import { Bar, Chart } from 'react-chartjs-2';
import './App.scss';
import useFitStepData from './hooks/use-fit-api';

const App = () => {
  const [dayRange, setDayRange] = useState(6);
  const { queryData } = useFitStepData(dayRange);
  const [stepResult, setStepElement] = useState<React.ReactElement>();

  const df = new Intl.DateTimeFormat('ja-JP', {
    month: '2-digit',
    day: '2-digit',
  });

  const dw = new Intl.DateTimeFormat('ja-JP', {
    weekday: 'short',
  });

  const onDaysChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value, 10) - 1;
    if (value >= 0 && value < 60) {
      setDayRange(value);
    } else {
      e.preventDefault();
      if (e.target.value !== '') {
        e.target.value = dayRange.toString();
      }
    }
  };

  useEffect(() => {
    const totalStep = queryData?.reduce((prev, cur) => prev + cur.value, 0);
    const nf = new Intl.NumberFormat('ja-JP');

    const stepElement = (
      <>
        {!queryData ? null : (
          <div>
            <div>{`本日(${df.format(
              queryData[0].startDate,
            )})の歩数: ${nf.format(queryData[0].value)}`}</div>
            <div>{`直近${queryData.length}日合計: ${
              totalStep && nf.format(totalStep)
            }`}</div>
          </div>
        )}
      </>
    );
    setStepElement(stepElement);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryData]);

  const rev = queryData?.slice().reverse();

  Chart.defaults.color = '#ccc';

  const graphData = {
    // 軸ラベル
    labels: rev?.map((item) => [
      df.format(item.startDate),
      dw.format(item.startDate),
    ]),
    datasets: [
      // 表示するデータセット
      {
        data: rev?.map((item) => item.value),
        backgroundColor: rev?.map((item) =>
          [0, 6].includes(item.startDate.getDay())
            ? 'rgba(255, 99, 132, 1)'
            : 'rgba(30, 144, 255, 1)',
        ),
        label: '歩数一覧',
      },
    ],
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>{stepResult}</div>
        <Bar data={graphData} />
        <div style={{ margin: '5px' }}>
          <label>
            取得日数[ {dayRange + 1} ]<br />
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              onChange={onDaysChange}
              defaultValue={dayRange}
            />
          </label>
        </div>
      </header>
    </div>
  );
};

export default App;
