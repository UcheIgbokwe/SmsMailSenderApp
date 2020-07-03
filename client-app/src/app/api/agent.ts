import axios, { AxiosResponse } from 'axios';


axios.defaults.baseURL = 'https://localhost:44398/api';


const responseBody = (response: AxiosResponse) => response.data;


const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    filepost: (url: string, body: FormData, configuration: {}) => axios.post(url, body, configuration).then(responseBody)
}


const SmsResponse = {
    upload: (formData: FormData, config: {}) => requests.filepost(`/UploadFile`, formData, config)
}




export default {
    SmsResponse
}