import React from 'react';

const CollaboratorInfo = (props) => {
		return (
			<div>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<a href={props.html_url}>{ props.login }</a>
					&nbsp;collaborator in {props.repos} repos
			</div>
		);

};

export { CollaboratorInfo };