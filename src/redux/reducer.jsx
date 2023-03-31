import { combineReducers } from 'redux';

// reducer import
import userReducer from './userReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    user: userReducer,
});

export default reducer;