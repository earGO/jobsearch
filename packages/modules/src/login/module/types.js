import {auth as service} from '../../../import'

export const namespace = '@ursip-' + service.name

export const LOGIN = `${namespace}/LOGIN`
export const LOGOUT = `${namespace}/LOGOUT`
