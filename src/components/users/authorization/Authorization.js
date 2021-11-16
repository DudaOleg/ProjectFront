import {useReducer} from "react";
import {authUser} from "../../../axios/API";

function reducer(state, action) {
    switch (action.type) {
        case 'EMAIL':
            return {...state, email: action.value};
        case 'PASS':
            return {...state, password: action.value};
        default:
            return state;
    }
}

export default function Auth() {

    const [{email, password}, dispatcher] =
        useReducer(reducer, {email: '', password: ''});

    const onForm = async (event) => {
        try {
            event.preventDefault()

            if (!email || !password) return

            const response = await authUser({email, password});
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('_id', response.data.user._id);
            window.location.href = '/users'

        } catch (err) {

        }
    };


    return (
        <div className={'wrapperForms'}>
            <form className={'onForm'} onSubmit={onForm} action={'/authorization'} method='post'>

                <input placeholder={'Електронна адреса'} type={'email'} value={email}
                       onChange={({target: {value}}) => dispatcher({type: 'EMAIL', value})}/>

                <input placeholder={'пароль'} type={'text'} value={password}
                       onChange={({target: {value}}) => dispatcher({type: 'PASS', value})}/>


                <button className={'button blue'} type="submit" disabled={!email || !password}>
                    Увійти
                </button>
            </form>
        </div>
    )
}
