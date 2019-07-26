import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import MetricsSelector from './MetricsSelector';
import MetricsChart from './MetricsChart';
import client from '../store/api';
import { Provider } from 'urql';

const useStyles = makeStyles({
  card: {
    margin: '5% 10%',
    height: '500px'
  }
});

const MetricsCard = () => {
  const classes = useStyles();

  return (
    <Provider value={client}>
      <Card className={classes.card}>
        <CardContent>
          <MetricsSelector />
          <MetricsChart />
        </CardContent>
      </Card>
    </Provider>
  );
};

export default MetricsCard;
