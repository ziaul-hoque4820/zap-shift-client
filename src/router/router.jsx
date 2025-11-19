import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                element: <>Hello World</>
            },
        ]
    },
]);

export default router