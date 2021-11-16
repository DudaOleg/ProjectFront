import {createStore} from "redux";
import {rootReducer} from "./reduser";

export const store = createStore(rootReducer);