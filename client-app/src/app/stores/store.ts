// Interface for store.
// Date - 24th Apr, 2023.

import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

// Date - 24th Apr, 2023.
interface Store {
    activityStore: ActivityStore
}

export const store: Store = {
    activityStore: new ActivityStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}