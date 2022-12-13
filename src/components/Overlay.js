import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

import { RepoInfo } from './RepoInfo';
import { LastCommitInfo } from './LastCommitInfo';
import { ContributorInfo } from './ContributorInfo';
import { CollaboratorInfo } from './CollaboratorInfo';
import { Avatar } from './Avatar';

const Overlay = () => {
	const location = useLocation();
	const { repos,
					commits,
					contributors,
					collaborators } = useSelector((state) => state.github);
	return (
			<div className="overlay">
				{ (location.pathname === '/') ?
					(
						<div className="overlay__contributors__container">
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
					(
						<div className="overlay__contributors__container">
							<h1 className="overlay__small__header__left">
								PRESS MB & DRAG
							</h1>
						</div>
					)
				}
				
				{ (location.pathname === '/') ?  
					(
						<div className="overlay__big__header__container">
							<Link to="/stats">
								<h1 className="overlay__big__header">
									HERMAN.TEAM
								</h1>
							</Link>
							<div className='avatar__container'>
								<ul className='avatar__list'>
									{
									(contributors.length > 0) ?
									contributors.slice(0,9).map((item) => <Avatar key={item.id} {...item} />)
									:
										null
									}
								</ul>
							</div>
						</div>
					)
					:
					(
						<div className="overlay__another__container">
							<Link to="/">
								<h1 className="overlay__small__header__right">
								&lt;&lt;BACK
								</h1>
							</Link>
						</div>
					)
				}

				{ (location.pathname === '/') ?
					(
					<div className="overlay__repos__container ">
						<div className="overlay__repos">
						{(repos.length > 10) ? 10 : repos.length} last changed repos:
						{
							(repos.length > 0) ?
								repos.slice(0,10).map((item) => <RepoInfo key={item.id} {...item} />)
							:
								null
						}
						</div>
					</div>
					)
					: null
				}
				{ (location.pathname === '/') ?
				(
					<div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }}>
					{
							(commits.length > 0) ?
								(<Link to="/commits">
									<LastCommitInfo key={commits[0].id} {...commits[0]} />
								</Link>)
							:
								null
						}
					</div>
				)
				:
				null
				}
			</div>
		);

};

export { Overlay };