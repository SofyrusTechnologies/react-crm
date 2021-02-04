import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {LEADS, TEAMS} from '../../common/apiUrls';
import BreadCrumb from '../UIComponents/BreadCrumb/BreadCrumb';
import TextInput from '../UIComponents/Inputs/TextInput';
import PhoneInput from '../UIComponents/Inputs/PhoneInput';
import FileInput from '../UIComponents/Inputs/FileInput';
import EmailInput from '../UIComponents/Inputs/EmailInput';
import TextArea from '../UIComponents/Inputs/TextArea';
import SelectComponent from '../UIComponents/Inputs/SelectComponent';
import ReactSelect from '../UIComponents/ReactSelect/ReactSelect';
import TagsInput from '../UIComponents/Inputs/TagsInput';
import {Link} from 'react-router-dom';
import { countries } from '../optionsData';
import { statuses } from '../optionsData';
import { sources } from '../optionsData';
import { Validations } from './Validations';
import { convertArrayToString, getApiResults } from '../Utilities';

export default function AddLead(props) {
  
  const [leadObject, setLeadObject] = useState({
    first_name: '', last_name: '', account_name: '', title: '',
    phone: '', email: '', lead_attachment: '',
    website: '', description: '', teams: [], users: [], assigned_users: [],
    status: '', source: '',
    address_line: '', street: '', postcode: '',
    city: '', state: '', country: '',
  })
  const [tags, setTags] = useState([]);
  const [isValidations, setIsValidations] = useState('true');
  const [errors, setErrors] = useState({});  
  //  Teams,Users,AssignedTo
  const [teams, setTeams] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [assignedTo, setAssignedTo] = useState([]);
  const [selectedAssignedTo, setSelectedAssignedTo] = useState([]);
  const [isAssignedTo, setIsAssignedTo] = useState(true);

  useEffect(() => {
    getTeamsAndUsers();
  }, []);

  const getTeamsAndUsers = () => {
    let getTeams = getApiResults(`${TEAMS}`);    
    let teamsArray = [];
    let usersArray = [];
    getTeams.then( res => {          
      res.data.teams.map(team => (
        teamsArray.push({value: team.name, label: team.name, users: team.users, id: team.id})
      ))
      res.data.users.map(user => (
        usersArray.push({value: user.email, label: user.email, id: user.id})
      ))
    })
        
    setTeams(teamsArray);
    setAssignedTo(usersArray);
  }  

  const handleChange = (e) => {           
    setLeadObject({...leadObject, [e.target.name]: e.target.value});
  } 

  const fileUpload = (e) => {           
    setLeadObject({...leadObject, lead_attachment: e.target.files[0]});
  }

  const ReactSelectHandleChange = (e, value) => {
    setIsAssignedTo(false);
    let duplicateAssignedTo = [...assignedTo];
    let teams = e;
    let usersArray = [];
    setLeadObject({...leadObject, teams: teams});
    if(value === 'teams') {
      teams && teams.map(team => (
        team.users.map(user => (
          usersArray.push({value: user.username, label: user.username, id: user.id})
        ))
      ))
      let selectedUsersArray = usersArray.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))=== i );
      setSelectedUsers(selectedUsersArray);
      
      selectedUsersArray.map(selectedUser => (
        duplicateAssignedTo.map(assignedTo => (
          (selectedUser.id === assignedTo.id) ?
            duplicateAssignedTo.splice(duplicateAssignedTo.indexOf(assignedTo), 1): ''          
        ))
      ))
      setSelectedAssignedTo(duplicateAssignedTo);
    }
  }

  const saveLead = (e) => {
    e.preventDefault();
    let targetName = e.target.name;    

    let validationResults = Validations(leadObject);    
    setErrors(validationResults);

    for (let i in validationResults) {      
      if (validationResults[i].length > 0) {
          setIsValidations(false);
          break;
      }
    }
        
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `jwt ${localStorage.getItem('Token')}`,
        company: `${localStorage.getItem('SubDomain')}`
      }
    }    

    const formData = new FormData();
    formData.append('first_name', leadObject.first_name);
    formData.append('last_name', leadObject.last_name);
    formData.append('account_name', leadObject.account_name);
    formData.append('title', leadObject.title);
    formData.append('phone', '+'+leadObject.phone);
    formData.append('email', leadObject.email);
    formData.append('lead_attachment', leadObject.lead_attachment);
    formData.append('website', leadObject.website);
    formData.append('description', leadObject.description);
    formData.append("teams", convertArrayToString(
      leadObject.teams ? leadObject.teams.map(team => team.id) : []
    ));
    formData.append("assigned_users", convertArrayToString(
      leadObject.assignedTo ? leadObject.assigned_users.map(assign => assign.id) : []
    ));
    formData.append('status', leadObject.status);
    formData.append('source', leadObject.source);
    formData.append('address_line', leadObject.address_line);
    formData.append('street', leadObject.street);
    formData.append('city', leadObject.city);
    formData.append('state', leadObject.state);
    formData.append('postcode', leadObject.postcode);
    formData.append('country', leadObject.country);
    formData.append('street', leadObject.street);
    formData.append('tags', convertArrayToString(tags));    
   
    
    if(isValidations) {
      axios.post(`${LEADS}`, formData, config).then( res => {
        if(res.status === 200) {
          if(targetName === 'save'){
            props.history.push({
              pathname: '/leads/',
              state: "leads"
            })
          } else {
            window.location.reload();
          }          
        }
      })
      .catch(err => err);
    }

  }

  console.log(leadObject);
  return (
    
    <div id="mainbody" className="main_container main_container_mt">
      <BreadCrumb target="leads" action="create" />
      <form className="d-flex justify-content-center mt-2" id="add_form" method="POST" action="" novalidate="" enctype="multipart/form-data">
        <div className="col-md-9">
          <div className="card">
            <div className="card-body p-0">
              
              <div className="card-title text-center p-2 card-title-bg">
                CREATE LEAD
              </div>
              <div className="row marl no-gutters justify-content-center mt-3">

                <div className="col-md-4">
                  <div className="filter_col col-md-12">
                    <div className="form-group m-0">
                      <div className="row">
                          <TextInput  elementSize="col-md-6" labelName="First Name" attrName="first_name" attrPlaceholder="First Name" inputId="id_first_name" 
                                      value={leadObject.first_name} getInputValue={handleChange} 
                                      isRequired={true} error={errors.first_name}/>
                          <TextInput  elementSize="col-md-6"  labelName="Last Name"  attrName="last_name"  attrPlaceholder="Last Name"  inputId="id_last_name"  
                                      value={leadObject.last_name} getInputValue={handleChange} 
                                      isRequired={true} error={errors.last_name}/>
                      </div>
                    </div>
                  </div>                
                  <TextInput  elementSize="col-md-12"  labelName="Account Name"  attrName="account_name"  attrPlaceholder="Account Name"  inputId="id_account_name"  
                              value={leadObject.account_name} getInputValue={handleChange}/>                                
                  <TextInput  elementSize="col-md-12"  labelName="Title"  attrName="title"  attrPlaceholder="Title"  inputId="id_title"  
                              value={leadObject.title} getInputValue={handleChange} 
                              isRequired={true} error={errors.title}/>
                  <PhoneInput elementSize="col-md-12"  labelName="Phone"  attrName="phone"  attrPlaceholder="+911234567890"  inputId="id_phone"  
                              value={leadObject.phone} getInputValue={handleChange}
                              isRequired={true} error={errors.phone}/>                  
                  <EmailInput elementSize="col-md-12"  labelName="Email"  attrName="email"  attrPlaceholder="Email"  inputId="id_email"  
                              value={leadObject.email} getInputValue={handleChange} 
                              isRequired={true} error={errors.email}/>                  
                  <FileInput  elementSize="col-md-12"  labelName="Attachment"  attrName="lead_attachment"  attrPlaceholder=""  inputId="lead_attachment"  
                              value={leadObject.lead_attachment} getFile={fileUpload}/>
                </div>
                <div className="col-md-4">
                  <TextInput elementSize="col-md-12"  labelName="Website"  attrName="website"  attrPlaceholder="Website"  inputId="id_website"  
                             value={leadObject.website} getInputValue={handleChange}/>
                  <TextArea elementSize="col-md-12"  labelName="Description"  attrName="description"  attrPlaceholder="Description"  inputId="id_description"  rows="6" 
                            value={leadObject.description} getInputValue={handleChange}/>
                  <ReactSelect elementSize="col-md-12" labelName="Teams" options={teams} getChangedValue={(e) => ReactSelectHandleChange(e, 'teams')} isMulti={true}/>
                  <ReactSelect elementSize="col-md-12" labelName="Users" isDisabled={true} isMulti={true} value={selectedUsers}/>
                  <ReactSelect elementSize="col-md-12" labelName="Assigned Users" options={(isAssignedTo) ? assignedTo : selectedAssignedTo}
                               isMulti={true} value={leadObject.assigned_users}
                               getChangedValue={(e) => setLeadObject({...leadObject, assigned_users: e})}/>
                </div>
                <div className="col-md-4">
                  <SelectComponent  elementSize="col-md-12" labelName="Status" attrName="status" attrPlaceholder="Status" attrId="id_status"
                                    value={leadObject.status} getInputValue={handleChange} options={statuses}/>
                  <SelectComponent  elementSize="col-md-12" labelName="Source" attrName="source" attrPlaceholder="Source" attrId="id_source" 
                                    value={leadObject.source} getInputValue={handleChange} options={sources} isRequired={true}/>
                  <div className="address_group">
                    <TextInput  elementSize="col-md-12"  labelName="Address"  attrName="address_line"  attrPlaceholder="Address Line"  inputId="id_address_line"  
                                value={leadObject.address_line} getInputValue={handleChange}/>    
                    <TextInput  elementSize="col-md-12"  labelName=""  attrName="street"  attrPlaceholder="Street"  inputId="id_street"  
                                value={leadObject.street} getInputValue={handleChange}/>
                    <div className="filter_col col-md-12">
                      <div className="row">
                        <TextInput  elementSize="col-md-4"  labelName=""  attrName="city"  attrPlaceholder="City"  inputId="id_city"  
                                    value={leadObject.city} getInputValue={handleChange}/>
                        <TextInput  elementSize="col-md-4"  labelName=""  attrName="state"  attrPlaceholder="State"  inputId="id_state"  
                                    value={leadObject.state} getInputValue={handleChange}/>
                        <TextInput  elementSize="col-md-4"  labelName=""  attrName="postcode"  attrPlaceholder="Postcode"  inputId="id_postcode"  
                                    value={leadObject.postcode} getInputValue={handleChange}/>                      
                      </div>
                      <SelectComponent  labelName="" attrName="country" attrPlaceholder="Billing country" attrId="id_billing_country" 
                                        value={leadObject.country} getInputValue={handleChange} options={countries}/>
                  </div>
                  </div>                                  
                  <TagsInput type="add" getTags={setTags}/>
                </div>
                <br></br>

                <div class="col-md-12">
                  <div class="row marl buttons_row text-center form_btn_row">
                    <button class="btn btn-default save mr-1" type="button" id="submit_btn" name="save"
                      onClick={saveLead}>Save</button>                    
                    <button class="btn btn-success save savenew mr-1" type="button" name="saveAndNew"
                      onClick={saveLead}>Save &amp; New</button>                    
                    <Link to="/leads" className="btn btn-default clear">Cancel</Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </form>        

    </div>
  )
}
