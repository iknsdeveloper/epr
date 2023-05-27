import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

// Define the shape of the UserState
export interface UserState {
  activeUser: string;
  userRole: string;
}

// Set the initial state
const initialState: UserState = {
  activeUser: '',
  userRole: ''
};

// Create the userSlice
const userSlice = createSlice({
  name: 'activeuser',
  initialState,
  reducers: {
    // Action to set the userRole
    setUserRole: (state, action: PayloadAction<string>) => {
      state.userRole = action.payload;
    },
    // Action to set the activeUser
    setActiveUser: (state, action: PayloadAction<string>) => {
      state.activeUser = action.payload;
    },
  },
});

// Export the actions
export const { setUserRole } = userSlice.actions;
export const { setActiveUser } = userSlice.actions;

// Selectors to access the state values
export const selectUserRole = (state: RootState): string => state.activeUser.userRole;
export const selectActiveUser = (state: RootState): string => state.activeUser.activeUser;

// Export the reducer
export default userSlice.reducer;
