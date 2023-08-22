import axios from 'axios';

export const apiCall = (url) => {
	axios.get(url).then((response) => {
		console.log(response);
	});
};
