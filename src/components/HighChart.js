var React = require('react'),
  Chart = require('highcharts'),
  Funnel = require('highcharts'),
  options = {
    chart: {
    renderTo: 'container',
    type: 'bar'
    },
    title: {
      text: 'Fruit Consumption'
    },
    xAxis: {
      categories: ['Apples', 'Bananas', 'Oranges']
    },
    yAxis: {
      title: {
        text: 'Fruit eaten'
      }
    },
    series: [{
      name: 'Jane',
      data: [1, 0, 4]
    }, {
      name: 'John',
      data: [5, 7, 3]
    }]
};

// Add additional module required to render a treemap.
module.exports = React.createClass({
  render: function () {
    return React.createElement(Chart, { container: 'chart-funnel', options: options, modules: [Funnel] });
  }
});
