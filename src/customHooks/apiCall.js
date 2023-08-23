import axios from 'axios';

export const apiCall = (url) => {
	axios
		.get(url)
		.then((response) => {
			return response;
		})
		.then((result) => {
			console.log(result);
		});
};
