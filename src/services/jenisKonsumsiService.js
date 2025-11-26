import api from "@/lib/api";

export const getJenisKonsumsi = async () => {
    const { data } = await api.get("/jenis-konsumsi");
    return data;
};
