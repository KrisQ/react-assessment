import * as actions from '../store/actions';
import React, { useEffect } from 'react';
import { useSubscription } from 'urql';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';

const subscription = `
subscription newMeasurement {
  newMeasurement{
    metric,
    at,
    value,
    unit
  }
}`;

const handleSubscription = (measurements = [], response) => {
  return response.newMeasurement;
};

const MetricsCurrent = ({ colors, names }) => {
  const dispatch = useDispatch();

  const [result] = useSubscription({ query: subscription }, handleSubscription);
  const { data: newMeasurements, error } = result;

  const getCurrentMetrics = state => {
    const { currentMetrics } = state.metrics;
    return {
      currentMetrics
    };
  };

  const { currentMetrics } = useSelector(getCurrentMetrics);

  useEffect(() => {
    if (error) {
      dispatch({ type: actions.API_ERROR, error: error.message });
      return;
    }
    if (!newMeasurements) return;
    if (names.includes(newMeasurements.metric)) {
      dispatch({ type: actions.METRICS_DATA_UPDATED, newMeasurements });
    }
  }, [dispatch, newMeasurements, error]);
  if (newMeasurements) {
    return (
      <Grid container justify="center" align="center" spacing={2}>
        {Object.keys(currentMetrics).map((name, i) => {
          return (
            <Grid key={i} item>
              <p style={{ color: colors[i] }}>
                {name}: {currentMetrics[name].value} {currentMetrics[name].unit}
              </p>
            </Grid>
          );
        })}
      </Grid>
    );
  } else {
    return <span></span>;
  }
};

export default MetricsCurrent;
