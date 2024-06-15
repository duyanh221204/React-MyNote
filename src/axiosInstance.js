import axios from "axios";

const instance = axios.create (
    {
        baseURL: 'https://demo_project-1-d5070894.deta.app',
    }
);

export default instance;