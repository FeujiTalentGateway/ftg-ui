export class User{
    id_i?: number | null;
    userId?: number | null;
    userName?:string | null;
    emailId?:string | null;
    firstName?:string | null;
    lastName?:string | null;
    password?:string | null;
    created_at_ts?:Date;
    updated_at_ts?:Date;
    updated_by_i?:number;
    is_active_sw?:boolean;
    roles_list_?:number;
}