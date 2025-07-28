import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const user = JSON.parse(localStorage.getItem("user"));
const refreshToken = sessionStorage.getItem("refreshToken");

const initialState = {
    user: user ? user : null,
    roles: null,
    users: null,
    usersCount: null,
    //refreshToken: refreshToken ? refreshToken : null,
    error: false,
    success: false,
    loading: false,
    message: null,
};

// sign in an user

export const login = createAsyncThunk(
    "auth/login",
    async (user, thunkAPI) => {
        const data = await authService.login(user);

        // check for error
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.message)
        }

        return data;
    }
);

export const createUser = createAsyncThunk(
    "auth/createUser",
    async (body, thunkAPI) => {
        const data = await authService.createUser(body);

        //check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.message)
        }

        return data;
    }
)

export const putUser = createAsyncThunk(
    "auth/putUser",
    async({user, userId, body}, thunkAPI) => {
        const data = await authService.putUser(user, userId, body);
        
        if(data.status != 200){
            return thunkAPI.rejectWithValue(data.message);
        };

        return {status: data.status, message: data.message};
    }
)

export const addUserToRole = createAsyncThunk(
    "auth/addUserToRole",
    async ({user, body}, thunkAPI) => {
        const data = await authService.addUserToRole(user, body);

        //check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.message)
        }

        return data;
    }
)

export const removeUserFromRole = createAsyncThunk(
    "auth/removeUserFromRole",
    async ({user, email, rolename}, thunkAPI) => {
        const data = await authService.removeUserFromRole(user, email, rolename);

        //check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.message)
        }

        return data;
    }
)

export const removeUserFromAllRoles = createAsyncThunk(
    "auth/removeUserFromAllRoles",
    async ({user, email}, thunkAPI) => {
        const data = await authService.removeUserFromAllRoles(user, email);

        //check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.message)
        }

        return data;
    }
)

export const deleteUser = createAsyncThunk(
    "auth/deleteUser",
    async ({user, email}, thunkAPI) => {
        const data = await authService.deleteUser(user, email);

        //check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.message)
        }

        return data;
    }
)

export const getUsers = createAsyncThunk(
    "auth/getUsers",
    async ({ user, limit, offset, filters }, thunkAPI) => {
        const data = await authService.getUsers(user, limit, offset, filters);

        //check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.message)
        }

        return data;
    }
)

export const getRoles = createAsyncThunk(
    "auth/getRoles",
    async ({ user, limit, offset }, thunkAPI) => {
        const data = await authService.getRoles(user, limit, offset);

        //check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.message)
        }

        return data;
    }
)


//sign out an user
export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        await authService.logout();
    }
);

//refresh token without another login
/*export const refreshtoken = createAsyncThunk(
    "auth/refreshtoken",
    async(user, thunkAPI) => {
        const data = await authService.refreshToken(user);

        console.log("authSlice refreshtoken data: " + data)

        // check for error
        if(data.errors){
            return thunkAPI.rejectWithValue("refreshtoken slice rejected with error: "+data.message)
        }
        console.log("authslice refreshtoken executado com sucesso")
        return data
    }
);*/

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            console.log("Resetando estado...");
            state.loading = false;
            state.error = false;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // cases para Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = false;
                console.log("pending")
            }).addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.user = {
                    token: action.payload.token,
                    expiration: action.payload.expiration,
                    errors: action.payload.errors
                };
                state.refreshToken = action.payload.refreshToken;
                console.log("fulfilled")
            }).addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.user = null;
                console.log("rejected: " + state.error)
            })

            //cases para logout
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = false;
                console.log("pending")
            }).addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.user = null;
                state.refreshToken = null;
                console.log("fulfilled")
            })

            //cases para getUsers
            .addCase(getUsers.pending, (state) => {
                state.loading = true;
                state.error = false;
                console.log("pending")
            }).addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.users = action.payload.users;
                state.usersCount = action.payload.usersCount;
                console.log("fulfilled")
            }).addCase(getUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Erro ao buscar usuários";
                console.table("rejected: " + state.error)
            })
            
            //cases para getRoles
            .addCase(getRoles.pending, (state) => {
                state.loading = true;
                state.error = false;
                console.log("pending")
            }).addCase(getRoles.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.roles = action.payload.roles;
                console.log("fulfilled")
            }).addCase(getRoles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Erro ao buscar roles";
                console.table("rejected: " + state.error)
            })

            //cases para createUser
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = false;
                console.log("pending")
            }).addCase(createUser.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                console.log("fulfilled")
            }).addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Erro ao criar usuário";
                console.table("rejected: " + state.error)
            })

            //cases para putUser
            .addCase(putUser.pending, (state) => {
                state.loading = true;
                state.error = false;
                console.log("pending")
            }).addCase(putUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message || "Usuário alterado!";
                console.log("fulfilled")
            }).addCase(putUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Erro ao atualizar usuário usuário";
                console.table("rejected: " + state.error)
            })
           
            //cases para addUserToRole
            .addCase(addUserToRole.pending, (state) => {
                state.loading = true;
                state.error = false;
                console.log("pending")
            }).addCase(addUserToRole.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                console.log("fulfilled")
            }).addCase(addUserToRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Erro ao adicionar usuário á role";
                console.table("rejected: " + state.error)
            })

            //cases para removeUserFromRole
            .addCase(removeUserFromRole.pending, (state) => {
                state.loading = true;
                state.error = false;
                console.log("pending")
            }).addCase(removeUserFromRole.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                console.log("fulfilled")
            }).addCase(removeUserFromRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Erro ao remover usuário da role";
                console.table("rejected: " + state.error)
            })
           
            //cases para removeUserFromAllRoles
            .addCase(removeUserFromAllRoles.pending, (state) => {
                state.loading = true;
                state.error = false;
                console.log("pending")
            }).addCase(removeUserFromAllRoles.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                console.log("fulfilled")
            }).addCase(removeUserFromAllRoles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Erro ao remover usuário das roles";
                console.table("rejected: " + state.error)
            })

            //cases para deleteUser
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = false;
                console.log("pending")
            }).addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message || "Usuário deletado!";
                console.log("fulfilled")
            }).addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.status || "Erro ao remover usuário das roles";
                console.table("rejected: " + state.error)
            })


        // cases para refreshToken(desativado)
        /*.addCase(refreshtoken.pending,  (state)=>{
            state.loading = true;
            state.error = false;
            console.log("pending")
        }).addCase(refreshtoken.fulfilled, (state, action)=>{
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = {
                token: action.payload.accessToken,
                errors: action.payload.errors
            };
            state.refreshToken = action.payload.refreshToken;
            console.log("fulfilled")
        }).addCase(refreshtoken.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.user = null;
            console.log("rejected: " + state.error)
        })*/
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

