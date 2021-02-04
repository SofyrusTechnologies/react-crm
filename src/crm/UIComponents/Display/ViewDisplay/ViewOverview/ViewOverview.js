import React, { useState } from 'react';
import ViewOverviewData from './ViewOverviewData';

export default function ViewOverView (props) {
    
    let {
        id,
        name,
        phone,
        email,
        status,
        contacts,
        lead,              
        tags,
        created_by,
        created_on,        
    } = props;

    let address_line = (props.address_line) ? (props.address_line+ ', '): '';
    let city = (props.city) ? (props.city+ ', '): '';
    let state = (props.state) ? (props.state+ ', '): '';
    let country = (props.country) ? (props.country+ ', '): '';
    let postcode = (props.postcode) ? (props.postcode+ ', '): '';

    // const [isEditButton, setIsEditButton] = useState(true);
    // const [displayEditButton, setDisplayEditButton] = useState('hide');

//   const displayActionButton = () => {
//     (isEditButton) ? setDisplayEditButton('display_edit'): setDisplayEditButton('hide');
//     setIsEditButton(!isEditButton);
//   }
  
  let dataObject = {
    name,
    phone,
    email,
    status,
    contacts,
    lead: (lead !== null && lead !== undefined) ? lead.title : '',    
    address: address_line + city + state + country + postcode,
    tags
  } 
    
    return (
        <>
            <div className="card-title text-right">
                <h5 className="overview">
                    <span className="float-left title title_overview">Overview</span>
                    <span className="mt-0">
                        <div className="overview__action--btns-div dropdown buttons_row">
                            {/* <button
                                className="btn_action dropdown-toggle"
                                onClick={displayActionButton}> Actions <span className="caret" />
                            </button> */}
                            <button
                                className="overview__action--btn btn_action dropdown-toggle" data-toggle="dropdown"
                                > Actions <span className="caret" />
                            </button>
                            <div className="overview__dropdown-menu border-0 dropdown-menu">
                            <a
                                href={`/app/${props.to}/${id}/edit`}
                                className="overview__btn--edit dropdown-item">Edit
                            </a>
                            </div>                            
                        </div>
                    </span>
                </h5>
            </div>
            <div className="row marl">
                <ViewOverviewData
                    object={dataObject}
                    createdBy={created_by && created_by.email}
                    createdOn={created_on}
                />
            </div>
        </>
    );
}
