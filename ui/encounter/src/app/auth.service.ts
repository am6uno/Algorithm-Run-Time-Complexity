import { KeycloakService } from "keycloak-angular";
import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()

/**
 * This service handles authentication for user sessions.
 */
export class AuthService {
    constructor(private keycloakService: KeycloakService, private _snackBar: MatSnackBar) {}

    getLoggedUser(){
        try {
            let userDetails = this.keycloakService.getKeycloakInstance().idTokenParsed;
            return userDetails;
        }
        catch (e) {
            return undefined;
        }
    }
    
    logout() {
        this.keycloakService.logout();
        this._snackBar.open(`Logged out`, 'X', {duration: 4000})
    }

    redirectToProfile(){
        this.keycloakService.getKeycloakInstance().accountManagement();
    }

    getRoles(): string[]{
        return this.keycloakService.getUserRoles();
    }
}