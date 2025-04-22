import { localUser } from "../utils/localUser";
import { instance } from "./base.api";

const headers = { 'Authorization': `Bearer ${localUser.accessToken()}` };
const endpoint = "valoresfrio";

export const camaras = {

    getbyFrioId: function (id: string) {
        return instance.get(endpoint, {
            params: {
                frioId: id
            },
            headers
        }
        )
    },

    getbyName: function (name_frio: string) {
        return instance.get(`/frio_name/${name_frio}/camaras`, {
            params: {
                name_frio
            }
        })
    }
}