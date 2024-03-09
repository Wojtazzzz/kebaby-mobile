import Wretch from 'wretch';
import { API_URL } from './env';

export const api = Wretch(API_URL, {
	credentials: 'include',
	mode: 'cors',
}).headers({
	'X-Requested-With': 'XMLHttpRequest',
});
