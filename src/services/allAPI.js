import { commonAPI } from "./commonAPI"
import { serverUrl } from "./serverUrl"

export const registerAPI = async(reqBody)=>{
    return await commonAPI('post', `${serverUrl}/register`, reqBody)
}
export const loginAPI = async(reqBody)=> {
    return await commonAPI('post', `${serverUrl}/login`, reqBody)
}
export const addRecipe = async(reqBody, reqHeader) => {
    return await commonAPI('post', `${serverUrl}/addRecipe`, reqBody, reqHeader)
}
export const getRecipes = async(reqHeader) => {
    return await commonAPI('get', `${serverUrl}/getRecipes`, {}, reqHeader )
}
export const editRecipe = async(reqBody, reqHeader, id) =>{
    return await commonAPI('put', `${serverUrl}/editRecipe/${id}`, reqBody, reqHeader)
}
export const deleteRecipe = async(reqHeader, id) =>{
    return await commonAPI('delete', `${serverUrl}/deleteRecipe/${id}`, {}, reqHeader)
}