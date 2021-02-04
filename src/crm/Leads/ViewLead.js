import React, {useState, useEffect} from 'react';
import { LEADS } from '../../common/apiUrls';
import BreadCrumb from '../UIComponents/BreadCrumb/BreadCrumb';
import ViewOverView from '../UIComponents/Display/ViewDisplay/ViewOverview/ViewOverview';
import ViewAttachments from '../UIComponents/Display/ViewDisplay/ViewAttachments';
import ViewComments from '../UIComponents/Display/ViewDisplay/ViewComments';
import { getApiResults } from '../Utilities';

export default function ViewLead(props) {

const [apiData, setApiData] = useState([]);

  useEffect(() => {
    getLeads();
  },[]);

  const getLeads = () => {
    let userId = window.location.pathname.split('/')[3];
    const res = getApiResults(`${LEADS}${userId}/`);
      res.then((res) => {        
        setApiData(res.data);
    });
  }

  return (
    <>
            {apiData.lead_obj !== undefined ? (
                <>
                    <div
                        id="mainbody"
                        className="main_container main_container_mt"
                    >
                        <BreadCrumb target="leads" action={apiData.lead_obj.first_name} />
                        <div className="main_container" id="maincontainer">
                            <div className="overview_form_block row marl justify-content-center">
                                <div className="col-md-8" id="opacity_block">
                                    <div className="card mb-3">
                                        <div className="card-body" id="datashow">                                            
                                            <ViewOverView   
                                                            to="leads"
                                                            id={apiData.lead_obj.id}
                                                            name={apiData.lead_obj.first_name + apiData.lead_obj.last_name}
                                                            phone={apiData.lead_obj.phone}
                                                            email={apiData.lead_obj.email}
                                                            status={apiData.lead_obj.status}
                                                            contacts={apiData.lead_obj.contacts}
                                                            lead={apiData.lead_obj.lead}
                                                            address_line={apiData.lead_obj.address_line}
                                                            city={apiData.lead_obj.city}
                                                            state={apiData.lead_obj.state}
                                                            country={apiData.lead_obj.country}
                                                            postcode={apiData.lead_obj.postcode}
                                                            tags={apiData.lead_obj.tags}
                                                            created_by={apiData.lead_obj.created_by.email}
                                                            created_on={apiData.lead_obj.created_on}
                                                            />
                                            <ViewAttachments attachments={apiData.lead_obj.lead_attachment}
                                                             domain={apiData.lead_obj.created_by.email}                                                                                                                        
                                                             api={LEADS}
                                                             title={apiData.lead_obj.title}
                                                             apiPropAttachment="lead_attachment"
                                                             apiPropOther="title"/>
                                            <ViewComments   comments={apiData.comments}
                                                            api={LEADS}
                                                            domain={apiData.lead_obj.created_by.email}
                                                            title={apiData.lead_obj.title}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                ''
            )}
        </>
  )
}
