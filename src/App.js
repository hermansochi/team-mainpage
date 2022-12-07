import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRepos,
        fetchCommits,
        fetchCommitsStats,
        fetchCommitsByDay,
        fetchContributors,
        fetchCollaborators } from './store/githubSlice';
import Main from './pages/Main';
import ContributionsGraph from './pages/ContributionsGraph';
import Commits from './pages/Commits';
import { Routes, Route } from "react-router-dom";

export default function App() {
  const dispatch = useDispatch();
	const { reposStatus, 
          commitsStatus,
          commitsStatsStatus,
          commitsByDayStatus,
          contributorsStatus,
          collaboratorsStatus } = useSelector((state) => state.github);
	useEffect(() => {
		if (reposStatus !== 'loading') {
			dispatch(fetchRepos({page: 1, perPage:10, sort:'-pushed'}));
		}
		if (commitsStatus !== 'loading') {
			dispatch(fetchCommits({page: 1, perPage:10, sort:'-date'}));
		}
		if (contributorsStatus !== 'loading') {
			dispatch(fetchContributors({page: 1, perPage:100, sort:'-contributions'}));
		}
		if (collaboratorsStatus !== 'loading') {
			dispatch(fetchCollaborators({page: 1, perPage:100, sort:'login'}));
		}
		if (commitsByDayStatus !== 'loading') {
			dispatch(fetchCommitsByDay({page: 1, perPage:300, sort:'-date'}));
		}
    if (commitsStatsStatus !== 'loading') {
			dispatch(fetchCommitsStats());
		}
  }, [dispatch]);
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/stats' element={<ContributionsGraph />} />
      <Route path='/commits' element={<Commits />} />
    </Routes>
  );
}
