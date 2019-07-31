import React from 'react'
import {DynamicModuleLoader} from 'redux-dynamic-modules'
import oshsEmployeesModule from './module/employees'
import formSelectsModule from './module/formSelects'
import delegationModule from './module/delegation'
import Main from './Main'
import {baseRoute} from './module/departments'

function Oshs(props) {
	return (
		<DynamicModuleLoader
			modules={[oshsEmployeesModule, formSelectsModule, delegationModule]}
		>
			<Main {...props} />
		</DynamicModuleLoader>
	)
}

Oshs.baseRoute = baseRoute

export default Oshs
