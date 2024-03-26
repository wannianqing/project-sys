import { SetMetadata } from "@nestjs/common";

export const ROLE_KEY = 'role'
export const Roles = (value)=> SetMetadata(ROLE_KEY,value)