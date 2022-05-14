---
title: "Get started with Prisma - Part 0"
date: 2022-05-14T14:21:00+03:00
draft: false
---

## Part 0 - Setup a simple Prisma Project
#### 2022-05-14 - Vangelis Tripolitakis (vtripolitakis@_DONTSPAMME_me.com)

## Introduction
This is the first post of a series of mini (should take a few minutes) tutorials to get you started with Prisma. In this tutorial I set up the Prisma Client and print some attributes of a relation stored on a simple SQLite database (supplied). This tutorial has batteries included (`.env.example` and `db/mydb.sqlite`). You just need to have a recent node.js installed.

## What's included?
First clone this repo: [https://github.com/vtripolitakis/prisma-test](https://github.com/vtripolitakis/prisma-test)

This small repo gets you started with an SQLite database and Prisma/Typescript. In order to advance things fast, an [SQLite](https://github.com/jpwhite3/northwind-SQLite3) version of the Northwind database(supplied by MS Access back in the time) is supplied in the `db/mydb.sqlite` folder.

## Instructions

- Run `yarn install`
- Run `yarn prisma init`
- Copy `.env.example` to `.env` to use the simple sqlite database on `db` folder
- Edit `prisma/schema.prisma` and make sure the provider is `"sqlite"`

```
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```
- Use introspection to populate the `prisma.schema` and issue: `yarn prisma db pull`
- Run `yarn prisma generate` to generate the `@prisma/client` for this demo application

## What I can do next?

- Either run `yarn tsc` and then `node dist/` to see the Employees table on the console. 
- Or run `yarn prisma studio` to start Prisma Studio and check the supplied database.
-- Play around and have fun with the `src/index.ts`
- Wait the next tutorial on this series.

have fun!


