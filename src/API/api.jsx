import instance, { customAxios, customAxiosAPI } from "./axios";

export const BASE_URL = "https://vietsac.id.vn/pizza-service/";

export const SignUpAccount = (userData) => {
  return instance.post(`api/Accounts/SignUpUser`, userData);
};
export const GetOrderItems = () => {
  return customAxios.get(
    `api/order-items?IncludeProperties=OrderItemDetails.OptionItem&OrderItemStatus=Pending&TakeCount=1000`
  );
};
export const UpdateStatusServing = ({ id }) => {
  return customAxiosAPI.put(`api/order-items/serving/${id}`, { id });
};
export const UpdateStatusDone = ({ id }) => {
  return customAxiosAPI.put(`api/order-items/done/${id}`, { id });
};
