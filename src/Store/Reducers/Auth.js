import * as actionTypes from '../actions/actionTypes'

const intialState={
        userid:null,
        error:null,
        loading:false
}
const Authreducer=(state=intialState,action)=>{
    switch (action.type) {
        case actionTypes.AUTH_START:
            return{
                ...state,
                loading:true,
                error:null
            } 
         case actionTypes.AUTH_SUCCESS:
             return {
                 ...state,
                 loading:false,
                 userid:action.userid
             }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading:false,
                error:action.error
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                loading:false,
                userid:null
            }
        default:
            return state;
    }

}

export default Authreducer;