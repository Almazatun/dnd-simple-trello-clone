import {v1} from "uuid";

import {Destination, List, Lists, SourceFrom, TaskActionCreators} from "./types";

let listsKeys = ['_1', '_2', '_3'];

let initialState: Lists = {
  [listsKeys[0]]: {
    title: 'Todo',
    tasks: [
      {id: v1(), name: "task 1"},
      {id: v1(), name: "task 2"},
      {id: v1(), name: "task 3"}
    ]
  },
  [listsKeys[1]]: {
    title: 'In Progress',
    tasks: [
      {id: v1(), name: "task 1"},
      {id: v1(), name: "task 2"},
      {id: v1(), name: "task 3"}
    ]
  },
  [listsKeys[2]]: {
    title: 'Done',
    tasks: []
  },
};

export const taskReducer = (state: Lists = initialState, action: TaskActionCreators): Lists => {
  switch (action.type) {
    case ACTIONS_NAME.ADD_TASK:
      const newTask: { id: string, name: string } = {id: v1(), name: action.payload.title};
      return {
        ...state,
        [action.payload.ListId]: {
          ...state[action.payload.ListId],
          tasks: [...state[action.payload.ListId].tasks.map(task => task), newTask]
        }

      };
    case ACTIONS_NAME.DRAG_AND_DROP_TASK_BETWEEN_LIST:
      const copyState = {...state};
      const sourceColumn = copyState[action.payload.sourceFrom.droppableId];
      const destinationList = copyState[action.payload.destinationTo.droppableId];
      const sourceTasks = [...sourceColumn.tasks];
      const destinationTasks = [...destinationList.tasks];

      const [removed] = sourceTasks.splice(action.payload.sourceFrom.index, 1);

      destinationTasks.splice(action.payload.destinationTo.index, 0, removed)

      return {
        ...state,
        [action.payload.sourceFrom.droppableId]: {
          ...sourceColumn,
          tasks: sourceTasks
        },
        [action.payload.destinationTo.droppableId]: {
          ...destinationList,
          tasks: destinationTasks
        }
      };
    case ACTIONS_NAME.DRAG_AND_DROP_TASK_IN_LIST:
      const copyStateLocal = {...state};
      const column = copyStateLocal[action.payload.sourceLocal.droppableId];
      const copiedTasks = [...column.tasks];

      const [remove] = copiedTasks.splice(action.payload.sourceLocal.index, 1);

      copiedTasks.splice(action.payload.destinationTo.index, 0, remove)

      return {
        ...copyStateLocal,
        [action.payload.sourceLocal.droppableId]: {
          ...column,
          tasks: copiedTasks
        }
      };
    case ACTIONS_NAME.DELETE_TASK:
      return {
        ...state,
        [action.payload.ListId]: {
          ...state[action.payload.ListId],
          tasks: [...state[action.payload.ListId].tasks.filter(task => task.id !== action.payload.itemID)]
        }
      };
    case ACTIONS_NAME.ADD_NEW_LIST:
      const newKey = v1();

      listsKeys.push(`_${newKey}`);

      const lastListPosition = listsKeys[listsKeys.length - 1];
      const newList: List = {title: action.payload.title, tasks: []};

      return {
        ...state,
        [lastListPosition]: newList
      };
    case ACTIONS_NAME.DELETE_LIST:
      const copyStat3 = {...state};

      const {[action.payload.idList]: {}, ...rest} = copyStat3

      return rest;
    case ACTIONS_NAME.RENAME_LIST:
      return {
        ...state,
        [action.payload.idList]: {
          ...state[action.payload.idList],
          title: action.payload.title
        }
      }
    default:
      return state;
  }
}
export const TaskACS = {
  dndTaskBetweenList: (sourceFrom: SourceFrom, destinationTo: Destination) => (
    {type: ACTIONS_NAME.DRAG_AND_DROP_TASK_BETWEEN_LIST, payload: {sourceFrom, destinationTo}} as const
  ),
  dndTaskInList: (sourceLocal: SourceFrom, destinationTo: Destination) => (
    {type: ACTIONS_NAME.DRAG_AND_DROP_TASK_IN_LIST, payload: {sourceLocal, destinationTo}} as const
  ),
  addTask: (ListId: string, title: string) => (
    {type: ACTIONS_NAME.ADD_TASK, payload: {ListId, title,}} as const
  ),
  deleteTask: (ListId: string, itemID: string) => (
    {type: ACTIONS_NAME.DELETE_TASK, payload: {ListId, itemID}} as const
  ),
  addNewList: (title: string) => (
    {type: ACTIONS_NAME.ADD_NEW_LIST, payload: {title}} as const
  ),
  deleteList: (idList: string) => (
    {type: ACTIONS_NAME.DELETE_LIST, payload: {idList}} as const
  ),
  renameList: (idList: string, title: string) => (
    {type: ACTIONS_NAME.RENAME_LIST, payload: {idList, title}} as const
  ),
}

//Actions-Name
enum ACTIONS_NAME {
  ADD_TASK = 'ADD_TASK',
  DELETE_TASK = 'DELETE_TASK',
  RENAME_TASK = 'RENAME_TASK',
  DRAG_AND_DROP_TASK_BETWEEN_LIST = 'DRAG_AND_DROP_TASK_BETWEEN_LIST',
  DRAG_AND_DROP_TASK_IN_LIST = 'DRAG_AND_DROP_TASK_IN_LIST',
  ADD_NEW_LIST = 'ADD_NEW_LIST',
  DELETE_LIST = 'DELETE_LIST',
  RENAME_LIST = 'RENAME_LIST'
}
