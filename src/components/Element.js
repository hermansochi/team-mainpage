import React from 'react';

const Element = (props) => {

return (
		<div
			className="element"
			style={{backgroundColor: 'rgba(0,127,127,' + (Math.random() * 0.5 + 0.25)}}
		>
			<div className="number">
				May 22
			</div>
			<div className="symbol">
				22
			</div>
			<div className="details">
				Commit by:<br />
				Herman
			</div>
		</div>
	);
};

export { Element };