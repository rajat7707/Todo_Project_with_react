import React, { useState, useEffect } from 'react';
import DatatablePage from '../commonComponent/info_list';
import Edituserpopup from '../commonComponent/Edituserpopup';
import Flashmessage from '../commonComponent/flashmessage';
import { NavLink } from 'react-router-dom';


function Userlist() {

  const userInfo = [
      {id : Math.random(), name : "Rajat", email: "rajat.srivastava7707@gmail.com"}
  ];

  let [usersData, setUsersData] = useState(userInfo);
  const [singleUserData, setSingleUserData] = useState({});
  const [userPopup, setUserPopup] = useState(false);
  const [flashMsg, setFlashMsg] = useState("");
  const [errorType, setErrorType] = useState("bg-success");

  // Edit User Info :-
  const handleEdit = (e, rowData, id) => {
      setFlashMsg("");
      setSingleUserData(rowData);
      setUserPopup(true);
  }

   // Delete User Info :-
  const handleDelete = async (e, id) => {
    await setFlashMsg("");
    if (window.confirm("Are you sure. You Want to delete this record?")) {
        usersData = usersData.filter(value => value.id !== id);
        setUsersData(usersData);
        setFlashMsg(`User's record removed successfully.`);
        setErrorType("bg-success");
    }
  }

  // Add User Record
  const createUser = () => {
    setFlashMsg("");
    setSingleUserData({id : 0, name : "", email: ""});
    setUserPopup(true);
  }

   // Get Popup Status From Child Component :-
  const getPopUpStatus = (type, data, id = 0) => {
    
      if(type === "true"){
        if(data.name === "" || data.email === ""){
            setErrorType("bg-danger");
            setFlashMsg(`All Fields Are Required`);
            setUserPopup(false);
            return false ;
        }

        let status = usersData.some( (val) => {
            if(val.email === data.email && val.id !== id){
              return true ;
            }
        });

        if(status){
              setErrorType("bg-danger");
              setFlashMsg(`User already exist with `+data.email+` email. Please try an unique email.`);
              setUserPopup(false);
              return false ;
        }
      }
      
      let updatedData =[] ;
      if(type === 'false' && id === 0){
          setUserPopup(false);
          return false;

      }else if(type === 'true' && id !== 0){ // Update User
          updatedData = usersData.filter( (value) => {
              if(value.id === id){
                value.name = data.name ;
                value.email = data.email ;
              }
              return value ;
          });
          setFlashMsg(`User with email ` +data.email+ ` Update successfully.`);

      }else if(type === 'true' && id === 0){  // Add User
          updatedData = usersData.concat([{id : Math.random(), name : data.name, email: data.email}]);
          setFlashMsg(`User with email ` +data.email+ ` add successfully.`);
      }

          setUsersData(updatedData);
          setUserPopup(false);
          setErrorType("bg-success");
  }
  

  usersData = usersData.map((value, index) => {
      value.action = <div className = "">
                          <NavLink to = "#" onClick={(e) => handleEdit(e, value, value.id)} className="textInline" title="Edit" >Edit</NavLink>
                           <b style = {{marginLeft : "20px"}}>|</b>
                          <NavLink to = "#" onClick={(e) => handleDelete(e, value.id)} className="textInline" title="Delete" style = {{marginLeft : "20px"}} >Delete</NavLink>
                      </div>

      return value;
  });

  return (
    <div>
      <button type="button" className="btn btn-primary" onClick = {createUser}>Create User</button><br /><br />
      { flashMsg !== "" && <Flashmessage flashMsg={flashMsg} type = {errorType} />}
      <DatatablePage type = "userInfo" data = {usersData} />
      { userPopup && <Edituserpopup singleData = {singleUserData} popEvent = {getPopUpStatus} section = "addUser" />}
    </div>
  );
}

export default Userlist;
