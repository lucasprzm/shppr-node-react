import { Route, Routes } from "react-router";
import RideHistory from "./features/Ride/RideHistory";
import RideOptions from "./features/Ride/RideOptions";
import RideRequest from "./features/Ride/RideRequest";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RideRequest />} />
      <Route path="/opcoes-viagem/:customer_id" element={<RideOptions />} />
      <Route path="/historico" element={<RideHistory />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}

export default App;
