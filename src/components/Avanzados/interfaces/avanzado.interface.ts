export interface ItemFrigorifico {
    id: string;       // Identificador único del elemento
    name: string;     // Nombre del elemento
}

export interface ItemCamara {
    id: string;       // Identificador único del elemento
    name: string;     // Nombre del elemento
    frigorifico: ItemFrigorifico; // Frigorifico
}

export interface ItemSensor {
    id: string;       // Identificador único del elemento
    name_db: string;     // Nombre del elemento
    name_front: string;     // Nombre del elemento
    descripcion: string;
    tipo_dato: SensorDato;
    tipo_sensor: SensorType;
    color_front: SensorColor;
    frigorifico: ItemFrigorifico; // Frigorifico
    camara: ItemCamara; // Cámara
}


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
