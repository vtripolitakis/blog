---
title: "Devspace.sh quick start"
description: "A quick and dirty guide to get started with devspace.sh"
date: 2024-12-18T13:15:55+03:00
draft: false
---

####
#### 2024-12-18

**Introduction**
--------------------------------------

**Devspace Demo Setup: A Step-by-Step Guide**
=====================================================

Devspace is a cool tool that allows you to develop applications as close as possible to a Kubernetes installation. In this blog post, I'll walk you through the setup process for a demo environment containing a basic application consisting of Flask and React.js using Devspace. I'll also provide instructions on how to add a `devspace.sh` file if it's not already present in your project.

**Prerequisites**
---------------

* Make sure you have Devspace installed on your machine. If not, head over to the [Devspace installation guide - **https://www.devspace.sh/docs/getting-started/installation**](https://www.devspace.sh/docs/getting-started/installation) to get started.
* You'll also need a Kubernetes context and namespace set up. If you're new to Kubernetes, consider using [**Kind**](https://kind.sigs.k8s.io/) as a local environment.
* Docker is a pre-requisite, so make sure you have it installed.

**Step 0: Clone the demo repo**
--------------------------------------

```bash
git clone git@github.com:vtripolitakis/devspace_demo.git
cd devspace_demo
```

**Step 1: Set up Context and Namespace**
--------------------------------------

Open your terminal and run the following commands to set up your Kubernetes context and namespace:
```bash
devspace use context your_kubernetes_context
devspace use namespace your_kubernetes_namespace
```
Replace `your_kubernetes_context` and `your_kubernetes_namespace` with your actual context and namespace names.

**Step 2: Build Images**
----------------------

Next, build the images required for your demo environment by running:
```bash
make build
```
This command will create the necessary Docker images for your backend and frontend services.

**Step 3: Run Devspace**
----------------------

Now it's time to start Devspace:
```bash
make up
```
This command will deploy your services to your Kubernetes environment. You should see two services running: a backend service powered by Flask on port 5000 and a frontend service powered by Vite on port 5173.

**Step 4: Stop Devspace**
----------------------

When you're done exploring your demo environment, press `Ctrl + C` to exit and then run:
```bash
make down
```
This command will stop and remove the Devspace deployment.

**Optional: Cleanup Images**
---------------------------

If you need to clean up the images created during the demo, run:
```bash
make clean
```
**Bonus: Adding devspace.sh (if not present)**
--------------------------------------

If your project doesn't have a `devspace.sh` file, you can create one by running:
```bash
devspace init
```
This command will create a basic `devspace.sh` file in your project root. You can then customize it to fit your specific needs.

**Bonus: Using Kind as a Local Kubernetes Environment**
---------------------------------------------

For a seamless experience, consider using [**Kind**](https://kind.sigs.k8s.io/) as a local Kubernetes environment. Kind allows you to run a Kubernetes cluster on your local machine, making it easy to test and develop your applications.

To get started with Kind, follow the [**installation guide**](https://kind.sigs.k8s.io/docs/user/quick-start). Once installed, you can create a new Kind cluster by running:
```bash
kind create cluster
```
This will create a new Kind cluster on your local machine. You can then use this cluster as your Kubernetes environment for the Devspace demo.


####
That's it! With these steps, you should now have a fully functional Devspace demo environment up and running. Happy exploring!

have fun! ❤


