---
title: "Get started with ParadeDB extensions"
description: "set up a PostgreSQL instance with useful extensions from the ParadeDB project"
date: 2023-10-12T10:26:00+03:00
draft: false
---

####
#### 2023-10-12

## Introduction
I got really interested in the [ParadeDB](https://www.paradedb.com) project. It brings into the PostgreSQL world the power of the BM25 algorithm as implemented by [Tantivy](https://github.com/quickwit-oss/tantivy).
I've created a Docker image to experiment with the toolchain used.

## What's included?
- A `Dockerfile`
- A `docker-compose.yaml` file
## Instructions

- Run `git clone git@github.com:vtripolitakis/paradedb-docker.git`
- Go to the `paradedb-docker` folder
- Run `docker compose up -d`
- Open a connection to the PostgreSQL using the `psql` command (password is `postgres`): `psql -U postgres -h localhost`
- Create the following extensions inside PostgreSQL

```sql
CREATE EXTENSION pg_bm25;
CREATE EXTENSION vector;
CREATE EXTENSION search;
```

## What I can do next?

- Read the great documentation of the extensions used:
  - [pg_bm25](https://docs.paradedb.com/search/bm25) from [ParadeDB](https://www.paradedb.com/)
  - [pg_search](https://docs.paradedb.com/search/hybrid) from [ParadeDB](https://www.paradedb.com/)
  - [pgvector](https://github.com/pgvector/pgvector)

have fun!


