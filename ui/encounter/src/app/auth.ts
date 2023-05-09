import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard{
    constructor(protected override router: Router, protected override keycloakAngular: KeycloakService, private userService: UserService){
        super(router, keycloakAngular);
    }

    isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        return new Promise(async (resolve, reject) =>{
            if(!this.authenticated){
                this.keycloakAngular.login();
                resolve(false);
                return;
            }
            const requiredRole = route.data['role'];
            let granted: boolean = false;
            if (!requiredRole){
                granted = true;
            }
            else {
                if(requiredRole == this.userService.user.role){
                    granted = true;
                }
            }

            if(granted === false){
                resolve(granted);
            }
            resolve(granted);
        });
    }
}