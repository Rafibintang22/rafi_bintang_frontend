import api from "@/lib/api";

export const getRuangMeetings = async () => {
    const { data } = await api.get("/ruang-meeting");
    return data;
};
