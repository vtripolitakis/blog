---
title: "Use Caddy with Docker to proxy localhost services"
description: "Use Caddy with Docker to proxy localhost services"
date: 2024-02-19T17:26:00+03:00
draft: false
---

####
#### 2024-02-19

## Introduction
I wanted to setup a reverse proxy to some local services running on my host with Caddy running on a Docker container.
Caddy is versatile and super-easy to setup for basic tasks like these. Why? Because I don't want to install Caddy on my host.
I've created an example Docker compose file and a sample Caddyfile.

## What's included?
- A `Caddyfile`
- A `docker-compose.yaml` file

## Caddyfile
This is a simple Caddyfile setting up an HTTP host on port 8085 with the following configuration:

- `/db` proxying couchdb running on localhost, port 5984
- `/api` proxying an API running on localhost, port 5050
-  proxying a frontend running on localhost, port 3000

As you may see `host.docker.internal` is a trick to get the IP of the host running the Docker container.
Nevertheless, it needs on more step, shown on the `docker-compose.yaml` file below.

```sh
http://localhost:8085 {
    handle_path /db* {
        reverse_proxy host.docker.internal:5984
    }

    handle_path /api* {
	reverse_proxy host.docker.internal:5050
    }

    handle_path /* {
        reverse_proxy host.docker.internal:3000
    }
}
```

## docker-compose.yaml
These lines instruct the Docker to pass the host IP to the Caddy container, resolving as `host.docker.internal`:
```sh
extra_hosts:
  - host.docker.internal:host-gateway
```
Here's the `docker-compose.yaml` file:

```sh
version: "3.9"
services:
  develop-reverse-proxy:
    image: caddy:latest
    ports:
      - "8085:8085"
    extra_hosts:
      - host.docker.internal:host-gateway
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
```


## Instructions

- Save `Caddyfile and docker-compose.yaml` in a folder
- Inside this folderm run `docker compose -f ./docker-compose.yaml up'

have fun!


