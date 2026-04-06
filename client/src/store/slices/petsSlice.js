import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from './../../api';

const PET_SLICE_NAME = 'pets';

const initialState = {
  pets: [],
  petTypes: [],
  isFetching: false,
  error: null,
  filter: {
    petType: null,
  },
};

export const getTypesThunk = createAsyncThunk(
  `${PET_SLICE_NAME}/get/types`,
  async (payload, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.getTypes();
      return data;
    } catch (error) {
      return rejectWithValue({ errors: error.response.data });
    }
  }
);

export const createPetThunk = createAsyncThunk(
  `${PET_SLICE_NAME}/create`,
  async (payload, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.createPet(payload);
      return data;
    } catch (error) {
      return rejectWithValue({ errors: error.response.data });
    }
  }
);

export const getPetsThunk = createAsyncThunk(
  `${PET_SLICE_NAME}/get`,
  async (payload, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.getPets(payload);
      return data;
    } catch (error) {
      return rejectWithValue({ errors: error.response.data });
    }
  }
);

const petsSlice = createSlice({
  name: PET_SLICE_NAME,
  initialState,
  reducers: {
    changePetTypeFilter: (state, { payload }) => {
      state.filter.petType = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getTypesThunk.fulfilled, (state, { payload }) => {
      state.petTypes = [...payload];
      state.error = null;
    });
    builder.addCase(getTypesThunk.rejected, (state, { payload }) => {
      state.error = payload;
    });

    builder.addCase(createPetThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(createPetThunk.fulfilled, (state, { payload }) => {
      state.pets.push(payload);
      state.isFetching = false;
      state.error = null;
    });
    builder.addCase(createPetThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });

    builder.addCase(getPetsThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getPetsThunk.fulfilled, (state, { payload }) => {
      state.pets = [...payload];
      state.isFetching = false;
      state.error = null;
    });
    builder.addCase(getPetsThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });
  },
});

const { reducer, actions } = petsSlice;

export const { changePetTypeFilter } = actions;

export default reducer;
