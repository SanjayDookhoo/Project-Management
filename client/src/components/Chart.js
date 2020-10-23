import React, { Component } from 'react';
import { Bar, Pie, Chart } from 'react-chartjs-2'
import { getRandomColors } from '../helperFunctions/mainHelper'

class Charts extends Component {
  componentDidMount = () => {
    
    const { chartData, title  } = this.props
    const label = chartData.map(function(e) {
      return e.label;
    });
    const data = chartData.map(function(e) {
      return e.data;
    });

    this.setState({
      chartData: {
        ...chartData,
        labels: label,
        datasets: [
          {
            label: 'data',
            data: data,
            backgroundColor: getRandomColors(data.length)
          }
        ]
      }
    })
  }

  state= {
    chartData:{
      labels: [],
      datasets: [
        {
          label: '',
          data: []
        }
      ]
    }
  }

  render() {
    const { title } = this.props
    return (
      <div className={'post card'}> 
        <div className="card-content"> 
          <Bar 
            data={this.state.chartData}
            options={{
              title:{
                display: 'title',
                text: title,
                fontSize: 25
              },
              maintainAspectRatio: true,
              legend: {
                display: false
              },
            }}
          />
        </div>
      </div>
    )
  }
}

export default Charts