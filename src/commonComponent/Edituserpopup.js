import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Usermodel from '../userComponent/Usermodel' ;
import Todomodel from '../todoComponent/Todomodel' ;


export default class Edituserpopup extends Component{
		
	state = {
		show : false,
		name : (this.props?.singleData?.name)   ? this.props.singleData.name  : "",
		email: (this.props?.singleData?.email) ? this.props.singleData.email : "",
		date : (this.props?.singleData?.date)   ? this.props.singleData.date  : "",
		time : (this.props?.singleData?.time)   ? this.props.singleData.time  : "",
		showUserSection : false,
		showTodosSection : false
	}	

	componentWillMount = () => {
		if(this.props.section === "addUser"){
			this.setState({showUserSection : true})
		}else if(this.props.section === "addTodo"){
			this.setState({showTodosSection : true})
		}
		this.setState({show : true});
	}	

	handleClose = () => {
		this.setState({show : false});
		this.props.popEvent("false", {});
	}

	handleInput = (e, type) => {
		
		if(type === "addUser" ){
			if(e.target.name === "email"){
				e.target.value = e.target.value.toLowerCase().trim(); // Email To Lower Case
			}else{
				e.target.value = e.target.value.replace(/[0-9]/g, '').toUpperCase() // Disallow numbers
			}
		}
		
		this.setState({[e.target.name] : e.target.value})
	}

	addData = () => {
		this.props.popEvent("true", this.state,  this.props.singleData.id);
		this.setState({show : false});
	}

	render(){
		return (
	
		    <Modal show={this.state.show} onHide={this.handleClose}>
		        <Modal.Header closeButton>
		          <Modal.Title>Modal heading</Modal.Title>
		        </Modal.Header>

		        <Modal.Body>
			        { this.state.showUserSection  && <Usermodel singleUserData = {this.state} userEvent = { (e) => this.handleInput(e, "addUser")}/> }
			        { this.state.showTodosSection && <Todomodel singleTodoData = {this.state} todoEvent = { (e) => this.handleInput(e, "addTodo")}/>}
		        </Modal.Body>

		        <Modal.Footer>
		          <Button variant="secondary" onClick={this.handleClose}>
		            Close
		          </Button>
		          <Button variant="primary" onClick={this.addData}>
		            Save Changes
		          </Button>
		        </Modal.Footer>
		     </Modal>
		)
	}
}