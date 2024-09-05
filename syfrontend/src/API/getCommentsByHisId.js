import { baseUrlApi } from "./config";

export async function GetHisComments(id){
    let res = await fetch(baseUrlApi + `/api/Hiss/comment/${id}`,{
        method:"GET",
    });
    const result = await res.json();
    return result
}