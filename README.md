# Auth Frontend

Frontend of Auth Service for the Open Tree Hole project.

## Deploy

Install
This installation is just for frontend program. If you want to deploy the whole OpenTreeHole project, please visit Deploy Repo.

This project continuously integrates with docker. Go check it out if you don't have docker locally installed.
1. Download the [docker-compose.yaml](https://github.com/OpenTreeHole/auth_frontend/blob/master/docker-compose.yaml).
    ```shell
    wget https://github.com/OpenTreeHole/auth_frontend/blob/master/docker-compose.yaml
    ```

2. Create a ```.env``` file under the same directory with ```docker-compose.yaml```.
    ```shell
    nano .env
    ```
    
    To know more about environmental variables in docker, visit [Environment variables in Compose](https://docs.docker.com/compose/environment-variables/).

3. Set all environmental variables. The required env variables are listed below.
   These env variables would be used to replace the bundled js by ```entryPoint.sh``` , and it uses  | as separator. **Thus, if you need to use | in your env variable, please use \ to trope it.**
   ```dotenv
   # .env file
   
   # The backend api address for Auth
   AUTH_URL=https://auth.fduhole.com/api/
   
   # The domain used to store cookie.
   # For local deployment, this should be localhost .
   COOKIE_DOMAIN=.fduhole.com
   ```

4. Docker Compose

   Check if the port 3001 is available. 
   You can change these port in ```docker-compose.yaml```.
   ```shell
   docker-compose up
   ```

5. Visit http://localhost:3001/ to see if the deployment is successful.

## Contribute

Feel free to dive in! [Open an issue](https://github.com/OpenTreeHole/auth_frontend/issues/new) or submit PRs.

### Development

```shell
# Clone the repository
git clone https://www.github.com/OpenTreeHole/auth_frontend.git
cd auth_frontend
# Install Dependencies
yarn
# Run The Dev Server
yarn serve
```


To build the project, run
```shell
yarn build
```

Confirm that you've modified the env variables in  ```.env.production```.

## Contributors

This project exists thanks to all the people who contribute.

<a href="https://github.com/OpenTreeHole/auth_frontend/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=OpenTreeHole/auth_frontend" />
</a>
