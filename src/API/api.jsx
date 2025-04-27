import instance, { customAxios, customAxiosAPI } from "./axios";
import qs from "qs";

export const BASE_URL = "https://vietsac.id.vn/";

export const SignUpAccount = (userData) => {
  return instance.post(`api/Accounts/SignUpUser`, userData);
};
export const LoginStaff = (credentials) => {
  return customAxiosAPI.post(`api/auth/staff/login`, credentials);
};
export const GetOrderItems = (params) => {
  return customAxios.get("api/order-items", {
    params: {
      ...params,
      OrderItemStatus: ["Pending", "Cooking"],
      TakeCount: 1000,
      SortBy: "startTime",
      IncludeProperties: "OrderItemDetails,Product.Recipes",
    },
    // Cấu hình paramsSerializer
    paramsSerializer: (p) => qs.stringify(p, { arrayFormat: "repeat" }),
  });
};
export const GetOrderItemsServing = (params) => {
  return customAxios.get(`api/order-items`, {
    params: {
      ...params,
      OrderItemStatus: "Serving",
      TakeCount: 1000,
      SortBy: "startTime",
      IncludeProperties: "OrderItemDetails",
    },
  });
};
export const UpdateStatusServing = ({ id }) => {
  return customAxiosAPI.put(`api/order-items/serving/${id}`, { id });
};
export const UpdateStatusDone = ({ id }) => {
  return customAxiosAPI.put(`api/order-items/done/${id}`, { id });
};
export const UpdateStatusCancelled = ({ id, reason }) => {
  return customAxiosAPI.put(`api/order-items/cancelled/${id}`, reason);
};
export const UpdateStatusCooking = ({ id }) => {
  return customAxiosAPI.put(`api/order-items/cooking/${id}`, { id });
};
export const GetCancelReasons = () => {
  return customAxios.get(`api/ReasonConfig`);
};
