import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            // Commented as HomePage shifted out of NavBar. Date - 09th May, 2023.
            // { path: '', element: <HomePage /> },
            { path: 'activities', element: <ActivityDashboard /> },
            { path: 'activities/:id', element: <ActivityDetails /> },
            // React generally preserve state of the Component. 
            // As same component is preserved here, we either need to change the position of the component 
            // or to provide a 'key' to distinguish
            // Date - 09th May, 2023.
            { path: 'createActivity', element: <ActivityForm key='create' /> },
            { path: 'manage/:id', element: <ActivityForm key='update' /> }
        ]
    }
]

export const router = createBrowserRouter(routes);