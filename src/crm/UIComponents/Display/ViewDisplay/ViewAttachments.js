import React, {useEffect, useState} from 'react';
import axios from 'axios';
import FileInput from '../../Inputs/FileInput';
import { getApiResults, momentTimeFormats } from '../../../Utilities';

export default function ViewAttachments(props) {  

  let { api, apiPropAttachment, apiPropOther, title, attachments, domain } = props;

  const [totalAttachments, setTotalAttachments] = useState(attachments);  

  const [attachment, setAttachment] = useState('');   
  const [error, setError] = useState('')
  const userId = window.location.pathname.split('/')[3];  
  let fileInput = '';
  
  const uploadFile = (e) => {    
    setAttachment(e.target.files[0]);
  }

  const saveFile = (e) => {
    e.preventDefault();    
    if(attachment === undefined || !attachment) {
      setError('This field is required');
    } else {
      setError('');
    }
    
    let formData = new FormData();
    formData.append(apiPropOther, title);
    formData.append(apiPropAttachment, attachment);
    let config = {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `jwt ${localStorage.getItem('Token')}`,
        "company": `${localStorage.getItem('SubDomain')}`
      }
    }
    if (attachment) {
      axios.put(`${api}${userId}/`, formData, config)
          .then(res => {            
            if(res.status === 200) {              
              alert("Attachment Saved");                            
              updateAttachments();
              fileInput.value = "";
            }            
          });
    }    
  }
    
  const updateAttachments = async () => {
    let result = await getApiResults(`${api}${userId}/`);    
    let newAttachments = [];
    result.data.attachments && result.data.attachments.map(attachment => {      
      newAttachments.push(attachment);
    })
    setTotalAttachments(newAttachments);
  }  

  const removeAttachment = (id) => {        
    let config = {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `jwt ${localStorage.getItem('Token')}`,
        "company": `${localStorage.getItem('SubDomain')}`
      }
    }
    let result = window.confirm('Do you want to Delete it for Sure!?');
    if (result) {
      axios.delete(`${api}attachment/${id}/`, config)
          .then(res => {            
            if(res.status === 200) {              
              updateAttachments();
            }
          });
    }
  }

  return ( 
    <>   
    <div className="card-body mar-top" id="datashow">

      <div className="card-title view-pad">
        <h5>Attachments</h5>
      </div>

      <div className="row marl">
        <div className="col-md-12">

        {/* form */}
        <form id="attachment_form" method="POST" enctype="multipart/form-data">
          <div className="form-group">                        
            <input id="file_input_file" type="file" onChange={(e) => uploadFile(e)} ref={ref=> fileInput = ref} />            
          </div>
          <p id="AttachmentError" className="error-text">{error}</p>
          <br></br>
          <div className="buttons_row mb-2">
            <button className="btn btn-default save" id="attachment_submit" onClick={saveFile}>Save</button>
          </div>            
        </form>

        {/* Attachment */}
        <ul className="list-group" id="attachment_div">                   
          {
            totalAttachments &&
            totalAttachments.map(attachment => {
              return(
                <li className="list-group-item list-row" id={`attachment${attachment.id}`}>
                  <div className="float-right right-container">
                    <div className="list-row-buttons btn-group float-right">                      
                      <button className="action btn primary_btn" onClick={() => removeAttachment(attachment.id)}>Remove</button>
                    </div>
                  </div>
                  <div className="stream-post-container" id={`attachment_name${attachment.id}`}>
                    <pre>
                      <span className="icon">
                        <svg className="svg-inline--fa fa-file-alt fa-w-12" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="file-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg="">
                          <path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 236c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-64c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-72v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm96-114.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"></path>
                        </svg>
                        <i className="fa fa-file-alt"></i>
                        </span>{attachment.file_name}<a href={`/app/attachments/${attachment.id}/download/`}> Download</a>
                    </pre>
                  </div>
                  <div className="stream-container">
                    <pre className="float-left">Uploaded by :{ domain }</pre>
                    <pre className="float-right date" title={momentTimeFormats(attachment.created_on)[1]}>{momentTimeFormats(attachment.created_on)[0]}</pre>
                  </div>
                </li>
              )
            })
          }
        </ul>                            

        </div>
      </div>

    </div>
    </>    
  )
}
