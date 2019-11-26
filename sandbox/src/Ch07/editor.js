"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lens_1 = require("./lens");
const redux_1 = require("redux");
class ReducerAction {
    constructor(payload) {
        this.payload = payload;
    }
}
class Editor {
    constructor(store, lens) {
        this.store = store;
        this.lens = lens;
    }
    getValue() {
        return this.lens.get(this.store.getState());
    }
    updateValue(newValue) {
        this.store.dispatch({ type: new ReducerAction(x => this.lens.set(x, newValue)) });
    }
}
const editorReducer = (state, action) => {
    if (!action)
        return state;
    else
        return action.type.payload(state);
};
const addressReducer = (state = lens_1.a1, action) => {
    if (!action.type.payload)
        return state;
    else
        return action.type.payload(state);
};
const store = redux_1.createStore(addressReducer);
const _addressStreetLens = lens_1.lens("street");
const _streetNameLens = lens_1.lens("name");
const _streetNumLens = lens_1.lens("num");
const addressCityLens = lens_1.lens("city");
const streetNameLens = lens_1.compose(_addressStreetLens, _streetNameLens);
const streetNumLens = lens_1.compose(_addressStreetLens, _streetNumLens);
const addressCityNameEditor = new Editor(store, addressCityLens);
const streetNameEditor = new Editor(store, streetNameLens);
const streetNumEditor = new Editor(store, streetNumLens);
console.log(store.getState());
addressCityNameEditor.updateValue("shanghai");
streetNumEditor.updateValue(12);
streetNameEditor.updateValue("handan");
console.log(store.getState());
