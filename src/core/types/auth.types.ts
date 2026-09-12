export interface RegisterData
{
    username:string,
    name:string,
    surname:string,
    email:string,
    phone:string,
    password:string,
}

export interface LoginData
{
    username:string,
    password:string,
}

export interface LoginResponseDTO
{
    token:string
}