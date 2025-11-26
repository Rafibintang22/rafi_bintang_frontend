import api from "@/lib/api";

export const getMeetings = async () => {
    const { data } = await api.get("/meeting");
    return data;
};

export const createMeeting = async (payload) => {
    const { data } = await api.post("/meeting", payload);
    return data;
};
