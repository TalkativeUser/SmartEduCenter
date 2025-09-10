import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAllGroups } from '@/lib/api/groups';
import { Group } from '@/types';

interface GlobalState {
  groups: Group[];
  groupsLoading: boolean;
  groupsError: string | null;
}

const initialState: GlobalState = {
  groups: [],
  groupsLoading: false,
  groupsError: null,
};

// Async thunk for fetching groups
export const fetchGroupsThunk = createAsyncThunk(
  'global/fetchGroups',
  async () => {
    const response:any = await getAllGroups();
    return response.data;
  }
);

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupsThunk.pending, (state) => {
        state.groupsLoading = true;
        state.groupsError = null;
      })
      .addCase(fetchGroupsThunk.fulfilled, (state, action: PayloadAction<Group[]>) => {
        state.groupsLoading = false;
        state.groups = action.payload;
      })
      .addCase(fetchGroupsThunk.rejected, (state, action) => {
        state.groupsLoading = false;
        state.groupsError = action.error.message ?? "Failed to fetch groups";
      });
  },
});

export default globalSlice.reducer;