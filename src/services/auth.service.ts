import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config"
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.services";

@Injectable()
export class AuthService {

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

    successfulLogin(authorizationValue : string) {
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token : tok
        };
        this.storage.setLocalUser(user);
    }
}