export const initialState = {
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    patronymic: "",
    avatarId: null,
    role: "ANON",
    gender: "NONE"
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return {
                ...state,
                id: action.id,
                email: action.email,
                firstName: action.firstName,
                lastName: action.lastName,
                patronymic: action.patronymic,
                avatarId: action.avatarId,
                role: action.role,
                gender: action.gender
            };
        default:
            return state;
    }
};

export default userReducer;