import { useGetServicesQuery } from "@RideSaver/api";
import * as Crypto from "expo-crypto";

let servicesHash: Record<string, string> = {};

export default function useServiceFromID(id: string) {
    const serviceIdHash = id.substring(0, 4);
    if(!serviceIdHash in servicesHash) {
        const services = useGetServicesQuery({});
        services.
    }
    const service = services.data.find();
}
