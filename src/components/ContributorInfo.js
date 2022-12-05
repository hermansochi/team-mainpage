import React from 'react';

const ContributorInfo = (props) => {
		return (
			<div>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<a href={props.html_url}>{ props.login }</a>
					&nbsp;make {props.contributions} commits
			</div>
		);

};

export { ContributorInfo };