import * as actions from '../actions';

const initialState = {
  selectedMetrics: [],
  metricsData: [],
  currentMetrics: {}
};

const metricsDataSelected = (state, action) => {
  const { selectedMetrics } = action;
  return {
    selectedMetrics,
    currentMetrics: state.currentMetrics,
    metricsData: state.metricsData
  };
};

const metricsDataReceived = (state, action) => {
  const { metricsData } = action;
  return {
    selectedMetrics: state.selectedMetrics,
    currentMetrics: state.currentMetrics,
    metricsData
  };
};

const metricsDataUpdated = (state, action) => {
  const { metricsData } = state;
  const { newMeasurements } = action;
  const newMetricsData = metricsData.map(data => {
    if (data.metric === newMeasurements.metric && newMeasurements !== undefined) {
      return {
        metric: data.metric,
        measurements: [...data.measurements, newMeasurements]
      };
    }
    return {
      metric: data.metric,
      measurements: [...data.measurements]
    };
  });
  const currentMetrics = state.currentMetrics;
  currentMetrics[newMeasurements.metric] = {
    name: newMeasurements.metric,
    value: newMeasurements.value,
    unit: newMeasurements.unit
  };
  return {
    selectedMetrics: state.selectedMetrics,
    currentMetrics,
    metricsData: newMetricsData
  };
};

const handlers = {
  [actions.METRICS_DATA_SELECTED]: metricsDataSelected,
  [actions.METRICS_DATA_RECEIVED]: metricsDataReceived,
  [actions.METRICS_DATA_UPDATED]: metricsDataUpdated
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === 'undefined') return state;
  return handler(state, action);
};
