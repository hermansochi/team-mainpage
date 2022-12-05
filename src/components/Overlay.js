import React from 'react';
import { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchRepos, fetchCommits, fetchContributors, fetchCollaborators } from '../store/githubSlice';
import { RepoInfo } from './RepoInfo';
import { LastCommitInfo } from './LastCommitInfo';
import { ContributorInfo } from './ContributorInfo';
import { CollaboratorInfo } from './CollaboratorInfo';

const Overlay = () => {
	const location = useLocation();

  console.log('hash', location.hash);
  console.log('pathname', location.pathname);
  console.log('search', location.search);

	const dispatch = useDispatch();
	const { reposStatus, repos,
		commitsStatus, commits,
		contributorsStatus, contributors,
		collaboratorsStatus, collaborators } = useSelector((state) => state.github);
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

  }, [dispatch]);

		return (
			<div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
				{ (location.pathname === '/') ?
					(
						<div style={{ position: 'absolute', top: 40, left: 40, fontSize: '13px' }}>
							{(contributors.length > 10) ? 10 : contributors.length} most active contributors:
							{
								(contributors.length > 0) ?
								contributors.slice(0,9).map((item) => <ContributorInfo key={item.id} {...item} />)
								:
									null
							}
							{(collaborators.length > 10) ? 10 : collaborators.length} most active collaborators:
							{
								(collaborators.length > 0) ?
								collaborators.slice(0,9).map((item) => <CollaboratorInfo key={item.id} {...item} />)
								:
									null
							}
						</div>
					)
					:
						null
				}
				
				{ (location.pathname === '/') ?  
					(
						<div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate3d(-50%,-50%,0)' }}>
							<Link to="/stats">
								<h1 style={{ margin: 0, padding: 0, fontSize: '10em', fontWeight: 900, letterSpacing: '-0.05em' }}>HERMAN.TEAM</h1>
							</Link>
						</div>
					)
					:
					(
						<div style={{ position: 'absolute', top: 80, left: '50%', transform: 'translate3d(-50%,-50%,0)' }}>
							<Link to="/">
								<h1 style={{ margin: 0, padding: 0, fontSize: '5em', fontWeight: 900, letterSpacing: '-0.05em' }}>BACK</h1>
							</Link>
						</div>
					)
				}

				<div style={{ position: 'absolute', bottom: 40, left: 40, fontSize: '13px' }}>
					{(repos.length > 10) ? 10 : repos.length} last changed repos:
					{
						(repos.length > 0) ?
							repos.slice(0,10).map((item) => <RepoInfo key={item.id} {...item} />)
						:
							null
					}
				</div>
				<div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }}>
				{
						(commits.length > 0) ?
							<LastCommitInfo key={commits[0].id} {...commits[0]} />
						:
							null
					}
				</div>
			</div>
		);

};

export { Overlay };