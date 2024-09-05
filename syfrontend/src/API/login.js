import { baseUrlApi } from "./config";
export default async function loginApi(values){
    let res = await fetch(baseUrlApi + "/api/auth/login",{
        method:"POST",
        body:JSON.stringify(values),
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
        }
    })
    const result = await res.json();
    const status = res.status;
    return {result , status};
}