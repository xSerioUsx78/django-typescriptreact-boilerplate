import { endpoint } from "./server";


const requests = {
    register: `${endpoint}/users/register/`,
    login: `${endpoint}/users/login/`,
    logout: `${endpoint}/users/logout/`,
    getUser: `${endpoint}/users/user/`
};

export default requests;