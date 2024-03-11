export class User{
    userId?: number | null;
    userName?:string | null;
    emailId?:string | null;
    firstName?:string | null;
    lastName?:string | null;
    password?:string | null;
    createdAt?:Date;
    updatedAt?:Date;
    updatedBy?:number;
    isActive?:boolean;
    roles?:number[];
}