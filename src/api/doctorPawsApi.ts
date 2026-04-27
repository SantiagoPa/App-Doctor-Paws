import axios from 'axios';
import { getEnv } from "@/helper";

const { VITE_API } = getEnv();

const doctorPawsApi = axios.create({
    baseURL: VITE_API,
});

export default doctorPawsApi;