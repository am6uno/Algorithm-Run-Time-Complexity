 import { KeycloakService, KeycloakOptions } from "keycloak-angular";

const keycloakConfig = {
    clientId: 'encounter-ui',
    realm: 'encounter-realm',
    url: 'https://localhost:8443/auth'
}

export function initializer(keycloak: KeycloakService): () => Promise<any> {
    const options: KeycloakOptions = {
        config: keycloakConfig,
        initOptions: {
            redirectUri: 'https://localhost:4200/',   
            checkLoginIframe: false
        }
    };
    return (): Promise<any> => keycloak.init(options);
}