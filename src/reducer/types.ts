import {inferType} from "../store/store";
import {TaskACS} from "./task.reducer";

export type TaskActionCreators = inferType<typeof TaskACS>;

export interface Lists {
  [key: string]: List
}

export interface SourceFrom {
  droppableId: string
  index: number
}

export interface Destination extends SourceFrom {}

export interface List {
  title: string
  tasks: Task[]
}

interface Task {
  id: string
  name: string
}
