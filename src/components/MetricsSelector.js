import React, { useEffect } from 'react';
import { Provider, createClient, useQuery } from 'urql';
import Select from 'react-select';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch } from 'react-redux';
import * as actions from '../store/actions';

const client = createClient({
  url: 'https://react.eogresources.com/graphql'
});

const query = `
query GET_METRICS {
  getMetrics
}
`;

export default () => {
  return (
    <Provider value={client}>
      <MetricsSelector />
    </Provider>
  );
};

const MetricsSelector = () => {
  const dispatch = useDispatch();
  const [result] = useQuery({
    query
  });

  const handleSelectChange = values => {
    dispatch({ type: actions.METRICS_DATA_SELECTED, values });
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
