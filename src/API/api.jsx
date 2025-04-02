import instance, { customAxios, customAxiosAPI } from "./axios";

export const BASE_URL = "https://vietsac.id.vn/";

export const SignUpAccount = (userData) => {
  return instance.post(`api/Accounts/SignUpUser`, userData);
};
export const GetOrderItems = (params) => {
  return customAxios.get(`api/order-items`, {
    params: {
      ...params,
      OrderItemStatus: "Pending",
      TakeCount: 1000,
      SortBy: "startTime",
      IncludeProperties: "OrderItemDetails",
    },
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
