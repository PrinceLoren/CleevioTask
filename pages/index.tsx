import { withLayout } from '../layout/Layout';
import { GetStaticProps } from 'next';
import axios from 'axios';
import styles from './main.module.css';

import SpainIcon from '../components/Icon/Spain';

function Home({ trips }): JSX.Element{
	return (
		<div>
			<div className={styles.tripsName}>Your trips</div>

			{trips.map((item, index) => {
				let flag;

				switch (item.address.country) {
					case 'Spain':
						flag = <SpainIcon />;    // e.t.c
						break;

					default: 
						break;
				}

				return (
					<div key={item.id + index} className={styles.trips}>
						<div className={styles.flag}>
							<div className={styles.flagIcon}>{flag}</div>
						</div>

						<div className={styles.infoTrip}>
							<div>{item.address.country}</div>
							{item.start_date.slice(0, 10)} - {item.end_date.slice(0, 10)}
							<div>
								{item.company_name}, {item.address.street},{' '}
								{item.address.street_num}, {item.address.city},{' '}
								{item.address.zip}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps = async () => {
	const { data: trips } = await axios.get(
		process.env.NEXT_PUBLIC_DOMAIN + 'api/trip',
		{ headers: { Authorization: `Bearer d7rZ43r4K3nCEOz08Z7d` } }
	);
	return {
		props: {
			trips,
		},
	};
};
