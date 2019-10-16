# init docker-compose file

init the docker-compose file, then modify the 
CHATHUB_GRPC_HOST
CHATHUB_GRPC_PORT
envvironment according to your [chathub](https://github.com/hawkwithwind/chat-bot-hub) configuration file.

```bash

cp docker-compose.sample.yml docker-compose.yml

```

# how to start

```bash

docker-compose up --build -d

```


after mock service started, it will connect to an existing chathub service and register as a client.