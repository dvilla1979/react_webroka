import { localUser } from "../utils/localUser";
import { instance } from "./base.api";

const endpointall = "frigorificos";
const endpointone = "frigorifico";



const headers = { 'Authorization': `Bearer ${localUser.accessToken()}` };

export const frigorificos = {
    getAll: function () {
        return instance.get(endpointall, {headers});
    },
    getbyId: function ({ id }: { id: string | undefined}) {
        return instance.get(`${endpointone}/${id}`);
    },
    getbyName: function ({ name_frio }: { name_frio: string }) {
        return instance.get(endpointone, {
            params: {
                name_frio
            }
        })
    },
    getByUser:function (id: string) {
        return instance.get(`userRel/${id}`);
    }

}