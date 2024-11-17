import {Response} from "express" 
export const hendaleError = (res : Response, status : number,message : string) => {
    console.log(message);
    return res.status(status).send(message)
    
}

 export const hendaleBadRequst = async (validator : string,error:any) => {
    const errorMessage = `${validator} Error : ${error.message}`
    error.message = errorMessage
    error.status = error.status | 400
    return Promise.reject(error)
}

