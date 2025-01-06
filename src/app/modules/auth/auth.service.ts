import { IUser } from "../user/user.interface";
import { userModel } from "../user/user.model";

const register = async(payload:IUser)=>{
    const result = (await userModel.create(payload))
    return result
}


export const AuthService={
    register
}