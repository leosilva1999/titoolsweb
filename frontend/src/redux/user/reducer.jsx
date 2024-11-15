const initialState = {
    currentUser: null,
};

const userReducer = (state = initialState, action) => {
    if(action.type == "user/login"){
        return null;
    }
};

export default userReducer;