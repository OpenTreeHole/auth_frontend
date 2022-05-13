import packageJson from '../package.json'

const config = {
  authUrl: process.env.VUE_APP_AUTH_URL,
  cookieDomain: process.env.VUE_APP_COOKIE_DOMAIN,
  version: packageJson.version
}

export default config
