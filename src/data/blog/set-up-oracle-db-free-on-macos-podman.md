---
title: "Set up Oracle DB Free container on macOS with Podman"
description: "The container fails on a default installation, and the logs don't help debugging. Let's fix that."
date: "2025-01-15"
tags: ["OracleDB", "Podman", "macOS"]
image: "@assets/blog/set-up-oracle-db-free-on-macos-podman/preview.webp"
---

## Installation

Install Podman if you haven't already:

```bash
brew install podman
```

**After installing, you need to create and start your first Podman machine. It's important that we set at _least_ 3 GB of memory.**

While the Oracle DB says it takes up to 2 GB, the default Podman machine has 2GB of memory which prevents the Oracle database from starting. For 4GB replace the memory with "4096".

```bash
podman machine init --memory=3072
podman machine start
```

If you have a machine already created, you can set the memory:

```bash
podman machine set --memory 3072
```

## Create the container

First, choose the database variant. Oracle offers a regular and a lite version. According to their website:

_"The Lite image has a smaller storage footprint than the Full image (~80% image size reduction) and a substantial improvement in image pull time. This image is useful in CI/CD scenarios and for simpler use cases where advanced database features are not required."_

I'm going to use the lite version, which is enough for local development. If you want the regular version just remove the "-lite" from the end of the command.

```bash
podman run -d --name oracle-db -p 1521:1521 container-registry.oracle.com/database/free:latest-lite
```

Then check the status. Wait until the status is _healthy_ then continue.

```bash
podman ps
```

## Change password

Oracle sets a random password by default, but they have a script to update it.

```bash
# Replace <password> with your new password
podman exec oracle-db ./setPassword.sh <password>
```

## Test Database

Now, let's test the connection. You can connect to either @FREE or @FREEPDB1. The second is the [pluggable database](https://docs.oracle.com/en-us/iaas/base-database/doc/pluggable-databases.html), so we'll use that one.

```bash
# Replace <password> with your new password
podman exec -it oracle-db sqlplus sys/<password>@FREEPDB1 as sysdba
```

Now you can start creating users, tables, etc.

Once you're done, you can stop the container or the Podman machine directly. Since it's a VM on macOS, it will continue to use the allocated memory.

```bash
podman machine stop
```

Check the rest of the commands on the [Podman website](https://podman.io/).
