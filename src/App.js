import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './common/Header';
import Login from './auth/Login';
import ValidateDomain from './auth/ValidateDomain';
import Register from './auth/Register';
import ForgotPassword from './auth/ForgotPassword';
import User from './users/User'
import UserCreate from './users/UserCreate'
import UserEdit from './users/UserEdit'
import UserDelete from  './users/UserDelete'
import Status from './users/Status'
import ProfileDetails from './profile/ProfileDetails'
import ProfileChangePassword from './profile/ProfileChangePassword';
import ContactList from './settings/contacts/Contacts';
import CreateContact from './settings/contacts/CreateContact'
import CreateEdit from './settings/contacts/EditContact'
import CreateDelete from './settings/contacts/DeleteContact'
import BlockedEmail from './settings/blockedEmail/BlockedEmail'
import CreateBlockedEmail from './settings/blockedEmail/CreateBlockedEmail';
import EditBlockedEmail from './settings/blockedEmail/EditBlockedEmail'
import DeleteBlockedEmail from './settings/blockedEmail/DeleteBlockedEmail'
import BlockDomain from './settings/blockedomain/BlockDomain'
import CreateBlockedDomain from './settings/blockedomain/CreateBlockDomain';
import EditBlockedDomain from './settings/blockedomain/EditBlockedDomain';
import DeleteBlockedDomain from './settings/blockedomain/DeleteBlockedDomain';
import PasswordResetMessage from './auth/PasswordResetMessage';
import Dashboard from './crm/Dashboard';
import Accounts from './crm/Accounts/Accounts';
import AddAccount from './crm/Accounts/AddAccount';
import EditAccount from './crm/Accounts/EditAccount';
import ViewAccount from './crm/Accounts/ViewAccount';
import Leads from './crm/Leads/Leads';
import AddLead from './crm/Leads/AddLead';
import EditLead from './crm/Leads/EditLead';
import ViewLead from './crm/Leads/ViewLead';

function App() { 
  
  return (    
    <div className="App">
      <Router basename="/app">
        <div>
          <Route sensitive path={'/'} component={Header} />
          <Route sensitive path={'/validate-domain'} component={ValidateDomain} />
          <Route sensitive path={'/login'} component={Login} />
          <Route sensitive path={'/register'} component={Register} />
          <Route sensitive path={'/password-reset'} component={ForgotPassword} />
          <Route sensitive path={'/password-reset/done'} component={PasswordResetMessage}/>
          <Route exact sensitive path={'/'} component={ValidateDomain} />
                    
          <Route exact path={'/user'} component={User} />
          <Route exact path={'/users/create'} component={UserCreate} />
          <Route exact path={'/users/edit/:id'}  component={UserEdit} />
          <Route exact path={'/users/delete/:id'}  component={UserDelete} />
          <Route exact path={'/users/status/:id'}  component={Status} />
          
          <Route exact path={'/profile'} component={ProfileDetails} />
          <Route exact path={'/profile/change-password'} component={ProfileChangePassword} />
         
          <Route exact path={'/settings/contacts'} component={ContactList} />
          <Route exact path={'/settings/contacts/create'} component={CreateContact} />
          <Route exact path={'/settings/contacts/edit/:id'} component={CreateEdit} />
           <Route exact path={'/settings/contacts/delete/:id'} component={CreateDelete} />

           <Route exact path={'/settings/blockdomain'} component={BlockDomain} />
          <Route exact path={'/settings/blockedomain/create'} component={CreateBlockedDomain} />
          <Route exact path={'/settings/blockdomain/edit/:id'} component={EditBlockedDomain} />
          <Route exact path={'/settings/blockedomain/delete/:id'} component={DeleteBlockedDomain} />


          <Route exact path={'/settings/blockedemail'} component={BlockedEmail} />
          <Route exact path={'/settings/blockedEmail/create'} component={CreateBlockedEmail} />
          <Route exact path={'/settings/editblockedEmail/:id'} component={EditBlockedEmail} />
          <Route exact path={'/settings/deleteblockedEmail/:id'} component={DeleteBlockedEmail} />

          <Route sensitive path={'/dashboard'} component={Dashboard}/>                 
                                        
          <Route sensitive exact path={'/accounts'} component={Accounts} />                        
          <Route sensitive exact path={'/accounts/create'} component={AddAccount} />
          <Route sensitive exact path={'/accounts/:id/edit'} component={EditAccount} />
          <Route sensitive exact path={'/accounts/:id/view'} component={ViewAccount} />
                    
          <Route exact sensitive path={'/leads'} component={Leads}/>
          <Route sensitive path={'/leads/create'} component={AddLead}/>
          <Route sensitive path={'/leads/:id/edit'} component={EditLead}/>
          <Route sensitive path={'/leads/:id/view'} component={ViewLead}/>  
        </div>
      </Router>
    </div>   
  )
}

export default App;

