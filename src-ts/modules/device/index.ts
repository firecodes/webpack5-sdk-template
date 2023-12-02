import { Logger } from '../log/Logger';
import { UnsupportedError, InvalidStateError } from '../log/Errors';
import * as utils from '../utils';
import { AppData } from '../index';

const logger = new Logger('Device');

export type BuiltinHandlerName =
	| 'Chrome111'
	| 'Chrome74'
	| 'Chrome70'
	| 'Chrome67'
	| 'Chrome55'
	| 'Firefox60'
	| 'Safari12'
	| 'Safari11'
	| 'Edge11'
	| 'ReactNativeUnifiedPlan'
	| 'ReactNative';

export type DeviceOptions = {
	Handler?: string;
};

export function detectDevice(): BuiltinHandlerName | undefined {
	if (typeof navigator === 'object' && navigator.product === 'ReactNative') {
		logger.debug('detectDevice() | React-Native detected');
		if (typeof RTCPeerConnection === 'undefined') {
			logger.warn('detectDevice() |? RTCPeerConnection');
			return undefined;
		}
		if (typeof RTCRtpTransceiver !== 'undefined') {
			logger.debug('detectDevice() RTCRtpTransceiver');
			return 'ReactNativeUnifiedPlan';
		} else {
			logger.debug('detectDevice()');
			return 'ReactNative';
		}
	}
	// Browser.
	else if (typeof navigator === 'object' && typeof navigator.userAgent === 'string') {
		const ua = navigator.userAgent;
		logger.debug('detectDevice() Browser', ua);
	}
	// Unknown device.
	else {
		logger.warn('detectDevice() | unknown device');
		return undefined;
	}
}


export class Device {
	private _loaded = false;
	constructor({ Handler }: DeviceOptions = {}) {
		logger.debug('constructor()');
	}
	get loaded(): boolean {
		return this._loaded;
	}
}
