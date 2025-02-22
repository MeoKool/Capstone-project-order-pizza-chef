import instance, { customAxios } from "./axios";

export const BASE_URL = "https://vietsac.id.vn/pizza-service/";

export const SignUpAccount = (userData) => {
  return instance.post(`api/Accounts/SignUpUser`, userData);
};
export const GetOrderItems = () => {
  return customAxios.get(`api/order-items`);
};
