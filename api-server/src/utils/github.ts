import axios from 'axios';

export const getGithubUser = (accessToken: string, scopes = 'repo, user') => {
	return axios
    .get(`${process.env.GITHUB_API_BASE_URL}/user`, {
			headers: {
				"Authorization": `Bearer ${accessToken}`,
				"X-OAuth-Scopes": scopes,
			},
		})
    .then((res) => res.data);
}

export const getGithubEmail = (accessToken: string) => {
	return axios.get(`${process.env.GITHUB_API_BASE_URL}/user/emails`, {
		headers: {
			"Authorization": `Bearer ${accessToken}`,
		}
	}).then((res) => res.data);
}
