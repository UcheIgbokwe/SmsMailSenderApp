import { observable, action } from 'mobx';
import { createContext } from 'react';
import agent from '../../app/api/agent';
import Swal from "sweetalert2"; 

class SmsStore {

    @observable loadingInitial = false;

    
    @action uploadSmsData = async (formData: FormData, config: {}) => {
        this.loadingInitial = true;

        try {
            const response = await agent.SmsResponse.upload(formData!, config);
            this.loadingInitial = false;

            if (response.responseCode === '00') {
                    
                Swal.fire(
                    'Success',
                    response.responseDescription,
                    'success',
                );
                
                
            }else{
                Swal.fire(
                    'Warning',
                    response.responseDescription,
                    'warning',
                );
            }

        } catch (error) {
            console.log(error)
        }   
    }
}



export default createContext(new SmsStore());