---
title: "Install QXmlEdit on Ubuntu"
description: "Setting up QXmlEdit on Ubuntu 20.04"
date: 2021-12-07T10:51:23+03:00
draft: false
---

## Setting up QXmlEdit on Ubuntu 20.04 ...
#### 2021-12-07 - Vangelis Tripolitakis (vtripolitakis@_DONTSPAMME_me.com)

0. Set up your C++ compiler 
1. Download the latest and greatest source tarball
2. `sudo apt install -y qt5-default qt5-default libqt5svg5-dev qtdeclarative5-dev libqt5xmlpatterns5-dev libqt5scxml5-dev`
3. `qmake`
4. `make`
5. `sudo make install`
6. run it with `export LD_LIBRARY_PATH=/opt/qxmledit/:$LD_LIBRARY_PATH` and `/opt/qxmledit/qxmledit`

have fun!
