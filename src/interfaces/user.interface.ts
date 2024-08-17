export interface TypeUsers {
    accessToken: string;
    user:        User;
}

export interface User {
    id:           string;
    createdAt:    Date;
    updatedAt:    Date;
    username:     string;
    name:         string;
    lastname:     string;
    email:        string;
    password:     string;
    jobPositions: string;
    numberPhone:  number;
    role:         string;
}