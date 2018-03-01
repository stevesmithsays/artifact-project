import axios from 'axios';

//CONSTANTS
const SAVE_USER = "SAVE_USER";
const SAVE_PRODUCTS = "SAVE_PRODUCTS";

//ACTION CREATORS
//becomes the action.payload in the reducer
export function saveUser(){
    //whatever is posted can be accessed on the backend through req.body via body parser
    return {
        type: SAVE_USER,
        payload: axios.get('/api/currentuser').then( (res) =>{                         
            return res.data;
        }).catch( (err) => {return err.message})
    }
}

export function saveProducts(){
    return {
        type: SAVE_PRODUCTS,
        payload: axios.get('/api/products').then( (res) => {
            return res.data;
        }).catch( (err) => {return err.message})
    }
}

//INITIAL STATE
const initialState = {
    user: [],
    isLoading: false,
    didErr: false,
    errMessage: null,
    products: []
};

//REDUCER
export default function reducer(state = initialState, action) {    
    switch(action.type) {
        //cases go here
        case `${SAVE_USER}_PENDING`:
       
        return Object.assign( {}, state, {isLoading: true});

        case `${SAVE_USER}_FULFILLED`:
        
        return Object.assign( {}, state, {isLoading: false, user: action.payload});

        case `${SAVE_USER}_REJECTED`:
        
        return Object.assign( {}, state, {isLoading: false, didErr: true, errMessage: action.payload});
//SAVE_PRODUCTS REDUCERS
        case `${SAVE_PRODUCTS}_PENDING`:
        return Object.assign( {}, state, {isLoading: true});

        case `${SAVE_PRODUCTS}_FULFILLED`:
        return Object.assign( {}, state, {isLoading: false, products: action.payload});

        case `${SAVE_PRODUCTS}_REJECTED`:
        return Object.assign( {}, state, {isLoading: false, didErr: true, errMessage: action.payload});
        
        default: 
        
        return state;

    }
}

