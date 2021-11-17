import {useReducer} from "react";
import {createUser} from "../../../axios/API";
import {useHistory} from "react-router-dom";
import './CreateUser.css'

function reducer(state, action) {
    switch (action.type) {
        case 'USER_NAME':
            return {...state, userName: action.value};
        case 'FIRST':
            return {...state, firstName: action.value};
        case 'LAST':
            return {...state, lastName: action.value};
        case 'EMAIL':
            return {...state, email: action.value};
        case 'PASSWORD':
            return {...state, password: action.value};
        case 'RESPONSE':
            return {...state, resp: action.payload};
        default:
            return state;
    }
}

export default function CreateUser() {

    const history = useHistory();

    const [{userName, firstName, lastName, email, password, resp}, dispatch] = useReducer(reducer,
        {userName: '', firstName: '', lastName: '', email: '', password: '', resp: ''})

    const onForm = async (event) => {
        event.preventDefault()


        try {

            await createUser({userName, firstName, lastName, email, password});

            history.push('/');

        } catch (err) {
            dispatch({type: 'RESPONSE', payload: err.response.data.message});
        }

    }

    return (
        <div className={'wrapperForm'}>
            {
                resp && <div className={'red respons'}>{resp}</div>
            }
            <form className={'form'} onSubmit={onForm} action={'/'} method='post'>
                <input placeholder={'user name'}
                       type={'text'}
                       value={userName}
                       onChange={({target: {value}}) => dispatch({type: 'USER_NAME', value})}
                />
                <input placeholder={'first name'}
                       type={'text'}
                       value={firstName}
                       onChange={({target: {value}}) => dispatch({type: 'FIRST', value})}
                />
                <input placeholder={'last name'}
                       type={'text'}
                       value={lastName}
                       onChange={({target: {value}}) => dispatch({type: 'LAST', value})}
                />
                <input placeholder={'email'}
                       type={'text'}
                       value={email}
                       onChange={({target: {value}}) => dispatch({type: 'EMAIL', value})}
                />
                <input placeholder={'password'}
                       type={'text'}
                       value={password}
                       onChange={({target: {value}}) => dispatch({type: 'PASSWORD', value})}
                />
                <button className={'button green'} type="submit">Create</button>
            </form>
        </div>
    )
}
