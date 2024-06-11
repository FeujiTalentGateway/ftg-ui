import { GITHUB_CLIENT_ID } from "./String_constant";

export const GITHUB_REGISTRATION_URL = "http://localhost:8000/registration/github";
export const LOGIN_URL = "http://localhost:4200/main/login";
export const GITHUB_CODE_URL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}}&redirect_uri=${LOGIN_URL}&scope=user`;