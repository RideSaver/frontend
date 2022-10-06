import { RootState } from "../../store";

export const getSeats = (state: RootState) => state.rideSettings.seats;
export const getStartPoint = (state: RootState) =>
    state.rideSettings.startPoint;
export const getEndPoint = (state: RootState) => state.rideSettings.endPoint;
