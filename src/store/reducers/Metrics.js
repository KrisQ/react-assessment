import * as actions from '../actions';

const initialState = {
  selectedMetrics: [],
  metricsData: []
};

const metricsDataSelected = (state, action) => {
  const { selectedMetrics } = action;
  return {
    selectedMetrics,
    metricsData: state.metricsData
  };
};

const metricsDataReceived = (state, action) => {
  const { metricsData } = action;
  return {
    selectedMetrics: state.selectedMetrics,
    metricsData
  };
};

const handlers = {
  [actions.METRICS_DATA_SELECTED]: metricsDataSelected,
  [actions.METRICS_DATA_RECEIVED]: metricsDataReceived
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === 'undefined') return state;
  return handler(state, action);
};
