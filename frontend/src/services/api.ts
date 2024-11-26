import { notification } from "antd";
import axios from "axios";
import {
  Driver,
  RideByCustomer,
  RideConfirmReq,
  RideCoordinatesReq,
  RideEstimate,
  RideEstimateReq,
} from "../types";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data;
    notification.error({
      message: data?.error_code || "Erro",
      description: data?.error_description || data.message,
      placement: "top",
      showProgress: true,
      pauseOnHover: true,
    });
    return Promise.reject(error);
  }
);

export const estimateRideApi = async (values: RideEstimateReq) => {
  return await api.post<RideEstimate>("/ride/estimate", values);
};

export const getMapApi = async (values: RideCoordinatesReq) => {
  return await api.post<string>("/ride/estimate/map", values);
};

export const confirmRideApi = async (values: RideConfirmReq) => {
  return await api.patch("/ride/confirm", values);
};

export const getRidesApi = async (customerId: string, driverId?: number) => {
  return await api.get<RideByCustomer>(
    `/ride/${customerId}${driverId ? `?driver_id=${driverId}` : ""}`
  );
};

export const getDriversApi = async () => {
  return await api.get<Driver[]>("/driver");
};
