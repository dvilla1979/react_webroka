/*export interface TypeCamaras {
    id:        string;
    createdAt: Date;
    updatedAt: Date;
    name:      string;
}*/

export enum SensorDato{
    BOOLEAN = "BOOLEAN",
    INT16 = "INT16",
    INT32 = "INT32",
    FECHA_HORA = "FECHA_HORA",
    FECHA = "FECHA",
    SEMANA_HORA = "SEMANA_HORA",
    DIA_HORA = "DIA_HORA",
    HORA = "HORA",
    REAL = "REAL",
    REAL_DIV_10 = "REAL_DIV_10"
}

export enum SensorType{
    TEMPERATURA = "TEMPERATURA",
    PRESION = "PRESION",
    POTENCIA = "POTENCIA"
}

export enum SensorColor{
    RED = "RED",
    BLUE = "BLUE",
    GREEN = "GREEN",
    BLACK = "BLACK",
    ORANGE = "ORANGE",
    YELLOW = "YELLOW",
    PURPLE = "PURPLE",
    PINK = "PINK",
    BROWN = "BROWN",
    WHITE = "WHITE",
}

export interface TypeValor {
    fecha_hora_value: string | undefined,
    value: string | undefined,
}

export interface TypeSensor  {
    id: string,
    name_db: string,
    name_front:string,
    descripcion: string | undefined,
    tipo_dato: SensorDato,
    tipo_sensor: SensorType,
    color_front: SensorColor,
    valores: TypeValor[];
    /*value: string | undefined,
    fecha_hora_value: string | undefined,*/
}

export interface TypeCamaras  {
    id: string,
    name: string,
    sensores: TypeSensor[]
}

export interface TypeFrioCamSenValor {
    frio: {
        id: string,
        name: string
    },
    camaras : TypeCamaras[]
}