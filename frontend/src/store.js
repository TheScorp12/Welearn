import { createStore, combineReducers } from "redux";

 import Welearn from "./reducer/Welearn";

 const rootReducer = combineReducers({
    Welearn,
 })

 const store = createStore(
    rootReducer
 )

 export default store;