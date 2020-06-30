import React, { useState, Fragment } from 'react'
import { IUpload, ZibSmsAgentSending } from '../../../models/uploadModel'
import axios from 'axios';
import { Form, Icon } from 'semantic-ui-react';
import Swal from "sweetalert2"; 

const UploadDashboard = () => {

    const [uploadFile, setUploadFile] = useState<IUpload>();
    const [responseDescription, setResponse] = useState({});
    const [filename, setFileName] = useState('Choose File');
   

    const submit = async (e:any) => {
        e.preventDefault();

        if (uploadFile !== undefined) {
            const url = 'https://localhost:44398/api/UploadFile';
            const formData = new FormData();
            formData.append('file', uploadFile.file);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            };

            try {
                await axios
                    .post(url,formData,config)
                    .then((response) => {
                        const {responseDescription, responseCode} = response.data;
                        setResponse({responseDescription, responseCode});
                        console.log(responseCode);
                        if (responseCode === '00') {
                            
                            Swal.fire(
                                 'Success',
                                 responseDescription,
                                 'success',
                            );
                        }             
                    })

                //console.log(responseDescription);

            } catch (error) {
                console.log(error)
            }
            
            
        }else{
            console.log('file is undefined')
        }
    };

    //assign details of the uploaded file to a state
    const onSetFile = (e:any) => {
        
        setUploadFile({file : e.target.files[0]});
        setFileName( e.target.files[0].name);
    }

    const initialiseForm = () => {
        return {
            SenderAddress: '',
            Message: ''
        }
    }

    const [formData, setFormData] = useState<ZibSmsAgentSending>(initialiseForm);

    //assign details of the form to a state
    const handleInputChange = (e:any) => {
        const {name, value} = e.target;
        setFormData({ ...formData, [name]: value});
        console.log(formData);
    }

    return (
        <Fragment>
            <div className='container row justify-content-md-center'>
                <h4><Icon fitted name='shipping fast' /> Sms Upload</h4>
            </div>
            <div className='container row justify-content-md-center'>
                <div className='col-lg-4'>
                    <Form>
                        <Form.Input onChange={handleInputChange} name='SenderAddress' placeholder='SenderAddress' value={formData.SenderAddress}/>
                        <Form.TextArea rows={3} onChange={handleInputChange} name='Message' placeholder='Message' value={formData.Message}/>
                    </Form>
                </div>
            </div>
            <br></br>
            <form onSubmit={submit}>
                
                <div className='container row justify-content-md-center'>
                <div className='col-md-4'>
                    <input type='file' className='custom-file-input' id='customFile' onChange={onSetFile}/>
                    <label className='custom-file-label' htmlFor='customFile'>
                        {filename}
                    </label>
                </div>
                    <input type="submit" value='Upload' className='btn btn-primary ' /> 
                </div>
            </form>
        </Fragment>
    )
}

export default UploadDashboard
