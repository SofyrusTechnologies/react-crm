import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { getApiResults, momentTimeFormats } from '../../../Utilities';


export default function ViewComments(props) {

  let { api, domain, title} = props;

  const [comments, setComments] = useState(props.comments);

  const [comment , setComment] = useState();
  const [error, setError] = useState('');
  const userId = window.location.pathname.split('/')[3]; 
  const [commentId, setCommentId] = useState();

  const submitComment = (e) => {
    e.preventDefault();    
    if (comment === undefined) {      
      setError('This field is required');
    } else {
      setError('');
    }
    let formData = new FormData();
    formData.append('comment', comment);
    let config = {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `jwt ${localStorage.getItem('Token')}`,
        "company": `${localStorage.getItem('SubDomain')}`
      }
    }
    if (comment !== undefined) {
      axios.post(`${api}${userId}/`, formData, config)
      .then(res => {
        if(res.status === 200) {              
          alert("Comment Submitted");  
          setComment('');
          updateComments();        
        }
      })
    }        
  }
  
  const editComment = (id, comment) => {
    setComment(comment);
    setCommentId(id);
  }    

  const updateComment = (e) => {
    if (comment === undefined) {      
      setError('This field is required');
    } else {
      setError('');
    }
    e.preventDefault();
    let config = {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `jwt ${localStorage.getItem('Token')}`,
        "company": `${localStorage.getItem('SubDomain')}`
      }
    }
    const formData = new FormData();
    formData.append('comment', comment);
    if (comment !== undefined) {
    axios.put(`${api}comment/${commentId}/`, formData, config)
          .then(res => {            
            if(res.status === 200) {              
              updateComments();
            }
          });
        }
  }

  const removeComment = (e) => {
    
    let config = {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `jwt ${localStorage.getItem('Token')}`,
        "company": `${localStorage.getItem('SubDomain')}`
      }
    }
    axios.delete(`${api}comment/${e}/`, config)
      .then(res => {        
        if(res.status === 200) {              
          updateComments();          
        }
      })
  }

  const updateComments = async() => {
    let result = await getApiResults(`${api}${userId}/`);
    let newComments = [];
    result.data.comments && result.data.comments.map(comment => {      
      newComments.push(comment);      
    })
    setComments(newComments);
  }

  
  return (
    <div className="card-body view_comment" id="datashow">

      <div className="card-title">
        <h5>Comments</h5>
      </div>

      <div className="row marl">
        <div className="col-md-12">

        <form id="comment_form" method="POST" enctype="multipart/form-data">
          <div className="form-group">
            <textarea onChange={(e) => {setComment(e.target.value)}} 
                      value={comment}
                      className="form-control mentions" textarea="" 
                      cols="40" rows="3" id="id_comments" name="comment"
                      placeholder="Submit Your Comments Here">
            </textarea>
            <div>
              <p id="CommentError" className="error-text">{error}</p>
            </div>
            <br/>
            <div className="buttons_row">
              <button className="btn btn-default save text-center" id="comment_submit" onClick={submitComment}>Submit</button>
            </div>
          </div>            
        </form>

        <ul className="list-group" id="comments_div">
          {
            (comments &&
              comments.map(comment => {
                return(
                  <li className="list-group-item list-row" id={`comment${comment.id}`}>                        
                    <div className="list-row-buttons btn-group float-right">
                      <button className="btn primary_btn  dropdown-toggle" data-toggle="dropdown" type="button">Actions<span className="caret"></span></button>              
                      <ul className="dropdown-menu text-center">
                        <li>
                          <a className="dropdown-item comment_btn" onClick={() => editComment(comment.id, comment.comment)} 
                            data-toggle="modal" data-target="#edit_comment_modal"                            
                            >Edit</a>
                        </li>
                        <li>
                          <a className="dropdown-item comment_btn" onClick={() => removeComment(comment.id)}>Remove</a>
                        </li>
                      </ul>              
                    </div>
                    <div className="stream-post-container" id={`comment_name${comment.id}`}>
                      <pre>{comment.comment}</pre>
                    </div>
                    <div className="stream-container">
                      <pre className="float-left">{domain}</pre>
                      <pre className="float-right date" title={momentTimeFormats(comment.commented_on)[1]}>{momentTimeFormats(comment.commented_on)[0]}</pre>
                    </div>
                  </li>
                )
              }))

              
          }
        </ul>
                   
        </div>
      </div>

      {/* Modal */}

      <div className="modal fade" id="edit_comment_modal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Update Your Comment</h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">×</button>
            </div>
            <form id="comment_edit_form" method="POST">
              <div className="modal-body">
                <div className="form-group">                  
                  <textarea onChange={(e) => {setComment(e.target.value)}} 
                      value={comment}
                      className="form-control mentions text-dark" 
                      cols="40" rows="3" id="id_comments" name="comment" 
                      placeholder="Submit Your Comments Here">
                  </textarea>
                  <span>                  
                    <p id="CommentEditError" className="error-text">{error}</p>
                  </span>
                  <input type="hidden" value="" name="accountid"/>
                  <input type="hidden" value="" name="commentid" id="commentid"/>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-default save" id="comment_edit" 
                        onClick={updateComment}
                        data-dismiss="modal">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>         

    </div>
  )
}