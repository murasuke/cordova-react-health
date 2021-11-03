import { useState, useEffect, useCallback } from 'react';

export type QueryData = {
  endDate: Date;
  startDate: Date;
  unit: string;
  value: number;
};

const useFitStepData = (days: number = 31) => {
  const [queryData, setQueryData] = useState<QueryData[]>();

  const queryAggregatedSuccessCallback = useCallback((data: QueryData[]) => {
    const reversedData = data.slice().reverse();
    setQueryData(reversedData);
  }, []);

  const queryAggregated = useCallback(() => {
    (navigator as any).health.queryAggregated(
      {
        startDate: new Date(new Date().getTime() - days * 24 * 60 * 60 * 1000),
        endDate: new Date(),
        dataType: 'steps',
        bucket: 'day',
      },
      queryAggregatedSuccessCallback,
      (err: any) => {
        console.error(`queryAggregated error: ${err}`);
      },
    );
  }, [days, queryAggregatedSuccessCallback]);

  const requestAuthorization = useCallback(() => {
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
  }, [queryAggregated]);

  const successAvailableCallback = useCallback(
    (available: boolean) => {
      (navigator as any).health.promptInstallFit(
        requestAuthorization,
        (err: any) => {
          console.error(`promptInstallFit error: ${err}`);
        },
      );
    },
    [requestAuthorization],
  );

  const getStepData = useCallback(() => {
    (navigator as any).health.isAvailable(
      successAvailableCallback,
      (err: any) => {
        console.log(`isAvailable error: ${err}`);
      },
    );
  }, [successAvailableCallback]);

  useEffect(() => {
    getStepData();
  }, [days, getStepData]);

  return { getStepData, queryData };
};

export default useFitStepData;
