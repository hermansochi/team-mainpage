import React from 'react';

const Iso8601toString = (date) => {
	let isoDateTime = new Date(date);
	return isoDateTime.toLocaleDateString() + " " + isoDateTime.toLocaleTimeString();
};

const LastCommitInfo = (props) => {
		return (
			<div>
				Last commit by { props.author_name } at {Iso8601toString(props.author_date)}
				&nbsp;Commit: {props.message}
			</div>
		);

};

export { LastCommitInfo };