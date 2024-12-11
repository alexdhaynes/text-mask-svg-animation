import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useRoutes, RouteObject } from "react-router-dom";
import "./styles/global.css";
import routes from "~react-pages";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      {useRoutes(routes as unknown as RouteObject[])}
    </Suspense>
  );
}

const app = createRoot(document.getElementById("root")!);

app.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
