import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import githubService from '../services/githubService';

export const fetchRepos = createAsyncThunk(
	'github/fetchRepos',
	async ({page, perPage, sort}, {rejectWithValue}) => {
		try {
			const response = await githubService.getRepos(page, perPage, sort);
			return response.data;
		} catch (error) {
				return rejectWithValue(error);
		}
	}
);

export const fetchCommits = createAsyncThunk(
	'github/fetchCommits',
	async ({page, perPage, sort}, {rejectWithValue}) => {
		try {
			const response = await githubService.getCommits(page, perPage, sort);
			return response.data;
		} catch (error) {
				return rejectWithValue(error);
		}
	}
);

const initialState = {
	repos: [],
	commits: [],
	reposStatus: null,
	reposError: null,
	commitsStatus: null,
	commitsError: null,
};

const githubSlice = createSlice({
	name: 'github',
	initialState,
	reducers: {
/*		readColorTheme(state) {
			state.colorTheme = (localStorage.getItem('dcColorTheme') === null) ?
					initialState.colorTheme
				: 
					localStorage.getItem('dcColorTheme')
		},
		setColorTheme(state, action) {
			localStorage.setItem('dcColorTheme', action.payload.theme);
			state.colorTheme =  action.payload.theme;
		}, */
	},
	extraReducers: (builder) => {
		builder.addCase(fetchRepos.pending, (state) => {
			state.reposStatus = 'loading';
			state.reposError = null;
		});
		builder.addCase(fetchRepos.fulfilled, (state, action) => {
				state.reposStatus = 'resolved';
				state.reposError = null;
				state.repos = action.payload.data;
		});
		builder.addCase(fetchRepos.rejected, (state, action) => {
			state.reposStatus = 'rejected';
			state.reposError = action.payload.response.data;
		});
		builder.addCase(fetchCommits.pending, (state) => {
			state.commitsStatus = 'loading';
			state.commitsError = null;
		});
		builder.addCase(fetchCommits.fulfilled, (state, action) => {
				state.commitsStatus = 'resolved';
				state.commitsError = null;
				state.commits = action.payload.data;
		});
		builder.addCase(fetchCommits.rejected, (state, action) => {
			state.commitsStatus = 'rejected';
			state.commitsError = action.payload.response.data;
		});
	}
});

//export const {  } = githubSlice.actions;

export default githubSlice.reducer;
