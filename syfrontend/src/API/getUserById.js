import { baseUrlApi } from "./config";



export async function GetUserById(id){
    let res  = await fetch(baseUrlApi + `/api/users/${id}` ,{
        method:"GET",
    })
    let result = await res.json();
    return result
}