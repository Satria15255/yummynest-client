import API from "./Api"

export const createTestimonial = (data) => API.post("/api/testimonials", (data))
export const getTestimonial = () => API.get("api/testimonials")