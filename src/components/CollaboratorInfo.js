import React from 'react';

const CollaboratorInfo = (props) => {
		return (
			<div style={{marginLeft: '10px'}}>
				<a href={props.html_url}>{ props.login }</a> collaborator in {props.repos} repos
			</div>
		);

};

export { CollaboratorInfo };