import {combineReducers, createStore} from "redux";
import {itemReducer} from "../state/reducers/itemReducer";

const rootReducer = combineReducers({
    Item: itemReducer
})

export const store = createStore(rootReducer)

export type AppStateType = ReturnType<typeof rootReducer>
export type inferType<T> = T extends { [key: string]: (...arg: any[]) => infer U } ? U : never //Smart type for action creators