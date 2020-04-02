import React, { useState } from 'react';
import DatatablePage from '../commonComponent/info_list'
import Edituserpopup from '../commonComponent/Edituserpopup';
import Flashmessage from '../commonComponent/flashmessage';
import { NavLink } from 'react-router-dom';

function Todolist() {

  const todosInfo = [
      {id : Math.random(), date : "2021-02-03", time: "14:01"}
  ];

  let [todosData, setTodosData] = useState(todosInfo);
  const [singleTodoData, setSingleTodoData] = useState({});
  const [userPopup, setUserPopup] = useState(false);
  const [flashMsg, setFlashMsg] = useState("");
  const [errorType, setErrorType] = useState("bg-success");

  // Edit User Info :-
  const handleEdit = (e, rowData, id) => {
    setFlashMsg("");
    setSingleTodoData(rowData);
    setUserPopup(true);
  }

  // Delete User Info :-
  const handleDelete = async (e, id) => {
    await setFlashMsg("");
    if (window.confirm("Are you sure. You Want to delete this record?")) {
      todosData = todosData.filter(value => value.id !== id);
      setTodosData(todosData);
      setFlashMsg(`Todo's record removed successfully.`);
      setErrorType("bg-success");
    }
  }

  const createTodo = () => {
    setSingleTodoData({id : 0, date : "", time: ""});
    setUserPopup(true);
  }

   // Get Popup Status From Child Component :-
  const getPopUpStatus = (type, data, id = 0) => {

      let updatedData =[] ;

      if(type === "true"){
        if(data.date === "" || data.time === ""){
            setErrorType("bg-danger");
            setFlashMsg(`All Fields Are Required`);
            setUserPopup(false);
            return false ;
        }
      }

      if(type === 'false' && id === 0){

          setUserPopup(false);
          return false;

      }else if(type === 'true' && id !== 0){ // Update User

          updatedData = todosData.filter( (value) => {
              if(value.id === id){
                value.date = data.date ;
                value.time = data.time ;
              }
              return value ;
          });
          setFlashMsg(`Todo with date ` +data.date+ ` Update successfully.`);
          

      }else if(type === 'true' && id === 0){  // Add Todo
          updatedData = todosData.concat([{id : Math.random(), date : data.date, time: data.time}]);
          setFlashMsg(`Todo with date ` +data.date+ ` add successfully.`);
      }
          setTodosData(updatedData);
          setUserPopup(false);
          setErrorType("bg-success");
  }
  

  todosData = todosData.map((value, index) => {
        value.action = <div className = "">
                            <NavLink to = "#" onClick={(e) => handleEdit(e, value, value.id)} className="textInline" title="Edit" >Edit</NavLink>
                             <b style = {{marginLeft : "20px"}}>|</b>
                            <NavLink to = "#" onClick={(e) => handleDelete(e, value.id)} className="textInline" title="Delete" style = {{marginLeft : "20px"}} >Delete</NavLink>
                        </div>

        return value;
    });

  return (
    <div>
      <button type="button" className="btn btn-primary" onClick = {createTodo}>Create Todo</button><br /><br />
      { flashMsg !== "" && <Flashmessage flashMsg={flashMsg} type = {errorType} />}
      <DatatablePage type = "todosInfo" data = {todosData} />
      { userPopup && <Edituserpopup singleData = {singleTodoData} popEvent = {getPopUpStatus} section = "addTodo" />}
    </div>
  );
}

export default Todolist;
