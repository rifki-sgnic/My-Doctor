import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface LoadingState {
  isLoading: boolean;
  name: string;
}

const initialState: LoadingState = {
  isLoading: false,
  name: 'Rfkiii',
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    request: (state, action: PayloadAction<boolean>) => {
      console.log(action.type);
      state.isLoading = action.payload;
    },
    setName: state => {
      console.log(state.name);
      state.name = 'Sagenic';
    },
  },
});

export const {request, setName} = loadingSlice.actions;

export default loadingSlice.reducer;
