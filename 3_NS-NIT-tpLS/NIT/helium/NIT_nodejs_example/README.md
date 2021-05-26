# Helium Network Interface Translator for ThingPark X Location Engine

## Easy installation without building the app
0. Make sure that beyond docker engine you have [docker-compose](https://docs.docker.com/compose/install/) available on your platform.  
1. Create a flolder structure for the config and the persistent db of the app:
    ```
    mkdir -p tpxle-nit/redis-data
    cd tpxle-nit
    ```
1. Download the `docker-compose-prod.yml` file from this repo.
   Execute the following command from the previously created `tpxle-nit` folder.
    ```
    curl https://raw.githubusercontent.com/actility/thingpark-integrations/main/3_NS-NIT-tpLS/NIT/helium/NIT_nodejs_example/docker-compose-prod.yml -o docker-compose.yml
    ```
2. Run the following command from the same directory the `docker-compose.yml` file is located.
    ```
    docker-compose up -detach
    ```
3. Check if the server is working
    ```
    curl http://localhost:8081/test
    ```
4. For a production platform we recommend to configure an nginx reverse proxy so that `http://localhost:8081` is mapped to a public `https://<public-domain-name>/tpxle-nit` web page with proper certifications. For that the following text need to be added to the nginx server configuration:
    ```
    location /tpxle-nit/ {
        proxy_pass http://localhost:8081/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    ```

## Build and test the app in a development environment
### Installation

1. Clone this repo and enter to the folder of this project
2. Build the docker images:
    ```
    docker-compose build
    ```
3. Create containers without starting them:
    ```
    docker-compose up --no-start
    ```
4. Run containers in detached mode
    ```
    docker-compose up --detach
    ```

All previous tasks with one single command:
    ```
    docker-compose up --build --detach
    ```

### Maintain the server

Test the server
    ```
    curl localhost:8081/test
    ```

Stop containers
    ```
    docker-compose stop
    ```

## Debugging

Connect to the app container via CLI:
    ```
    docker container exec -it tpxle_nit_app /bin/sh
    ```

Check if the app is running:
    ```
    ps -ef
    ```

If the server is not running start the app manually:
    ```
    npm start
    ```
