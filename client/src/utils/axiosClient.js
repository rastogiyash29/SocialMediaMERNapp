import axios from 'axios';
import { KEY_ACCESS_TOKEN, getItem } from './localStorageManager';

// const base_url='http://localhost:4001';
const base_url='https://social-media-aaqk.onrender.com';

export const axiosClient=axios.create({
    baseURL: base_url,
    withCredentials:true
});

axiosClient.interceptors.request.use(
    async(request)=>{
        const access_token=getItem(KEY_ACCESS_TOKEN);
        request.headers['Authorization']=`Bearer ${access_token}`;
        return request;
    }
)

axiosClient.interceptors.response.use(
    async (response)=>{
        const data=response.data;
        const originalRequest=response.config;
        if(data.statusCode===401){
            const response=await axios.create({
                withCredentials:true
            }).post(`${base_url}/auth/refresh`);
            if(response?.data?.status==='ok'){
                console.log("Token refreshed");
                localStorage.setItem(KEY_ACCESS_TOKEN,response.data.result.access_token);
                originalRequest.headers['Authorization']=`Bearer ${response.data.result.access_token}`;
                // return axios(originalRequest);
                const refreshedResponse=await axios(originalRequest);
                return refreshedResponse.data;
            }else{          //is all error persists go to login screen
                localStorage.clear();
                window.location.replace('/login','_self');
            }
        }

        return data;
    },
    (e)=>{
        console.log("Inside axiosCLient catch-> ",e.message);
        window.location.replace('/error','_self');
    }
)