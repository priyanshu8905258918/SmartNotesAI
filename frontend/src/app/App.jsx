import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { router } from "./routes";
export default function App() {
    return (<>
      <RouterProvider router={router}/>
      <Toaster position="bottom-right" toastOptions={{
            style: {
                background: "#0F172A",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "0.75rem",
                fontFamily: "Inter, sans-serif",
            },
        }}/>
    </>);
}
