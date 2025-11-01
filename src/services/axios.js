import axios from 'axios';

export const APP_ENVIRONMENT = 'development';

export let BASE_ENDPOINT = '';

// @ts-ignore
if (APP_ENVIRONMENT === 'local') {
  BASE_ENDPOINT = 'http://localhost:5000';
} else if (APP_ENVIRONMENT === 'development') {
  BASE_ENDPOINT = 'https://api.dev.chimein.ink';
} else if (APP_ENVIRONMENT === 'staging') {
  BASE_ENDPOINT = 'https://api.stg.chimein.ink';
} else if (APP_ENVIRONMENT === 'production') {
  BASE_ENDPOINT = 'https://api.chimein.ink';
}

const BASE_URL = `${BASE_ENDPOINT}/api/v1`;

export default axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  withCredentials: true,
});
