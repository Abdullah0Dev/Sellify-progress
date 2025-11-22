/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ProductType } from "@/api";
import { createContext, useContext, useReducer } from "react";

type APIContextType = {
  state: any;
  dispatch: React.Dispatch<any>;
};
// create the context
const APIContext = createContext<APIContextType | null>(null);
type StateType = {
  products: ProductType[];
};
type ActionType = {
  type: "SET_PRODUCTS" | "ADD_PRODUCT" | "UPDATE_PRODUCT" | "DELETE_PRODUCT";
  payload: ProductType | ProductType[];
};
const APIContextReducer = (state: StateType, action: ActionType): StateType => {
  // action.type => switch the case |=> return new updated products
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        products: action.payload as ProductType[],
      };
    case "ADD_PRODUCT":
      return {
        products: [action.payload, ...state.products] as ProductType[],
      };
    case "UPDATE_PRODUCT":
      return {
        products: state.products.map((p) =>
          p._id === (action.payload as ProductType)._id
            ? (action.payload as ProductType)
            : p
        ),
      };
    case "DELETE_PRODUCT":
      return {
        products: state.products.filter(
          (p) => p._id !== (action.payload as ProductType)._id
        ),
      };
    default:
      return state;
      break;
  }
};
// the provider
export const APIContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // useReducer to mange global state
  const [state, dispatch] = useReducer(APIContextReducer, {
    products: [],
  });
  return (
    <APIContext.Provider value={{state, dispatch}}>
      {children}
    </APIContext.Provider>
  );
};


// eslint-disable-next-line react-refresh/only-export-components
export const useAPIStore = () => {
    const context = useContext(APIContext);
    if(!context) throw new Error("useFormUpdater must be used within UpdateFormProvider");
    return context;

}