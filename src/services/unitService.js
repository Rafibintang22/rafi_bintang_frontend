import api from "@/lib/api";

export const getUnits = async () => {
    const { data } = await api.get("/units");
    return data;
};
