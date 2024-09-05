import { baseUrlApi } from "./config";


export default async function GetAllGov(){
    let res = await fetch(baseUrlApi+'/api/Gov/',{
        method:'GET',
    })
    const result = await res.json();
    return result
}