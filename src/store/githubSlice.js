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

export const fetchContributors = createAsyncThunk(
	'github/fetchContributors',
	async ({page, perPage, sort}, {rejectWithValue}) => {
		try {
			const response = await githubService.getContributors(page, perPage, sort);
			return response.data;
		} catch (error) {
				return rejectWithValue(error);
		}
	}
);

export const fetchCollaborators = createAsyncThunk(
	'github/fetchCollaborators',
	async ({page, perPage, sort}, {rejectWithValue}) => {
		try {
			const response = await githubService.getCollaborators(page, perPage, sort);
			return response.data;
		} catch (error) {
				return rejectWithValue(error);
		}
	}
);

const distinctContributors = (data) => {
	return Object.values(data.reduce((acc,curr)=>{
		(acc[curr.login] = acc[curr.login] || {id: curr.id, login: curr.login, html_url: curr.html_url,  contributions: 0}).contributions += curr.contributions;
		return acc;
	}, {}));
};

const distinctCollaborators = (data) => {
	return Object.values(data.reduce((acc,curr)=>{
		(acc[curr.login] = acc[curr.login] || {id: curr.id, login: curr.login, html_url: curr.html_url,  repos: 0}).repos++;
		return acc;
	}, {}));
};


const initialState = {
	repos: [],
	commits: [],
	contributors: [],
	collaborators: [],
	reposStatus: null,
	reposError: null,
	commitsStatus: null,
	commitsError: null,
	contributorsStatus: null,
	contributorsError: null,
	collaboratorsStatus: null,
	collaboratorsError: null,
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
		builder.addCase(fetchContributors.pending, (state) => {
			state.contributorsStatus = 'loading';
			state.contributorsError = null;
		});
		builder.addCase(fetchContributors.fulfilled, (state, action) => {
				state.contributorsStatus = 'resolved';
				state.commitsError = null;
				state.contributors = distinctContributors(action.payload.data);
		});
		builder.addCase(fetchContributors.rejected, (state, action) => {
			state.contributorsStatus = 'rejected';
			state.contributorsError = action.payload.response.data;
		});
		builder.addCase(fetchCollaborators.pending, (state) => {
			state.collaboratorsStatus = 'loading';
			state.collaboratorsError = null;
		});
		builder.addCase(fetchCollaborators.fulfilled, (state, action) => {
				state.collaboratorsStatus = 'resolved';
				state.collaboratorsError = null;
				state.collaborators = distinctCollaborators(action.payload.data);
		});
		builder.addCase(fetchCollaborators.rejected, (state, action) => {
			state.collaboratorsStatus = 'rejected';
			state.collaboratorsError = action.payload.response.data;
		});
	}
});

//export const {  } = githubSlice.actions;

export default githubSlice.reducer;
