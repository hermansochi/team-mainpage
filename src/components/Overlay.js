import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RepoInfo } from './RepoInfo';
import { LastCommitInfo } from './LastCommitInfo';
import { ContributorInfo } from './ContributorInfo';
import { CollaboratorInfo } from './CollaboratorInfo';
import styles from './Overlay.module.css';
import aStyles from './Avatar.module.css';
import { Loader } from './Loader';
import { Avatar } from './Avatar';

const Overlay = () => {
	const [fullResolved, setResolved] = useState(false);
	const location = useLocation();
	const { repos, reposStatus,
					commits, commitsStatus,
					contributors, contributorsStatus,
					collaborators, collaboratorsStatus,
					commitsByDayStatus, commitsStatsStatus
				} = useSelector((state) => state.github);
	useEffect(() => {
		if (reposStatus === 'resolved'
				&& commitsStatus === 'resolved'
				&& contributorsStatus === 'resolved'
				&& collaboratorsStatus === 'resolved'
				&& commitsStatsStatus === 'resolved'
				&& commitsByDayStatus === 'resolved'
				) setResolved(true);
	}, [
		reposStatus,
		commitsStatus,
		contributorsStatus,
		collaboratorsStatus,
		commitsByDayStatus
	]);

	let leftTopContent = null;
	if (location.pathname === '/') {
		if (contributorsStatus === 'resolved' && collaboratorsStatus === 'resolved') {
			leftTopContent = (
				<div>
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
			);
		} 
	} else {
		leftTopContent = <div className={styles.small_header}>PRESS MB & DRAG</div>;
	}

	let rightTopContent = null;
	if (location.pathname === '/') {
		rightTopContent = null;
	} else {
		rightTopContent = <div className={styles.small_header}><Link to="/">&lt;&lt;BACK</Link></div>;
	}

	let headerContent = null;
	if (location.pathname === '/') {
		headerContent = (fullResolved) ? (
			<>
				<div className={styles.big_header}>
					<Link to="/stats">HERMAN TEAM</Link> 
				</div>
				<div>
				<div className={aStyles.avatar__container}>
					<ul className={aStyles.avatar__list}>	{
						(contributors.length > 0) ?
							contributors.slice(0,9).map((item) => <Avatar key={item.id} {...item} />)
						:
							null
						}
					</ul>
				</div>
				</div>
			</>
		) : <Loader />;
	}

	let leftBottomContent = null;
	if (location.pathname === '/') {
		if (reposStatus === 'resolved') {
			leftBottomContent = (
				<div>
					{(repos.length > 10) ? 10 : repos.length} last changed repos:
					{
						(repos.length > 0) ?
							repos.slice(0,10).map((item) => <RepoInfo key={item.id} {...item} />)
						:
							null
					}
				</div>
			);
		} 
	}

	let rightBottomContent = null;
	if (location.pathname === '/') {
		if (commitsStatus === 'resolved') {
			rightBottomContent = (
				<div>
					{
						(commits.length > 0) ?
							<>
								<LastCommitInfo key={commits[0].id} {...commits[0]} />
							</>
						:
							null
					}
				</div>
			);
		} 
	}

	return (

		<div className={styles.overlay}>
			<div className={styles.angry_grid}>
				<div className={styles.left_top_item}>
					{leftTopContent}
				</div>
				<div className={styles.right_top_item}>
					{rightTopContent}
				</div>
				<div className={styles.header_item}>
					{ headerContent }
				</div>
				<div className={styles.left_bottom_item}>
					{ leftBottomContent }
				</div>
				<div className={styles.right_bottom_item}>
					{ rightBottomContent }
				</div>
			</div>
		</div>


	);
};

export { Overlay };