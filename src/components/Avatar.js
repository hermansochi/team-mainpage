import React from 'react';

const Avatar = (props) => {

return (
		<li className='avatar__item'>
				<a href={ props.html_url } className='avatar__link'>
						<img src={ props.avatar_url } alt={ props.login } className='avatar__img' width='100' height='100' />
				</a>
		</li>
	)
};

export { Avatar };