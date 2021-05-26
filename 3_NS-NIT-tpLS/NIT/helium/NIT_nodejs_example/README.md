# Easy installation without building the app
1. Create a directory and download the `docker-compose.yml` file to that directory
    ```
    mkdir tpxle-nit

    cd tpxle-nit
    
    curl https://raw.githubusercontent.com/actility/thingpark-integrations/main/3_NS-NIT-tpLS/NIT/helium/NIT_nodejs_example/docker-compose-prod.yml -o docker-compose.yml
    ```
2. Run the following command in the directory you created
    ```
    docker-compose up
    ```
3. Check if the server is working
    ```
    curl localhost:8081/test
    ```

# Buld and test the app in a development environment
## Installation

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

## Maintain the server

Test the server
    ```
    curl localhost:8081/test
    ```

Stop containers
    ```
    docker-compose stop
    ```

# Debugging

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
