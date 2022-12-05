import $api from "../http";

export default class githubService {
	static async getRepos(page, perPage, sort) {
		return $api.get('/github/repos', {
			params: {
				page: page,
				per_page: perPage,
				sort: sort
			}
		});
	}

	static async getCommits(page, perPage, sort) {
		return $api.get('/github/commits', {
			params: {
				page: page,
				per_page: perPage,
				sort: sort
			}
		});
	}

	static async getContributors(page, perPage, sort) {
		return $api.get('/github/contributors', {
			params: {
				page: page,
				per_page: perPage,
				sort: sort
			}
		});
	}

	static async getCollaborators(page, perPage, sort) {
		return $api.get('/github/collaborators', {
			params: {
				page: page,
				per_page: perPage,
				sort: sort
			}
		});
	}
}