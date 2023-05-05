 import { KeycloakService, KeycloakOptions } from "keycloak-angular";

const keycloakConfig = {
    clientId: 'encounter-ui',
    realm: 'encounter-realm',
    url: 'https://18.117.164.173:8443/auth'
}

export function initializer(keycloak: KeycloakService): () => Promise<any> {
    const options: KeycloakOptions = {
        config: keycloakConfig,
        initOptions: {
            redirectUri: 'http://18.117.164.173:80/',   
            checkLoginIframe: false
        }
    };
    return (): Promise<any> => keycloak.init(options);
}