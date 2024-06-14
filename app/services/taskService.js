import {httpAxios} from "../helper/httpHelper";

export const newPost=async (data,email)=>{

    const result=await httpAxios
        .post('/api/post',{...data,email})
        .then((response)=>response.data);
    return result;

}
export async function deleteTask(data){
    const result=await httpAxios
        .delete(`/api/managepost`,{data})
        .then((response)=>response.data);
    return result;
}
export async function updateTask(data) {
    const result = await httpAxios
        .put(`/api/managepost`, { ...data })
        .then((response) => response.data);
    return result;
}