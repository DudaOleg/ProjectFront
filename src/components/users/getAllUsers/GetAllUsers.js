import {BrowserRouter, useHistory} from "react-router-dom";
import {useEffect} from "react";
import {getAllUser} from "../../../axios/API";
import {useDispatch, useSelector} from "react-redux";
import {userReducer} from "../../../redux/reduser/User";
import Exit from "../../exit/Exit";
import User from "./User";
import './GetAllUsers.css'

export default function GetAllUsers() {

    const history = useHistory();
    const {allUsers, toggle} = useSelector(store => store.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        getAllUser().then(({data}) => {
            dispatch({type: 'ALL_USERS', allUsers: data})
        })
    }, [toggle]);

    return (
        <BrowserRouter>
            <Exit/>
            <div className={'buttonsInAllUsers'}>
                <button className={'button green'} onClick={() => {
                    history.push('/create')
                }}>Create User
                </button>
                <button className={'button blue'} onClick={() => {
                    history.push(`/update`)
                }}>Update User
                </button>
            </div>
            <div className={'headerAllUsers'}>
                <div className={'titlesForTable'}>
                    <div>USER NAME</div>
                    <div>FIRST NAME</div>
                    <div>LAST NAME</div>
                    <div>EMAIL</div>
                    <div>TYPE</div>
                </div>
                {
                    allUsers.map(user => <User key={user._id} users={user}/>)
                }
            </div>
        </BrowserRouter>
    )
}      
