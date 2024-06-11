import { GITHUB_CLIENT_ID } from "./String_constant";

export const GITHUB_REGISTRATION_URL = "/registration/github";
export const LOGIN_URL = "/main/login";
export const GITHUB_CODE_URL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}}&redirect_uri=${LOGIN_URL}&scope=user`;