import { createAction, props } from "@ngrx/store";
import { IngresoEgreso } from "../models/ingreso-egreso.model";

export const setItem = createAction(
    "[IngresoEgreso] Set Item",
    props<{ item: IngresoEgreso }>()
);
export const setItems = createAction(
    "[IngresoEgreso] Set Items",
    props<{ items: IngresoEgreso[] }>()
);
export const unSetItems = createAction("[IngresoEgreso] UnSet Items");