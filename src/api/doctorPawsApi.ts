import axios from 'axios';
import { getEnv } from "@/helper";

const { VITE_API } = getEnv();

console.log({VITE_API});

const doctorPawsApi = axios.create({
    baseURL: VITE_API,
});

export default doctorPawsApi;