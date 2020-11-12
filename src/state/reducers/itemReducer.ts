import {inferType} from "../../redux/store";
import {v1} from "uuid";

let keyColumn = ['_1', '_2', '_3'];

let initialState: IInitialItemState = {
    [keyColumn[0]]: {
        list: 'Todo',
        items: [
            {id: v1(), name: "Item 1"},
            {id: v1(), name: "Item 2"},
            {id: v1(), name: "Item 3"}
        ]
    },
    [keyColumn[1]]: {
        list: 'In Progress',
        items: [
            {id: v1(), name: "Item 1"},
            {id: v1(), name: "Item 2"},
            {id: v1(), name: "Item 3"}
        ]
    },
    [keyColumn[2]]: {
        list: 'Done',
        items: []
    },
}

export const itemReducer = (state: IItems = initialState, action: ItemACSType): IItems => {
    switch (action.type) {
        case AC_NAMES_ITEM.ADD_ITEM:
            const newItem: {id: string, name: string} = {id: v1(), name: action.payload.title}
            return {
                ...state,
                [action.payload.ListId]: {
                    ...state[action.payload.ListId],
                    items: [...state[action.payload.ListId].items.map(el => el), newItem]
                }

            }
        case AC_NAMES_ITEM.DRAG_AND_DROP_ITEM_BETWEEN_LIST:
            const copyState = {...state}
            const sourceColumn = copyState[action.payload.sourceFrom.droppableId]
            const destColumn = copyState[action.payload.destinationTo.droppableId]
            const sourceItems = [...sourceColumn.items]
            const destItems = [...destColumn.items]

            const [removed] = sourceItems.splice(action.payload.sourceFrom.index, 1)
            destItems.splice(action.payload.destinationTo.index, 0, removed)

            return {
                ...state,
                [action.payload.sourceFrom.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [action.payload.destinationTo.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            }
        case AC_NAMES_ITEM.DRAG_AND_DROP_LOCAL_LIST:
            const copyStateLocal = {...state}
            const column = copyStateLocal[action.payload.sourceLocal.droppableId]
            const copiedItems = [...column.items]
            const [remove] = copiedItems.splice(action.payload.sourceLocal.index, 1)
            copiedItems.splice(action.payload.destinationTo.index, 0, remove)
            return {
                ...copyStateLocal,
                [action.payload.sourceLocal.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            }
        case AC_NAMES_ITEM.DELETE_ITEM:
            return {
                ...state,
                [action.payload.ListId]: {
                    ...state[action.payload.ListId],
                    items: [...state[action.payload.ListId].items.filter(el => el.id !== action.payload.itemID)]
                }
            }
        case AC_NAMES_ITEM.ADD_NEW_LIST:
            let newIndex = Math.floor(Math.random() * 10000);
            keyColumn.push(`_${newIndex}`);
            let lastItemInColumn = keyColumn[keyColumn.length - 1];
            let newList = {list: action.payload.title, items: []}
            return {
                ...state,
                [lastItemInColumn]: newList
            }
        case AC_NAMES_ITEM.DELETE_LIST:
            let copyStat3 = {...state}
            let {[action.payload.idList]: {}, ...rest} = copyStat3
            return rest
        case AC_NAMES_ITEM.RENAME_LIST:
            return {
                ...state,
                [action.payload.idList]: {
                    ...state[action.payload.idList],
                    list: action.payload.title
                }
            }
        default:
            return state
    }
}
export const ItemACS = {
    dndItemBetweenList: (sourceFrom: resutData, destinationTo: resutData) => (
        {type: AC_NAMES_ITEM.DRAG_AND_DROP_ITEM_BETWEEN_LIST, payload: {sourceFrom, destinationTo}} as const
    ),
    dndItemLocalList: (sourceLocal: resutData, destinationTo: resutData) => (
        {type: AC_NAMES_ITEM.DRAG_AND_DROP_LOCAL_LIST, payload: {sourceLocal, destinationTo}} as const
    ),
    addItem: (ListId: string, title: string) => (
        {type: AC_NAMES_ITEM.ADD_ITEM, payload: {ListId, title, }} as const
    ),
    deleteItem: (ListId: string, itemID: string) => (
        {type: AC_NAMES_ITEM.DELETE_ITEM, payload: {ListId, itemID}} as const
    ),
    addNewList: (title: string) => (
        {type: AC_NAMES_ITEM.ADD_NEW_LIST, payload: {title}} as const
    ),
    deleteList: (idList: string) => (
        {type: AC_NAMES_ITEM.DELETE_LIST, payload: {idList}} as const
    ),
    renameList: (idList: string, title: string) => (
    {type: AC_NAMES_ITEM.RENAME_LIST, payload: {idList, title}} as const
    ),
}

//Actions-Name
enum AC_NAMES_ITEM {
    ADD_ITEM = 'ADD_ITEM',
    DELETE_ITEM = 'DELETE_ITEM',
    RENAME_ITEM = 'ADD_ITEM',
    DRAG_AND_DROP_ITEM_BETWEEN_LIST = 'DRAG_AND_DROP_ITEM_BETWEEN_LIST',
    DRAG_AND_DROP_LOCAL_LIST = 'DRAG_AND_DROP_LOCAL_LIST',
    ADD_NEW_LIST = 'ADD_NEW_LIST',
    DELETE_LIST = 'DELETE_LIST',
    RENAME_LIST = 'RENAME_LIST'
}


//Types
export type ItemACSType = inferType<typeof ItemACS>;

// =>Type initial state
interface IItems {
    [key: string]: IItem
}

export interface resutData {
    droppableId: string
    index: number
}

export interface IItem {
    list: string
    items: Array<{ id: string, name: string }>
}


export interface IInitialItemState extends IItems {
}
