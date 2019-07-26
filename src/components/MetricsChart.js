import * as actions from '../store/actions';
import React, { useEffect } from 'react';
import { useQuery } from 'urql';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import ChartLogic from './ChartLogic';

const query = `
query($input: [MeasurementQuery]!) {
  getMultipleMeasurements(input: $input){
    metric,
    measurements {
      metric,
      at,
   	 	value,
    	unit
    }
  }
}`;

const MetricsChart = () => {
  const getMetrics = state => {
    const { selectedMetrics, metricsData } = state.metrics;
    return {
      selectedMetrics,
      metricsData
    };
  };

  const dispatch = useDispatch();
  const { selectedMetrics: input, metricsData: metrics } = useSelector(getMetrics);
  const [result] = useQuery({
    query,
    variables: {
      input
    }
  });

  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch({ type: actions.API_ERROR, error: error.message });
      return;
    }
    if (!data) return;
    const { getMultipleMeasurements: metricsData } = data;
    dispatch({ type: actions.METRICS_DATA_RECEIVED, metricsData });
  }, [dispatch, data, error]);
  if (fetching) {
    return (
      <Grid container justify="center" align="center" spacing={0}>
        <CircularProgress style={{ marginTop: '200px' }} />
      </Grid>
    );
  }

  return <ChartLogic metrics={metrics} />;
};

export default MetricsChart;
