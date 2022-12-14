import React from 'react';
import { Link } from "react-router-dom";

const Iso8601toString = (date) => {
	let isoDateTime = new Date(date);
	return isoDateTime.toLocaleDateString() + " " + isoDateTime.toLocaleTimeString();
};

const LastCommitInfo = (props) => {
		return (
			<>
				Last commit by { props.author_name }: <Link to="/commits">{props.message}</Link> 
			</>
		);

};

export { LastCommitInfo };