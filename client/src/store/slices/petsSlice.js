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
    city: null,
    dateFrom: null,
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

export const deletePetThunk = createAsyncThunk(
  `${PET_SLICE_NAME}/delete`,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await API.deletePetById(payload);
      console.log('delete response', response);
      return payload;
    } catch (error) {
      return rejectWithValue({ errors: error.response.data });
    }
  }
);

export const updatePetThunk = createAsyncThunk(
  `${PET_SLICE_NAME}/update`,
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.updatePetById(id, values);
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
    changeCityFilter: (state, { payload }) => {
      state.filter.city = payload;
    },
    changeDateFromFilter: (state, { payload }) => {
      state.filter.dateFrom = payload;
    },
  },
  // Get Pet Types
  extraReducers: builder => {
    builder.addCase(getTypesThunk.fulfilled, (state, { payload }) => {
      state.petTypes = [...payload];
      state.error = null;
    });
    builder.addCase(getTypesThunk.rejected, (state, { payload }) => {
      state.error = payload;
    });

    // Create Pet
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

    // Get Pet
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

    // Update Pet
    builder.addCase(updatePetThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(updatePetThunk.fulfilled, (state, { payload }) => {
      const index = state.pets.findIndex(p => p.id === payload.id);
      if (index !== -1) state.pets[index] = payload;
      state.error = null;
      state.isFetching = false;
    });
    builder.addCase(updatePetThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });

    // Delete Pet
    builder.addCase(deletePetThunk.fulfilled, (state, { payload }) => {
      state.pets = state.pets.filter(p => p.id !== payload);
      state.error = null;
      state.isFetching = false;
    });
    builder.addCase(deletePetThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });
  },
});

const { reducer, actions } = petsSlice;

export const { changePetTypeFilter, changeCityFilter, changeDateFromFilter } =
  actions;

export default reducer;
