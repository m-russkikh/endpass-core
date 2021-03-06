const SETTINGS = 'INPAGE_PROVIDER_SETTINGS_EVENT';
const RESPONSE = 'INPAGE_PROVIDER_RESPONSE_EVENT';
const REQUEST = 'INPAGE_PROVIDER_REQUEST_EVENT';

export const INPAGE_EVENT = Object.freeze({
  SETTINGS,
  RESPONSE,
  REQUEST,
});

export const INFURA_KEY = 'zU4GTAQ0LjJNKddbyztc';

export const INPAGE_ID_PREFIX = 'ep_';

export const AVAILABLE_USER_META_PROPS = ['activeAccount'];

export const PROXY_REQUEST_PREFIX = 'endpass-identity';

export const HD_KEY_MNEMONIC_PATH = `m/44'/60'/0'/0`;
export const HARDWARE_DERIVIATION_PATH = `m/44'/60'/0'/0/`;

// Polling interval for web3
export const BLOCK_UPDATE_INTERVAL_MSEC = 15 * 1000;

export default {
  HD_KEY_MNEMONIC_PATH,
  INPAGE_EVENT,
  INFURA_KEY,
  BLOCK_UPDATE_INTERVAL_MSEC,
  INPAGE_ID_PREFIX,
  AVAILABLE_USER_META_PROPS,
  PROXY_REQUEST_PREFIX,
  HARDWARE_DERIVIATION_PATH,
};
