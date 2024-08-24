import { MapStoreProvider } from "./providers/MapStoreProvider";

import { MapScreen } from "@/screens/MapScreen";

function App() {
  return (
    <MapStoreProvider>
      <MapScreen />
    </MapStoreProvider>
  );
}

export default App;
