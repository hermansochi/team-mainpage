import React from 'react';

const Iso8601toString = (date) => {
	let isoDateTime = new Date(date);
	return isoDateTime.toLocaleDateString();
}

const CommitElement = (props) => {

return (
	<div className="commit__element">
		<div className="date">{Iso8601toString(props.author_date)}</div>
		<div className="details">Commit by {props.author_name}: {props.message}</div>
	</div>
	);
};

export { CommitElement };