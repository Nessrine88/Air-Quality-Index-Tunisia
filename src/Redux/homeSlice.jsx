import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const state = [
  'Mahdia',
  'gafsa',
  'Kairouan',
  'Kasserine',
  'Sousse',
  'Tozeur',
  'Sfax',
  'Gabes',
  'siliana',
  'kef',
  'jendouba',
  'beja',
  'ben arous',
  'ariana',
  'bizerte',
  'Kebili',
  'Manouba',
  'Medenine',
  'Tataouine',
  'zaghouan',
  'Tunis',
  'Sidi Bouzid',
];

const baseUrl = 'http://api.openweathermap.org/geo/1.0/direct?';
const apiKey = 'da5d82eee7c25e85e958368a9ea19ae9';
export const fetchCountries = createAsyncThunk('countries/fetchCountries', async () => {
  try {
    const countryDataArray = await Promise.all(
      state.map(async (city) => {
        const response = await axios.get(`${baseUrl}q=${city}&appid=${apiKey}`);
        return response.data;
      }),
    );
    const flattenedData = countryDataArray.flat();

    return flattenedData;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
});

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.fulfilled, (state, action) => ({
      ...state,
      data: action.payload,
    }));
  },
});

export default homeSlice.reducer;
