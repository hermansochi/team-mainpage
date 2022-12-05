import React from 'react';

const Iso8601toString = (date) => {
	let isoDateTime = new Date(date);
	return isoDateTime.toLocaleDateString() + " " + isoDateTime.toLocaleTimeString();
};

const RepoInfo = (props) => {
		return (
			<div>
					&nbsp;&nbsp;&nbsp;{ Iso8601toString(props.github_pushed_at) }
					&nbsp;&nbsp;&nbsp;<a href={props.html_url} title={`${props.description}`}>
						{ props.name }
					</a>
					&nbsp;&nbsp;&nbsp;({props.size}&#13189;/{props.forks}&#9282;/{props.watchers_count}&#8902;)
			</div>
		);

};

export { RepoInfo };