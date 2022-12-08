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

export const fetchCommitsByDay = createAsyncThunk(
	'github/fetchCommitsByDay',
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

export const fetchCommitsStats = createAsyncThunk(
	'github/fetchCommitsStats',
	async (_, {rejectWithValue}) => {
		try {
			const response = await githubService.getCommitsStats();
			return response.data;
		} catch (error) {
				return rejectWithValue(error);
		}
	}
);

const distinctContributors = (data) => {
	return Object.values(data.reduce((acc,curr)=>{
		(acc[curr.login] = acc[curr.login] || {id: curr.id, login: curr.login, avatar_url: curr.avatar_url, html_url: curr.html_url,  contributions: 0}).contributions += curr.contributions;
		return acc;
	}, {}));
};

const distinctCollaborators = (data) => {
	return Object.values(data.reduce((acc,curr)=>{
		(acc[curr.login] = acc[curr.login] || {id: curr.id, login: curr.login, html_url: curr.html_url,  repos: 0}).repos++;
		return acc;
	}, {}));
};


const prepareCommitsStats = (state) => {

	const currentYear = new Date().getFullYear();
	const currentMonth = new Date().getMonth();
	const currentDay = new Date().getDate();
	const days = Array.from({length: 120}, (_, i) => {
		return {date: new Date(currentYear, currentMonth, currentDay - (i - 1)).toISOString().substring(0, 10),
			commits: 0,
			authors: null};
	});
	
	state.commitsStats = days;
};

const countCommitsStats = (oldState, data) => {
	let obj = Object.values(data.reduce((acc,curr)=>{
		(acc[curr.date] = acc[curr.date] || {date: curr.date, commits: 0, authors: null}).commits += curr.commits;
		return acc;
	}, {}));

	const mergedArray = [...obj, ...oldState];

	let set = new Set();
	let unionArray = mergedArray.filter((item) => {
			if (!set.has(item.date)) {
					set.add(item.date);
					return true;
			}
			return false;
	}, set);

	return unionArray;
};

const initialState = {
	repos: [],
	commits: [],
	contributors: [],
	collaborators: [],
	commitsByDay: [],
	commitsStats: [],
	reposStatus: null,
	reposError: null,
	commitsStatus: null,
	commitsError: null,
	contributorsStatus: null,
	contributorsError: null,
	collaboratorsStatus: null,
	collaboratorsError: null,
	commitsByDayStatus: null,
	commitsByDayError: null,
	commitsStatsStatus: null,
	commitsStatsError: null,
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
		builder.addCase(fetchCommitsByDay.pending, (state) => {
			state.commitsByDayStatus = 'loading';
			state.commitsByDayError = null;
		});
		builder.addCase(fetchCommitsByDay.fulfilled, (state, action) => {
				state.commitsByDayStatus = 'resolved';
				state.commitsByDayError = null;
				state.commitsByDay = action.payload.data;
		});
		builder.addCase(fetchCommitsByDay.rejected, (state, action) => {
			state.commitsByDayStatus = 'rejected';
			state.commitsByDayError = action.payload.response.data;
		});
		builder.addCase(fetchCommitsStats.pending, (state) => {
			state.commitsStatsStatus = 'loading';
			state.commitsStatsError = null;
		});
		builder.addCase(fetchCommitsStats.fulfilled, (state, action) => {
				state.commitsStatsStatus = 'resolved';
				state.commitsStatsError = null;
				prepareCommitsStats(state);
				state.commitsStats = countCommitsStats(state.commitsStats, action.payload.data);
		});
		builder.addCase(fetchCommitsStats.rejected, (state, action) => {
			state.commitsStatsStatus = 'rejected';
			state.commitsStatsError = action.payload.response.data;
		});
	}
});

//export const {  } = githubSlice.actions;

export default githubSlice.reducer;
