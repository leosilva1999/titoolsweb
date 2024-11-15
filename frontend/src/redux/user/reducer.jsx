const initialState = {
    currentUser: null,
};

const userReducer = (state = initialState, action) => {
    if(action.type == "user/login"){
        return "10";
    }
    return "20";
};

export default userReducer;