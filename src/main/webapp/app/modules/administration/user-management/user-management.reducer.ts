import axios from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { IUser, defaultValue } from 'app/shared/model/user.model';
import { IQueryParams, serializeAxiosError } from 'app/shared/reducers/reducer.utils';

const initialState = {
  loading: false,
  errorMessage: null,
  users: [] as ReadonlyArray<IUser>,
  authorities: [] as any[],
  user: defaultValue,
  updating: false,
  updateSuccess: false,
  totalItems: 0,
};

const apiUrl = 'api/users';
const adminUrl = 'api/admin/users';

// Async Actions

export const getUsers = createAsyncThunk('userManagement/fetch_users', async ({ page, size, sort }: IQueryParams) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return axios.get<IUser[]>(requestUrl);
});

export const getUsersAsAdmin = createAsyncThunk('userManagement/fetch_users_as_admin', async ({ page, size, sort }: IQueryParams) => {
  const requestUrl = `${adminUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return axios.get<IUser[]>(requestUrl);
});
export const getUsersTodos = createAsyncThunk('userManagement/fetch_users_as_admin', async () => {
  const requestUrl = `${adminUrl}/todos`;
  return axios.get<IUser[]>(requestUrl);
});

export const getUsersPorRol = createAsyncThunk('userManagement/fetch_users_porRol', 
  async (autoridad: string) => {
  const requestUrl = `${apiUrl}/autoridad/${autoridad}`;
  return axios.get<IUser[]>(requestUrl);
});


export const getRoles = createAsyncThunk('userManagement/fetch_roles', async () => {
  return axios.get<any[]>(`api/authorities`);
});
export const getRolesJson = createAsyncThunk('userManagement/fetch_rolesJSON', async () => {
  return axios.get<any[]>(`api/authoritiesJson`);
});

export const getRolesJsonok = async () => {
  const requestUrl = `api/authoritiesJson`;
  return axios.get(requestUrl);
};

export const contarRetosbyEcosistemas = async id => {
  const requestUrl = `${apiUrl}/contarEcosistemas/${id}`;
  return axios.get(requestUrl);
};

export const getReportePdf = async () => {
  const requestUrl = `${adminUrl}/export-pdf`;
  return axios.get<any>(requestUrl);
};

export const getUser = createAsyncThunk(
  'userManagement/fetch_user',
  async (id: string) => {
    const requestUrl = `${adminUrl}/${id}`;
    return axios.get<IUser>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const createUser = createAsyncThunk(
  'userManagement/create_user',
  async (user: IUser, thunkAPI) => {
    const result = await axios.post<IUser>(adminUrl, user);
    thunkAPI.dispatch(getUsersTodos());
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const updateUser = createAsyncThunk(
  'userManagement/update_user',
  async (user: IUser, thunkAPI) => {
    const result = await axios.put<IUser>(adminUrl, user);
    thunkAPI.dispatch(getUsersTodos());
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const deleteUser = createAsyncThunk(
  'userManagement/delete_user',
  async (id: string, thunkAPI) => {
    const requestUrl = `${adminUrl}/${id}`;
    const result = await axios.delete<IUser>(requestUrl);
    thunkAPI.dispatch(getUsersTodos());
    return result;
  },
  { serializeError: serializeAxiosError }
);

export type UserManagementState = Readonly<typeof initialState>;

export const UserManagementSlice = createSlice({
  name: 'userManagement',
  initialState: initialState as UserManagementState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getRoles.fulfilled, (state, action) => {
        state.authorities = action.payload.data;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(deleteUser.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
        state.user = defaultValue;
      })
      .addMatcher(isFulfilled(getUsers, getUsersAsAdmin, getUsersTodos,getUsersPorRol), (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.totalItems = parseInt(action.payload.headers['x-total-count'], 10);
      })
      .addMatcher(isFulfilled(createUser, updateUser), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.user = action.payload.data;
      })
      .addMatcher(isPending(getUsers, getUsersAsAdmin, getUsersTodos,getUsersPorRol), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isPending(createUser, updateUser, deleteUser), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      })
      .addMatcher(
        isRejected(getUsers, getUsersAsAdmin, getUser, getRoles, getRolesJson, createUser, updateUser, deleteUser,getUsersPorRol),
        (state, action) => {
          state.loading = false;
          state.updating = false;
          state.updateSuccess = false;
          state.errorMessage = action.error.message;
        }
      );
  },
});

export const { reset } = UserManagementSlice.actions;

// Reducer
export default UserManagementSlice.reducer;
