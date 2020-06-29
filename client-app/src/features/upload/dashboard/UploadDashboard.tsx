import React, { useState, Fragment } from 'react'
import { IUpload } from '../../../models/uploadModel'
import axios from 'axios';

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
                const res = await axios
                .post(url,formData,config)

                const {ResponseDescription, ResponseCode} = res.data;
                setResponse({ResponseDescription, ResponseCode});

                console.log(responseDescription);

            } catch (error) {
                console.log(error)
            }
            
            
        }else{
            console.log('file is undefined')
        }
    };

    const onSetFile = (e:any) => {
        
        setUploadFile({file : e.target.files[0]});
        setFileName( e.target.files[0].name);
    }

    return (
        <Fragment>
            <form onSubmit={submit}>
                <div className='col-md-4'>
                    <input type='file' className='custom-file-input' id='customFile' onChange={onSetFile}/>
                    <label className='custom-file-label' htmlFor='customFile'>
                        {filename}
                    </label>
                </div>
                <input type="submit" value='Upload' className='btn btn-primary ' />  
            </form>
        </Fragment>
    )
}

export default UploadDashboard
