import React from 'react';
import { Link } from "react-router-dom";

const LastCommitInfo = (props) => {
	let message = (props.message.length > 85) ? props.message.substr(0, 85) + '...' :  props.message;
		return (
			<>
				Last commit by { props.author_name }:<br /> <Link to="/commits">{message}</Link> 
			</>
		);

};

export { LastCommitInfo };