import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import MetricsSelector from './MetricsSelector';
import MetricsChart from './MetricsChart';

const useStyles = makeStyles({
  card: {
    margin: '5% 10%',
    height: '500px'
  }
});

const MetricsCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <MetricsSelector />
        <MetricsChart />
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
