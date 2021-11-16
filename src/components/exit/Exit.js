import {exitUser} from "../../axios/API";
import './Exit.css'

export default function Exit() {

    const exit = async () => {
        try {
            const _id = localStorage.getItem('_id')
            const response = await exitUser({_id})

            if (response.status === 204) {
                localStorage.clear()
                window.location.href = '/authorization'
            }

        } catch (err) {

        }
    }

    return (
        <div className={'headerExit'}>
            <button className={'button black'} onClick={() => exit()}>Exit</button>
        </div>
    )
}      