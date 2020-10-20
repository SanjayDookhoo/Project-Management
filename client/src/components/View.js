import React, { Component} from 'react';

class View extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.selected === nextProps.selected &&
      this.props.projects === nextProps.projects){
      return false;
    } else {
      return true;
    }
  }

  componentDidUpdate = () => {
    console.log(new Date().toLocaleTimeString(),"ViewProject.js update")
  }

  renderTableData() {
    return this.props.projects.map((project, index) => {
       const { id, name, description, status } = project

       return (
          <tr className="hoverable" key={id} onClick={() => this.props.handleFocus(id)}>
             <td>{name}</td>
             <td>{description}</td>
             <td> <div className="center"> {status} % </div>
              <div className="progress">
                  <div className="determinate" style={{width: + status + '%'}}></div>
              </div>
             </td>
          </tr>
       )
    })
  }

  render() {
    let view = null

    const { color, category, selected, projects } = this.props
    
    if(selected !== -1){
      const projectName = projects.find(project => project.id === selected).name

      view = (
        <div>
          <div className={`post card white-text ${color}`}> 
            <div className="card-content" onClick={this.props.handleUnfocus}> 
              <div className={`post card white-text ${color} hoverable`}> 
                <div className="card-content">
                  <h5> <b>Selected: </b> {projectName} </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }else{
      view = this.props.projects.length ? (
        <div>
          <div className={`post card white-text ${color}`}> 
            <div className="card-content"> 
              <table >
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderTableData()}
                  </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className={`post card white-text ${color}`}> 
            <div className="card-content"> 
              No {`${category === 'NestedAction' ? 'Nested Action' : category}s`}
            </div>
          </div>
        </div>
      )
    }
    
    return view
  }
}

export default View;
