const config = {
  authUrl: 'https://auth.fduhole.com/api/',
  cookieDomain: '.fduhole.com'
}

const testConfig = {
  authUrl: 'https://testAuth.fduhole.com/api/',
  cookieDomain: 'localhost:8080'
}

export default process.env.NODE_ENV === 'production' ? config : { ...config, ...testConfig }
