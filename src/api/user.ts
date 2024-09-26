import { instance } from "./base.api";


export const user = {

   login: function ( username: string, password: string) {
        return instance.post("/login", {username, password} );;
    }

}