import React, { useEffect } from 'react';
import { useQuery } from 'urql';
import Select from 'react-select';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch } from 'react-redux';
import * as actions from '../store/actions';

const query = `
query GET_METRICS {
  getMetrics
}
`;

const MetricsSelector = () => {
  const dispatch = useDispatch();
  const [result] = useQuery({
    query
  });
  console.log(result);

  const handleSelectChange = values => {
    // DYNAMIC?
    const halfHour = (60 * 60 * 1000) / 2;
    const halfHourAgo = new Date() - halfHour;
    const selectedMetrics = values.map(value => ({ metricName: value.value, after: halfHourAgo }));
    dispatch({ type: actions.METRICS_DATA_SELECTED, selectedMetrics });
  };

  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch({ type: actions.API_ERROR, error: error.message });
      return;
    }
    if (!data) return;
  }, [dispatch, data, error]);
  if (fetching) return <CircularProgress />;

  const options = result.data.getMetrics.map(res => ({ value: res, label: res }));
  return (
    <Select
      isMulti
      name="colors"
      options={options}
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={handleSelectChange}
    />
  );
};

export default MetricsSelector;
