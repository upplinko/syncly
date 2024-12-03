import { createSlice } from '@reduxjs/toolkit';

const meetingsSlice = createSlice({
  name: 'meetings',
  initialState: {
    upcomingMeetings: [],
    pastMeetings: []
  },
  reducers: {
    addMeeting: (state, action) => {
      state.upcomingMeetings.push(action.payload);
    },
    removeMeeting: (state, action) => {
      state.upcomingMeetings = state.upcomingMeetings.filter(
        meeting => meeting.id !== action.payload
      );
    }
  }
});

export const { addMeeting, removeMeeting } = meetingsSlice.actions;
export default meetingsSlice.reducer;
