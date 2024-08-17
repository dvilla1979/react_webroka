import { localUser } from "../utils/localUser";
import { instance } from "./base.api";

const headers = { 'Authorization': `Bearer ${localUser.accessToken()}` };
const endpoint = "valorescamara";

export const valores = {

    getbyCamaraId: function (id: string, pfechaInicio: Date, pfechaFin: Date) {
        return instance.get(endpoint, {
            params: {
                camaraId: id,
                fechaInicio: pfechaInicio,
                fechaFin: pfechaFin
            },
            headers
        }
        )
    },
}