import debug from 'debug'
export { debug }
import * as modules from './modules'
export { modules }
import { Device, detectDevice } from './modules/device'
export { Device, detectDevice }

export const version = '__SDK_CLIENT_VERSION__'
import io from 'socket.io-client';
import * as MediasoupClient from "mediasoup-client";
export default MediasoupClient;
export { io };
window.IO = io
window.MediasoupClientWindow = MediasoupClient
window.console.log("window:", window)

