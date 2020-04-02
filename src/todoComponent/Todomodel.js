import React, { Component } from 'react';

export default class Todomodel extends Component{
	
	
	render(){
		return (
			<div>
				<div className="form-group">
				  <label htmlFor="date">Date<span style = {{color : "red"}}>*</span></label>
				  <input type="date" className="form-control" id="date" data-date="" data-date-format="DD MMMM YYYY"  name = "date" value = {this.props.singleTodoData.date} onChange = {this.props.todoEvent} />
				</div>

				<div className="form-group">
				  <label htmlFor="time">Time <span style = {{color : "red"}}>*</span></label>
				  <input type="time" className="form-control" id="time"  name = "time"  value = {this.props.singleTodoData.time} onChange = {this.props.todoEvent} />
				</div>
			</div>
		)

	}
}

