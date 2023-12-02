import debug from 'debug'
export { debug }
import * as modules from './modules'
export { modules }
import { Device, detectDevice } from './modules/device'
export { Device, detectDevice }

export const version = '__SDK_CLIENT_VERSION__'