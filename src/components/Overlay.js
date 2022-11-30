import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRepos } from '../store/githubSlice';
import { RepoInfo } from './RepoInfo';

const Overlay = () => {
	const dispatch = useDispatch();
	const { reposStatus, repos } = useSelector((state) => state.github);
	useEffect(() => {
		if (reposStatus !== 'loading') {
			dispatch(fetchRepos({page: 1, perPage:10, sort:'-pushed'}));
		}
  }, [dispatch]);

		return (
			<div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
				<div style={{ position: 'absolute', bottom: 40, left: 40, fontSize: '13px' }}>
					<a href="https://github.com/hermansochi">
						herman.team
					</a>
					<br />
					dev collective: <a href="https://github.com/hermansochi">hermansochi</a>, 
					<a href="https://github.com/AnderyDov">AnderyDov</a>, 
					<a href="https://github.com/CodeMashine">Petr</a>, 
					<a href="https://github.com/AnderyDov">Anna Semenenko</a>
				</div>
	
				<div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate3d(-50%,-50%,0)' }}>
					<h1 style={{ margin: 0, padding: 0, fontSize: '10em', fontWeight: 900, letterSpacing: '-0.05em' }}>HERMAN.TEAM</h1>
				</div>
				<div style={{ position: 'absolute', top: 40, left: 40, fontSize: '13px' }}>
					Last { repos.length } changed repos:
					{
						(repos.length > 0) ?
							repos.map((item) => <RepoInfo key={item.id} {...item} />)
						:
							null
					}
				</div>
				<div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }}>
					Last commit: 
				</div>
			</div>
		);

};

export { Overlay };