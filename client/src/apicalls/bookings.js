import { axiosInstance } from ".";

// make payment
export const makePayment = async (token , amount) => {
    try {
        const response = await axiosInstance.post("/api/bookings/make-payment", {token , amount});
        return response.data;
    } catch (error) {
        return error.response;
    }
}
// book shows
export const bookShowTickets = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/bookings/book-show", payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// get all bookings
export const getBookingsOfUser = async (userId) => {
    try {
        const response = await axiosInstance.get("/api/bookings/get-bookings", { userId });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};