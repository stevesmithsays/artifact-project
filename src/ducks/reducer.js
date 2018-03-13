import axios from 'axios';

//CONSTANTS
const SAVE_USER = "SAVE_USER";
const SAVE_PRODUCTS = "SAVE_PRODUCTS";
const ADD_TO_CART = "ADD_TO_CART";
const GET_CART = "GET_CART";
const DELETE_FROM_CART = 'DELETE_FROM_CART';
const UPDATE_PROFILE = 'UPDATE_PROFILE';




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


export function addToCart(userId, productId, price){       
    return {
        type: ADD_TO_CART,
        payload: axios.post('/api/addtocart', {user_id: userId, product_id: productId, unit_price: price}).then( (res) => {      
            return res.data;
        }).catch( (err) => {console.log(err)})
    }
}

export function getCart(){
    return {
        type: GET_CART,
        payload: axios.get('/api/getcart').then( (res) => {
            return res.data;
        }).catch( (err) => {console.log(err)})
    }
}

export function deleteFromCart(productId){
    console.log(productId);
    return {
        type: DELETE_FROM_CART,
        payload: axios.delete(`api/cart/${productId}`, {data: {"product": productId}}).then( (res) => {
            return res.data;
        }).catch ( (err) => {console.log(err)})
    }
}

//updates the current user's profile in the database
export function updateProfile(style, origin, id){
    
   
    return {
        type: UPDATE_PROFILE,
        payload: axios.put(`/api/profile/${id}`, {favorite_style: style, favorite_origin: origin}).then( (res) =>{
            return res.data;

        }).catch((err) => {console.log(err)})
    }
}

//INITIAL STATE
const initialState = {
    user: [],
    cart: [],
    profile: [],
    isLoading: false,
    didErr: false,
    errMessage: null,
    products: []
};

//REDUCER
export default function reducer(state = initialState, action) {
    console.log(action.type);
    switch(action.type) {      
       
//SAVE_USER 
        case `${SAVE_USER}_PENDING`:
       
        return Object.assign({}, state, {isLoading: true});

        case `${SAVE_USER}_FULFILLED`:
        
        return Object.assign({}, state, {isLoading: false, user: action.payload});

        case `${SAVE_USER}_REJECTED`:
        
        return Object.assign({}, state, {isLoading: false, didErr: true, errMessage: action.payload});
//SAVE_PRODUCTS 
        case `${SAVE_PRODUCTS}_PENDING`:
        return Object.assign({}, state, {isLoading: true});

        case `${SAVE_PRODUCTS}_FULFILLED`:
        return Object.assign({}, state, {isLoading: false, products: action.payload});

        case `${SAVE_PRODUCTS}_REJECTED`:
        return Object.assign( {}, state, {isLoading: false, didErr: true, errMessage: action.payload});
//ADD_TO_CART
        case `${ADD_TO_CART}_PENDING`:        
        return Object.assign({}, state, {isLoading: true});

        case `${ADD_TO_CART}_FULFILLED`:        
        return Object.assign({}, state, {isLoading: false, cart: action.payload});

        case `${ADD_TO_CART}_REJECTED`:        
        return Object.assign({}, state, {isLoading: false, didErr: true, errMessage: action.payload});
//GET_CART
        case `${GET_CART}_PENDING`:
        return Object.assign({}, state, {isLoading: true});

        case `${GET_CART}_FULFILLED`:
        return Object.assign({}, state, {isLoading: false, cart: action.payload});

        case `${GET_CART}_REJECTED`:
        return Object.assign({}, state, {isLoading: false, didErr: true, errMessage: action.payload});
//DELETE_FROM_CART
        case `${DELETE_FROM_CART}_PENDING`:
        return Object.assign({}, state, {isLoading: true});

        case `${DELETE_FROM_CART}_FULFILLED`:
        return Object.assign({}, state, {isLoading: false, cart: action.payload});

        case `${DELETE_FROM_CART}_REJECTED`:
        return Object.assign({}, state, {isLoading: false, errMessage: action.payload});
//UPDATE_PROFILE
        case `${UPDATE_PROFILE}_PENDING`:
        return Object.assign({}, state, {isLoading: true});

        case `${UPDATE_PROFILE}_FULFILLED`:
        return Object.assign({}, state, {isLoading: false, profile: action.payload});

        case `${UPDATE_PROFILE}_REJECTED`:
        return Object.assign({}, state, {isLoading: false, didErr: true, errMessage: action.payload});
        
        default: 
        
        return state;

    }
}

