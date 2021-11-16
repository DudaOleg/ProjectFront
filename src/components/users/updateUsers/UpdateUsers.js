import {useHistory} from "react-router-dom";
import {useReducer} from "react";
import {updateUser} from "../../../axios/API";

function reducer(state, action) {
    switch (action.type) {
        case 'NAME':
            return {...state, userName: action.value};
        case 'FIRST':
            return {...state, firstName: action.value};
        case 'SURNAME':
            return {...state, lastName: action.value};
        case 'EMAIL':
            return {...state, userEmail: action.value};
        case 'PASSWORD':
            return {...state, userPassword: action.value};
        default:
            return state;
    }
}

export default function UpdateUsers() {

    const history = useHistory();

    let [{userName, firstName, lastName, email, password}, dispatch] = useReducer(reducer,
        {userName: '', firstName: '', lastName: '', email: '', password: ''});

    const user = JSON.parse(localStorage.getItem('user'));


    const onForm = async (event) => {
        event.preventDefault()

        try {

            if (userName === '') userName = user.userName
            if (firstName === '') firstName = user.firstName
            if (lastName === '') lastName = user.lastName
            if (email === '') email = user.email

            const response = password === ''
                ? await updateUser(user._id, {userName, firstName, lastName, email})
                : await updateUser(user._id, {userName, firstName, lastName, email, password})

            localStorage.setItem('user', JSON.stringify(response.data));

            history.push('/users');

        } catch (err) {

        }

    }

    return (
        <div className={'wrapperForms'}>
            <form className={'onForm'} onSubmit={onForm} action={'/'} method='post'>
                <input placeholder={user.userName}
                       type={'text'}
                       value={userName}
                       onChange={({target: {value}}) => dispatch({type: 'NAME', value})}
                />
                <input placeholder={user.firstName}
                       type={'text'}
                       value={firstName}
                       onChange={({target: {value}}) => dispatch({type: 'FIRST', value})}
                />
                <input placeholder={user.lastName}
                       type={'text'}
                       value={lastName}
                       onChange={({target: {value}}) => dispatch({type: 'LAST', value})}
                />
                <input placeholder={user.email}
                       type={'text'}
                       value={email}
                       onChange={({target: {value}}) => dispatch({type: 'EMAIL', value})}
                />
                <input placeholder={'password'}
                       type={'text'}
                       value={password}
                       onChange={({target: {value}}) => dispatch({type: 'PASSWORD', value})}
                />
                <button className={'button blue'} type="submit">Update</button>
            </form>
        </div>
    )
}      