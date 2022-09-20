import { createReducer, on } from "@ngrx/store";
import { setItems, unSetItems } from "./ingreso-egreso.actions";
import { IngresoEgreso } from '../models/ingreso-egreso.model';

export interface State {
    items: IngresoEgreso[];
}

export const initialState: State = {
    items: []
};

const _ingresoEgresoReducer = createReducer(
    initialState,
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