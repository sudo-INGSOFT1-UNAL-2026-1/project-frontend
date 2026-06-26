import { useEffect, useState } from "react";

import LoginPage from "./modules/auth/pages/LoginPage";
import SetupAdminPage from "./modules/auth/pages/SetupAdminPage";
import { getInitializationStatus } from "./modules/auth/services/authApi";


function App() {
  const [initialized, setInitialized] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkInitialization() {
      try {
        console.log("Verificando el estado de inicialización...");
        const data = await getInitializationStatus();
        setInitialized(data.initialized);
        console.log("Estado de inicialización:", data);
      } catch (error) {
        console.error("Error al verificar el estado de inicialización:", error);
      }
    }

    checkInitialization();
  }, []);

  return (
    <div>
      {initialized === null && <p>Loading...</p>}
      {initialized === false && <SetupAdminPage />}
      {initialized === true && <LoginPage />}
    </div>
  );
}

export default App
