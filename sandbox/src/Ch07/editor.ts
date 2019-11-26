import {createStore,Action, Store, Reducer} from 'redux'
import {Lens,lens} from './lens'
import { Address, Street, company } from './immutability'
class ReducerAction<T>{
    constructor(readonly payload : (state:T)=>T){}
}

class Editor<T,F>{
    constructor(readonly store : Store<T,Action<ReducerAction<T>>>,readonly lens : Lens<T,F>){}
    getValue():F{
        return this.lens.get(this.store.getState())
    }
    updateValue(newValue:F){
        this.store.dispatch({type:new ReducerAction(x=>this.lens.set(newValue,x))})
    }
}

const editorReducer = <T>(state:T, action : Action<ReducerAction<T>>) :  T => {
    if(!action) return state;    
    else return action.type.payload(state)
}


const addressReducer = (state:Address = company.address, action : Action<ReducerAction<Address>>) :  Address => {
    if(!action.type.payload) return state;    
    else return action.type.payload(state)

}
const store = createStore(addressReducer)

const _addressStreetLens = lens<Address,"street">("street")
const _streetNameLens = lens<Street,"name">("name")
const _streetNumLens = lens<Street,"num">("num")
const addressCityLens = lens<Address,"city">("city");
const streetNameLens = _addressStreetLens.compose(_streetNameLens)
const streetNumLens = _addressStreetLens.compose(_streetNumLens)


const addressCityNameEditor = new Editor(store,addressCityLens)
const streetNameEditor = new Editor(store,streetNameLens)
const streetNumEditor = new Editor(store,streetNumLens)

console.log(store.getState());

addressCityNameEditor.updateValue("shanghai")
streetNumEditor.updateValue(12)
streetNameEditor.updateValue("handan")

console.log(store.getState());


