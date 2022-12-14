import React from 'react';
import styles  from './Avatar.module.css';

const Avatar = (props) => {

return (
		<li className={styles.avatar__item}>
				<a href={ props.html_url } className={styles.avatar__link}>
						<img src={ props.avatar_url } alt={ props.login } className={styles.avatar__img} />
				</a>
		</li>
	)
};

export { Avatar };