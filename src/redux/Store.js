import { createStore, applyMiddleware, compose } from 'redux';
import RootReducer from './reducers';
import ReduxThunk from 'redux-thunk';

const ConfigureStore = () => {
    let store = createStore(RootReducer, {}, compose(applyMiddleware(ReduxThunk)))
    return store;
}
export default ConfigureStore;