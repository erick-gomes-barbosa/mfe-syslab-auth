import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/index";
import "./index.css";

export default function Root(props) {
  return (
    <BrowserRouter basename="/users">
      <AppRoutes />
    </BrowserRouter>
  );
}
