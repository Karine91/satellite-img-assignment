import { observer } from "mobx-react-lite";
import { createContext, FunctionComponent, useContext } from "react";
import { useState } from "react";

import { ShapeApiService } from "@/features/shape";
import { ApiService } from "@/services/api-service";
import { MapStoreState } from "@/store/MapStoreState";

export const MapStoreContext = createContext<MapStoreState | null>(null);

export const MapStoreProvider: FunctionComponent<{
  children: React.ReactNode;
}> = observer(({ children }) => {
  const apiService = new ApiService();
  const shapeApiService = new ShapeApiService(apiService);
  const [mapStore] = useState(
    () => new MapStoreState(1000, 1000, shapeApiService),
  );
  return (
    <MapStoreContext.Provider value={mapStore}>
      {children}
    </MapStoreContext.Provider>
  );
});

export const useMapStore = () => {
  const store = useContext(MapStoreContext);
  if (!store) {
    throw new Error("useMapStore must be used within a MapStoreProvider");
  }

  return store;
};
