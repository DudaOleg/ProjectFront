import './User.css'
import {deleteUser} from "../../../axios/API";
import {useDispatch, useSelector} from "react-redux";
import {store} from "../../../redux/Redux";
import {userReducer} from "../../../redux/reduser/User";

export default function User({users: {_id, userName, firstName, lastName, email, role}}) {
    const me = JSON.parse(localStorage.getItem('user'));
    const {toggle} = useSelector(store => store.userReducer);
    const dispatch = useDispatch();
    const removeUser = async (event) => {
        event.preventDefault()
        await deleteUser(_id);
        dispatch({type: 'TOGGLE', toggle: !toggle})
        if(me._id === _id) {
            localStorage.clear()
            window.location.href = '/authorization'
        }
    };

    const toggleBtn = me.role === 'admin' || _id === me._id ? true : false

    return (
        <div className={'usersForTable'}>
            <div>{userName}</div>
            <div>{firstName}</div>
            <div>{lastName}</div>
            <div>{email}</div>
            <div>{role}</div>
            {
                toggleBtn && <button onClick={(event) => removeUser(event)}
                                     className={'delete button red'}>Delete</button>
            }
        </div>
    )
}      