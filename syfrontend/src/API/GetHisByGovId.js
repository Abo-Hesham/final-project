import {baseUrlApi} from "./config";


export default async function GetHisByGovId(id){
    let res = await fetch(baseUrlApi + `/api/Gov/HisSite/${id}` ,{
        method:"GET",
    })
    const result = await res.json();
    return result
}