import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import EquiCubePage from "./pages/EquiCubePage";
import HomePage from "./pages/HomePage";
import ImprintPage from "./pages/ImprintPage";

const DevGalleryPage = import.meta.env.DEV
  ? lazy(() => import("./pages/GalleryPage"))
  : null;

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/equicube" element={<EquiCubePage />} />
        <Route path="/ueber-uns" element={<AboutPage />} />
        <Route path="/kontakt" element={<ContactPage />} />
        <Route path="/impressum" element={<ImprintPage />} />
        {DevGalleryPage ? (
          <Route
            path="/dev/gallery"
            element={
              <Suspense fallback={null}>
                <DevGalleryPage />
              </Suspense>
            }
          />
        ) : null}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
