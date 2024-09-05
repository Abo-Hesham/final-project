import { baseUrlApi } from "./config";


export async function addComment(data){
    let res = await fetch(baseUrlApi + `/api/Hiss/comment` ,{
        method:"POST",
        body: JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        }
    })

    const result = await res.json();
    const status = res.status;
    return {result , status}
}