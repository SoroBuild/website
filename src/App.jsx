import { Toaster } from "sonner";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import SoroBuildLanding from "./pages/home/SorobuildLanding";
import NotFound from "./pages/home/not-found/NotFound";
import PlatformStatsPage from "./pages/stats/PlatformStatsPage";
import Layout from "./common/Layout";

function App() {
  return (
    <div className="bg-gray-100 h-screen">
      <Toaster position="top-center" richColors />
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<SoroBuildLanding />} />
            <Route path="/stats" element={<PlatformStatsPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
