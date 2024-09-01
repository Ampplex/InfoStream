export interface RegisterData { 
    // Data model for requesting to register a new account using post request
    email: string;
    password: string;
    name: string;
}

export interface LoginData { 
    // Data model for requesting to login to an existing account using post request
    email: string;
    password: string;
}