import auth from '../src/auth'
import React from 'react'

import pkg from '../package.json'

describe('auth service', () => {
	test('has api adress', () => {
		expect(auth.api).toBe(pkg.ru_ursip.services['ursip-auth-service'])
	})

	test('exports types', () => {
		expect(auth.api).toBe(pkg.ru_ursip.services['ursip-auth-service'])
	})
})
