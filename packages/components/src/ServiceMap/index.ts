import Map from "./Map";
import Marker from "./Marker";
import Route from "./Route";

type ServiceMap = typeof Map & {
    Marker: typeof Marker;
    Route: typeof Route;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const exp: any = Map;

exp.Marker = Marker;
exp.Route = Route;

export default exp as ServiceMap;
