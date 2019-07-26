import React from 'react';
import MetricsCurrent from './MetricsCurrent';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis
} from 'recharts';

const ChartLogic = ({ metrics }) => {
  if (metrics[0]) {
    const names = metrics.map(metric => metric.metric);
    const dataArray = metrics[0].measurements.map((m, metricIndex) => {
      const dateObject = new Date(m.at);
      const obj = {
        name: dateObject.toLocaleTimeString()
      };
      names.forEach((name, nameIndex) => {
        if (metrics[nameIndex].measurements[metricIndex] !== undefined) {
          obj[metrics[nameIndex].metric] = metrics[nameIndex].measurements[metricIndex].value;
        }
      });
      return obj;
    });

    const colors = ['#d32f2f', '#0288d1', '#388e3c', '#fbc02d', '#e64a19', '#5d4037'];

    return (
      <div>
        <ResponsiveContainer minHeight={400} style={{ marginTop: '50px' }}>
          <LineChart data={dataArray} margin={{ top: 50, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" interval={300} />
            <YAxis />
            <Tooltip />
            {names.map((name, i) => {
              return (
                <Line key={name} dot={false} type="monotone" dataKey={name} stroke={colors[i]} />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
        <MetricsCurrent colors={colors} names={names} />
      </div>
    );
  } else {
    return <span></span>;
  }
};

export default ChartLogic;
