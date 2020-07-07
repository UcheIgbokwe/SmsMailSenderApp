import React, { useState, FormEvent, useEffect, useContext } from 'react'
import { IUpload, ZibSmsAgentSending } from '../../../models/uploadModel'
import { Form, Icon, Card, Input, TextArea } from 'semantic-ui-react';
import Swal from "sweetalert2"; 
import LoadingComponent from '../../../app/layout/LoadingComponent'
import SmsStore from '../../../app/stores/smsStore';
import {observer} from 'mobx-react-lite';


const UploadDashboard = () => {

    
    const [uploadFile, setUploadFile] = useState<IUpload>();

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
        <Card centered raised>
            <Card.Content header >
                <div className='container row justify-content-md-center' >
                    <Icon name='shipping fast' />Sms Upload
                </div>
            </Card.Content>
            <Card.Content>
            <Form onSubmit={submit}>
                <Form.Group>
                    <Form.Field width={14} >
                        <Input icon='at' iconPosition='left' onChange={handleInputChange} name='SrcAddress' placeholder='SenderAddress' value={apiData.SrcAddress} />
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field width={15} >
                        <TextArea rows={2}  onChange={handleInputChange} name='Message' placeholder='Message' value={apiData.Message}/>
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field width={16} >
                        <Input type='file'  name='custom-file-input' onChange={onSetFile}/>
                        
                    </Form.Field>
                </Form.Group>
                <input type="submit" value='Upload' className='btn btn-primary ' /> 
            </Form>
            </Card.Content>
            <Card.Content extra>
            <Icon name='warning' />File format must be in .xlsx
            </Card.Content>
        </Card>
    )
}

export default observer(UploadDashboard)
