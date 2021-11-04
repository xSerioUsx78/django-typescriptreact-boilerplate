import Index from "./components/Index";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";


const Routes = {
    Index: {url: '/', component: Index},
    Register: {url: '/register/', component: Register},
    Login: {url: '/login/', component: Login}
};

export default Routes;