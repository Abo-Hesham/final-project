import { baseUrlApi } from "./config";



export async function updateUserPic(form , id){
    let res = await fetch(baseUrlApi + `/api/users/${id}`,{
    method:"PUT",
    body: form,
    })
    let result =await res.json();
    const status = res.status;
    return {result , status}
}



export async function updateUserInfo (values , id){
    let res = await fetch( baseUrlApi + `/api/users/userdata/${id}`, {
        method:"PUT",
        body:JSON.stringify(values),
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
        }
    })
    let result = await res.json();
    const status = res.status;
    return { result , status}
}