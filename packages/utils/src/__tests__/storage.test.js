import {checkIfUnauthorized} from '../storage'

test('checkIfUnauthorized works on empty object', () => {
	checkIfUnauthorized()
	checkIfUnauthorized({})
})

test('checkIfUnauthorized is false for 404 errors', () => {
	expect(checkIfUnauthorized({status: 404})).toBe(false)
})

test('checkIfUnauthorized is false if message not include 401', () => {
	expect(
		checkIfUnauthorized({status: 500, data: {message: 'some text'}})
	).toBe(false)
})
test('checkIfUnauthorized is true if message include 401', () => {
	expect(
		checkIfUnauthorized({status: 500, data: {message: 'some text 401 '}})
	).toBe(true)
})
