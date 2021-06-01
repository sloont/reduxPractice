import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';

let lastId = 0;

const bugsSlice = createSlice({
    name: 'bugs',
    initialState: {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        bugsRequested: (bugs, action) => {
            bugs.loading = true;
        },
        bugsReceived: (bugs, action) => {
            bugs.list = action.payload;
            bugs.loading = false;
        },
        bugsRequestFailed: (bugs, action) => {
            bugs.loading = false;
        },
        bugAssignedToUser: (bugs, action) => {
            const { bugId, userId } = action.payload;
            const index = bugs.list.findIndex(bug => bug.id === bugId);
            bugs.list[index].userId = userId;
        },

        bugAdded: (bugs, action) => {
            bugs.list.push({
                id: ++lastId,
                description: action.payload.description,
                resolved: false
            });
        },
        bugRemoved: (bugs, action) => {
            return bugs.list.filter(bug => bug.id !== action.payload.id);
        },
        bugResolved: (bugs, action) => {
            let index = bugs.list.findIndex(bug => bug.id === action.payload.id);
            bugs.list[index].resolved = true;
        }
    }
})

const url = "/bugs";
//action creators
export const loadBugs = () => {
     return apiCallBegan({
        url,
        onStart: bugsRequested.type,
        onSuccess: bugsReceived.type,
        onError: bugsRequestFailed.type
        
    });
}


export const { bugAdded, bugRemoved, bugResolved, bugAssignedToUser, bugsReceived, bugsRequested, bugsRequestFailed } = bugsSlice.actions;
export default bugsSlice.reducer;
//selector

export const selectUnresolvedBugs = createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter(bug => !bug.resolved)
);

export const selectBugsByUser = (userId) => createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter(bug => bug.userId === userId)
);