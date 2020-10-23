import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import Chart from './Chart'


class Reports extends Component {
  updateState = () => {
    const self = this
    const { projectSelected } = this.props

    self.setState({
      charts: [],
    })

    if(projectSelected !== -1){
      let count = 0
      //chart1
      axios.get(`${process.env.REACT_APP_API_URL}/report_overview_project_categories`, {
        params: {
          project_id: projectSelected
        }
      })
      .then(function (response) {
        if(response.status === 200){
          self.setState({
            charts: [
              ...self.state.charts,
              {...response.data, id:count++ }
            ]
          })
        }
      })
      //chart2
      axios.get(`${process.env.REACT_APP_API_URL}/report_overview_project_budget`, {
        params: {
          project_id: projectSelected
        }
      })
      .then(function (response) {
        if(response.status === 200){
          self.setState({
            charts: [
              ...self.state.charts,
              {...response.data, id:count++ }
            ]
          })
        }
      })
    }else{
      let count = 0
      //chart1
      axios.get(`${process.env.REACT_APP_API_URL}/report_overview_risk`, {})
      .then(function (response) {
        if(response.status === 200){
          self.setState({
            charts: [
              ...self.state.charts,
              {...response.data, id:count++ }
            ]
          })
        }
      })
      //chart2
      axios.get(`${process.env.REACT_APP_API_URL}/report_overview_issue`, {})
      .then(function (response) {
        if(response.status === 200){
          self.setState({
            charts: [
              ...self.state.charts,
              {...response.data, id:count++ }
            ]
          })
        }
      })
      //chart3
      axios.get(`${process.env.REACT_APP_API_URL}/report_overview_action`, {})
      .then(function (response) {
        if(response.status === 200){
          self.setState({
            charts: [
              ...self.state.charts,
              {...response.data, id:count++ }
            ]
          })
        }
      })
      //chart4
      axios.get(`${process.env.REACT_APP_API_URL}/report_overview_budget`, {})
      .then(function (response) {
        if(response.status === 200){
          self.setState({
            charts: [
              ...self.state.charts,
              {...response.data, id:count++ }
            ]
          })
        }
      })
    }

    // console.log(this.state)
  }

  componentDidUpdate = (prevProps, prevState) => {
    console.log(new Date().toLocaleTimeString(),"Reports.js update")

    if(prevProps.projectSelected!=this.props.projectSelected)
      this.updateState()
    
  }

  componentDidMount= () => {
    this.updateState()
  }

  state = {
    charts: [],
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if(nextState !== this.state){
      return true
    }
    if(nextProps.projectSelected !== this.props.projectSelected){
      return true
    }

    return false
  }

  render() {
    const charts = this.state.charts.map( chart =>{
      return (
        <div>
          <Chart key={chart.id} chartData={chart.data} title={chart.title}/>
        </div>
      )
    })

    return (charts)

  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    projectSelected: state.Project[0].selected
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Reports);