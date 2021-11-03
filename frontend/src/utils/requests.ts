import { endpoint } from "./server";


const requests = {
    register: `${endpoint}/register/`,
    login: `${endpoint}/login/`,
    logout: `${endpoint}/logout/`,
    getUser: `${endpoint}/user/`
};

export default requests;