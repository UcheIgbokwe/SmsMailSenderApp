import React, { useState, Fragment, FormEvent, useEffect, useContext } from 'react'
import { IUpload, ZibSmsAgentSending } from '../../../models/uploadModel'
import { Form, Icon } from 'semantic-ui-react';
import Swal from "sweetalert2"; 
import LoadingComponent from '../../../app/layout/LoadingComponent'
import SmsStore from '../../../app/stores/smsStore';
import {observer} from 'mobx-react-lite';


const UploadDashboard = () => {

    
    const [uploadFile, setUploadFile] = useState<IUpload>();
    const [filename, setFileName] = useState('Choose File');

    const [addFormData, setFormData] = useState<FormData>();
    const [addconfig, setConfig] = useState({});
    const smsStore = useContext(SmsStore);

    const submit = (e:any) => {
        e.preventDefault();

        setUploadFile(uploadFile);

        if (apiData.SrcAddress !== '' && apiData.Message !== '') {

            if (uploadFile !== undefined) {

                const formData = new FormData();
                formData.append('file', uploadFile.file);
                formData.append("SrcAddress", apiData.SrcAddress);
                formData.append("Message", apiData.Message);

                const config = {
                    headers: {
                        'content-type': 'multipart/form-data',
                    },
                };

                setFormData(formData);
                setConfig(config);
                
            }else{
    
                Swal.fire(
                    'Warning',
                    'Please upload a file!',
                    'warning',
                );
            }
        }else{
            Swal.fire(
                'Warning',
                'Please fill the form!',
                'warning',
            );
        }
    };

    //assign details of the uploaded file to a state
    const onSetFile = (e:any) => {
        
        setUploadFile({file : e.target.files[0]});
        setFileName( e.target.files[0].name);
    }

    const initialiseForm = () => {
        return {
            SrcAddress: '',
            Message: ''
        }
    }

    const [apiData, setapiData] = useState<ZibSmsAgentSending>(initialiseForm);

    //assign details of the form to a state
    const handleInputChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.currentTarget;
        setapiData({ ...apiData, [name]: value});
    }

    useEffect(() => {

        if (addFormData !== undefined) {
            try {
                smsStore.uploadSmsData(addFormData!, addconfig);
                setUploadFile({file : ''});
                setFileName('Choose File');
                setapiData(initialiseForm)

            } catch (error) {
                Swal.fire(
                    'Warning',
                    error,
                    'warning',
                );
            }   
        }
        
    },[addFormData,smsStore,addconfig])

    

    if (smsStore.loadingInitial) return <LoadingComponent content='Loading file...'/>

    return (
        <Fragment>
            <div className='container row justify-content-md-center'>
                <h4><Icon fitted name='shipping fast' /> Sms Upload</h4>
            </div>
            <div className='container row justify-content-md-center'>
                <div className='col-lg-4'>
                    <Form>
                        <Form.Input onChange={handleInputChange} name='SrcAddress' placeholder='SenderAddress' value={apiData.SrcAddress}/>
                        <Form.TextArea rows={3} onChange={handleInputChange} name='Message' placeholder='Message' value={apiData.Message}/>
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

export default observer(UploadDashboard)
