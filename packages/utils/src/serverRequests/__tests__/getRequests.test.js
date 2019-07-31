import {simpleGetRequest} from '../getRequests';
import serverRequests from '../.';
import fetchMock from 'fetch-mock';

/**
 * we gonna test if this util returns expected call from mock api,
 * and if it returns error, when api URL is wrong
 * */

const api = 'http://localhost:3000/user';
const apiWrong = 'http://localhost:3200/wrong';
const correct = {
	id: 'mr2w3s0m3',
	name: 'Barney',
	lastname: 'Stinson'
};

describe('Test serverRequests imports and exports serverRequests utils', () => {
	it('should call the api', async () => {
		fetchMock.get(api, correct);

		const response = await serverRequests.simpleGetRequest(api);
		const result = await response;

		expect(result).toEqual(correct);
	});
});
