import {combineReducers, createStore} from "redux";
import {taskReducer} from "../reducer/task.reducer";

const rootReducer = combineReducers({
    Tasks: taskReducer
})

export const store = createStore(rootReducer)

export type AppStateType = ReturnType<typeof rootReducer>

//Smart type
export type inferType<T> = T extends { [key: string]: (...arg: any[]) => infer U } ? U : never
