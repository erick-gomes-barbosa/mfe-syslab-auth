import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/index";

export default function Root(props) {
  return (
    <BrowserRouter basename="/users">
      <AppRoutes />
    </BrowserRouter>
  );
}
