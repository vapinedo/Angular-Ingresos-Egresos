import { createReducer, on } from "@ngrx/store";
import { setItem, setItems, unSetItems } from "./ingreso-egreso.actions";
import { IngresoEgreso } from '../models/ingreso-egreso.model';

export interface State {
    items: IngresoEgreso[];
}

export const initialState: State = {
    items: []
};

const _ingresoEgresoReducer = createReducer(
    initialState,
    on(setItem, (state, { item }) => {
        return { 
            ...state,
            items: [...state.items, item]
        }
    }),
    on(
        setItems, 
        function(state: any, payload: any) {
            return {
                ...state, 
                items: [...payload.items] 
            };
        }
    ),
    on(unSetItems, (state) => ({ ...state, items: [] })),
);

export function ingresoEgresoReducer(state: any, action: any) {
    return _ingresoEgresoReducer(state, action);
}