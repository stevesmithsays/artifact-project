import axios from 'axios';

//CONSTANTS
const SAVE_USER = "SAVE_USER";
const SAVE_PRODUCTS = "SAVE_PRODUCTS";
const ADD_TO_CART = "ADD_TO_CART";



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
        }).catch( (err) => {console.log(err)})
    }
}

//needs to be finished as of Monday 3/5/2018
export function addToCart(userId, productId, price){
    console.log('hit the function');
    //all three fields are still intact here with type of number
    console.log(` dfdfd user_id: ${ typeof userId}, product_id: ${typeof productId}, price: ${typeof price}`);
    return {
        type: ADD_TO_CART,
        payload: axios.post('/api/addtocart', {user_id: userId, product_id: productId, unit_price: price}).then( (res) => {            
            return res.data;
        }).catch( (err) => {console.log(err)})
    }
}

//INITIAL STATE
const initialState = {
    user: [],
    cart: [],
    isLoading: false,
    didErr: false,
    errMessage: null,
    products: []
};

//REDUCER
export default function reducer(state = initialState, action) {    console.log(action.type);
    switch(action.type) {        
        //cases go here
//SAVE_USER 
        case `${SAVE_USER}_PENDING`:
       
        return Object.assign( {}, state, {isLoading: true});

        case `${SAVE_USER}_FULFILLED`:
        
        return Object.assign( {}, state, {isLoading: false, user: action.payload});

        case `${SAVE_USER}_REJECTED`:
        
        return Object.assign( {}, state, {isLoading: false, didErr: true, errMessage: action.payload});
//SAVE_PRODUCTS 
        case `${SAVE_PRODUCTS}_PENDING`:
        return Object.assign( {}, state, {isLoading: true});

        case `${SAVE_PRODUCTS}_FULFILLED`:
        return Object.assign( {}, state, {isLoading: false, products: action.payload});

        case `${SAVE_PRODUCTS}_REJECTED`:
        return Object.assign( {}, state, {isLoading: false, didErr: true, errMessage: action.payload});
//ADD_TO_CART
        case `${ADD_TO_CART}_PENDING`:        
        return Object.assign({}, state, {isLoading: true});

        case `${ADD_TO_CART}_FULFILLED`:        
        return Object.assign( {}, state, {isLoading: false, cart: action.payload});

        case `${ADD_TO_CART}_REJECTED`:        
        return Object.assign( {}, state, {isLoading: false, didErr: true, errMessage: action.payload});

        
        default: 
        
        return state;

    }
}

