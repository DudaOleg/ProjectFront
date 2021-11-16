const initialState = {
    allUsers: [],
    toggle: false
}


export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ALL_USERS' :
            return {...state, allUsers: action.allUsers }
        case 'TOGGLE' :
            return {...state, toggle: action.toggle }
        default: return  state;
    }
}