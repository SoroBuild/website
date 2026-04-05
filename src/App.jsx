import { Toaster } from "sonner";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import SoroBuildLanding from "./pages/home/SorobuildLanding";
import NotFound from "./pages/home/not-found/NotFound";

function App() {
  return (
    <div className="bg-gray-100 h-screen">
      <Toaster position="top-center" richColors />
      <Router>
        <Routes>
          <Route path="/" element={<SoroBuildLanding />} index />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
