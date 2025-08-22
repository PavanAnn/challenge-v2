export interface Assets {
    gatewayId?: string;
    id: string;
    locationId: string | null;
    name: string;
    parentId: string | null;
    sensorId?: string;
    sensorType: Sensor;
    status: Status;
}

type Sensor = 'vibration' | 'energy' | null;

type Status = 'operating' | 'alert' | null;