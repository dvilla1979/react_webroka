import { TypeUsers, User } from "../interfaces/user.interface";

const dataStorage: TypeUsers = JSON.parse((localStorage.getItem("userInfo"))!);

const hayToken: boolean = (localStorage.getItem("userInfo") !== null)? true: false;

export const localUser = {
    existe: function() : boolean {
        return hayToken;
    },
    accessToken: function() : string | null {
        return hayToken ? 
            dataStorage.accessToken :
            null
    },
    User: function (): User | null {
        return hayToken ?
            dataStorage.user :
             null
    },
    guardar: function(data: any) {
        localStorage.setItem("userInfo", JSON.stringify(data));
    },
    borrar: function() {
        localStorage.removeItem("userInfo");
    }

}