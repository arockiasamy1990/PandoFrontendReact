import * as actionTypes from '../actions/actionTypes'
import axios from 'axios'

export const authstart=()=>{
    return {
        type:actionTypes.AUTH_START
    }
}

export const authFail=(error)=>{
    return {
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}
export const auth=(username,email,password,authmode)=>{
    return dispatch=>{
        dispatch(authstart());
        let mode='signin';
        if(authmode) {
            mode='signup';
        }
        const authData={
            name:username,
            email:email,
            password:password,
            mode:mode
        }
        axios.post('http://localhost/pando/v1/api/auth/user',{authData})
        .then(res=>{
            console.log(res);
            localStorage.setItem('userid',res.data.response.user_id);
            localStorage.setItem('expiration',res.data.response.expiration);
            dispatch(authSuccess(res.data.response.user_id));
            dispatch(checkTimeout(res.data.response.expiration));
        }).catch(error=>{
            console.log(error.response.data.response);
            dispatch(authFail(error.response.data.response));
        })
    }

}
export const authSuccess=(userid)=>{
    return {
        type:actionTypes.AUTH_SUCCESS,
        userid:userid
    }
}
export const checkTimeout=(expirationTime)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(authLogout())
        },expirationTime*1000);
    }

}
export const authLogout=()=>{
    localStorage.removeItem('userid');
    localStorage.removeItem('expiration')
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}
export const authCheckState=()=>{
    return dispatch=>{
        const userid=localStorage.getItem('userid');
        const expiration=localStorage.getItem('expiration');
        if(!userid) {
            dispatch(authLogout())
        } else{
            const expirationLimit=new Date((expiration*1000));
            if(expirationLimit <= new Date()){
                dispatch(authLogout());
            } else {
                dispatch(authSuccess(userid));
                dispatch(checkTimeout(((expirationLimit.getTime()-new Date().getTime())/1000)));
            }

        }

    }

}