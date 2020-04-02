import React, { Component } from 'react';

export default class Usermodel extends Component{
	render(){
		return (
			<div>
				<div className="form-group">
				  <label htmlFor="usr">Name <span style = {{color : "red"}}>*</span></label>
				  <input type="text" className="form-control" id="usr" name = "name" value = {this.props.singleUserData.name} onChange = {this.props.userEvent} />
				</div>

				<div className="form-group">
				  <label htmlFor="email">Email<span style = {{color : "red"}}>*</span></label>
				  <input type="text" className="form-control" id="email"  name = "email"  value = {this.props.singleUserData.email} onChange = {this.props.userEvent} />
				</div>
			</div>
		)
	}
}

