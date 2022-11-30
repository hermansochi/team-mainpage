import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	colorTheme: 'emerald'
}

const appSettingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		readColorTheme(state) {
			state.colorTheme = (localStorage.getItem('dcColorTheme') === null) ?
					initialState.colorTheme
				: 
					localStorage.getItem('dcColorTheme')
		},
		setColorTheme(state, action) {
			localStorage.setItem('dcColorTheme', action.payload.theme);
			state.colorTheme =  action.payload.theme;
		},
	},
	extraReducers: {
	}
});

export const { readColorTheme, setColorTheme } = appSettingsSlice.actions;

export default appSettingsSlice.reducer;
