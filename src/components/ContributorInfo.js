import React from 'react';

const ContributorInfo = (props) => {
		return (
			<div style={{marginLeft: '10px'}}>
					<a href={props.html_url}>{ props.login }</a> make {props.contributions} commits
			</div>
		);

};

export { ContributorInfo };