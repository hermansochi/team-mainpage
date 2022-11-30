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

	/*
	static async hideLdapUser(id, hide) {
		return $api.patch(`/ldapusers/${id}`, {id: id, hide: hide});
	} */
}