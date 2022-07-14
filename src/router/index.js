import Mnrcahome from "../pages/mnrcahome";
import Dashboard from "../pages/dashboard";
import Gics from "../pages/gics";
import Emailserivce from "../pages/emailserivce";
import Squadgrouprcaedaassessor from "../pages/squadgrouprcaedaassessor";

const routes = [
    {
        path:"/",
        exact :true,
        component:Mnrcahome
    },
    {
        path:"/dashboard",
        component:Dashboard
    },
    {
        path:"/gics",
        component:Gics
    },
    {
        path:"/emailservice",
        component:Emailserivce
    },
    {
        path:"/squadgrouprcaedaassessor",
        component:Squadgrouprcaedaassessor
    },
]

export default routes;
