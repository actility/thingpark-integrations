# Easy installation without building the app
1. Download the docker-compose.yml file and place it in a local folder
2. Enter to the folder
3. Run the following command
    ```
    docker-compose up --no-start
    ```

## Installation

Build the docker images:
```
docker-compose build
```

or if you dont want to create an image locally you can pull it from the repo
```
docker-compose build --pull
```

Create containers without starting them:
```
docker-compose up --no-start
```

Run containers in detached mode
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
