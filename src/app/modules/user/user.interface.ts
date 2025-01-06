export type IUser={
    name:string,
    email:string,
    password:string,
    phone:number,
    role?:"user"|"admin",
    address:string
}