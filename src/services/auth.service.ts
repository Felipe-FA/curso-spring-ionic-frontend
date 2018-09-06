import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config"
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.services";
import { JwtHelper } from "angular2-jwt";

@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(public http: HttpClient, public storage : StorageService){

    }

    authenticate(creds : CredenciaisDTO){
        return this.http.post(
            '${API_CONFIg.baseUrl}/login',
            creds,
            {
                observe: 'response'
            })
    }

    refreshToken(){
        return this.http.post(
            '${API_CONFIg.baseUrl}/auth/refresh_token',
            {},
            {
                observe: 'response'
            })
    }

    successfulLogin(authorizationValue : string) {
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
    }

    logout(){
        this.storage.setLocalUser(null);
    }
}