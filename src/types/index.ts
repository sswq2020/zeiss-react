
export type MacheItemStatus = "running" | "finished" | "errored" | "repaired" | "idle"

export type MacheEvent = {
    timestamp:string;
    status:MacheItemStatus
}

type MacheItem =  {
    "status": MacheItemStatus,
    "machine_type": "microscope" | "measurement",
    "longitude": number,
    "latitude": number,
    "last_maintenance": string,
    "install_date": string,
    "id": string,
    "floor": number,
    "events":MacheEvent[]
}

export default MacheItem;