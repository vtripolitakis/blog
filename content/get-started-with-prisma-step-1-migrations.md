---
title: "Get started with Prisma - Step 1 - Migrations"
description: Perform some migrations"
date: 2022-05-22T20:42:00+03:00
draft: false
---

# Step 1 - Migrations
## Author: Vangelis Tripolitakis

## https://v.trp.gr - vtripolitakis@me.com - 22/05/2022

## What's this?
Today we'll cover migrations in Prisma. We'll create a couple of models, add some data and
perform respective queries. We'll extend the current schema with clients and product reviews.

## Instructions

I suppose you've already read the instructions of step 0 [here](https://v.trp.gr/posts/get-started-with-prisma-step-0/) and you've got some response from the hello-world-like example. 

If you're bored do a `git fetch` and switch to the `step1` branch (`git checkout step1`), copy `.env.example` to `.env`, run `yarn prisma generate` and skip the next steps. 

Otherwise...

- First we need to create an initial migration, so let's do it: `yarn prisma migrate dev --name initial-migration`. This will require you to delete existing data. For convenience, I've already supplied a dump in the `prisma` folder, named `mydb_initial.sql`. 
- Run `cat db/mydb_initial.sql | sqlite3 ./db/mydb.sqlite` to reimport data.
- Now let's add the `Clients` table. Add this to the `prisma/schema.prisma` file:

```bash
model Client {
  Id           Int     @id @default(autoincrement())
  ClientName String?
  ClientSurname  String?
}
```
- Run `yarn prisma migrate dev` to generate the respective migration and of course generate a new `@prisma/client` for this application.
- Now the Prisma client knows how to handle the `Client` table.
- Now let's add the `Review` model and make changes to the `Product` and `Client` models. Add these lines to the `prisma/schema.prisma` file:

```bash
model Review {
  grade        Int
  clientId     Int
  productId    Int
  client     Client        @relation(fields: [clientId], references: [Id])
  product     Product        @relation(fields: [productId], references: [Id])
  @@id([clientId, productId])
}

```
Change `Client` as shown below:
```bash
model Client {
  Id           Int     @id @default(autoincrement())
  ClientName String?
  ClientSurname  String?
  Review       Review[]
}
```
Change `Product` as follows:
```bash
model Product {
  Id              Int     @id @default(autoincrement())
  ProductName     String?
  SupplierId      Int
  CategoryId      Int
  QuantityPerUnit String?
  UnitPrice       Decimal
  UnitsInStock    Int
  UnitsOnOrder    Int
  ReorderLevel    Int
  Discontinued    Int
  Review          Review[]
}
```
- Run `yarn prisma migrate dev --name add-reviews`, check the new migration that was made inside `prisma/migrations`.
- Now the Prisma client knows how to handle the updated `Client` and `Product` models and their M:N relation through the `Review` model.

## What I can do next?
- Run `yarn prisma studio` to start Prisma Studio and check the changes. Add some clients and some reviews.
- Run `yarn tsc ./src/index.ts` and then `node dist/index.js` to see the Clients and the Reviews table on the console. 
- Play around and have fun with the `src/step1.ts`