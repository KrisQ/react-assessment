import * as actions from '../actions';

const initialState = {
  selectedMetrics: ['1', '2']
};

const metricsDataSelected = (state, action) => {
  console.log('REDUX-STATE', state);
  console.log('REDUX-ACTION', action);
  return state;
};

const handlers = {
  [actions.METRICS_DATA_SELECTED]: metricsDataSelected
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === 'undefined') return state;
  return handler(state, action);
};
