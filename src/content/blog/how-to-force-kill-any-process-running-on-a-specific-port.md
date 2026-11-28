---
title: "How to Force Kill Any Process Running on a Specific Port"
date: "2026-11-14"
summary: "Find the process using a port and stop it, with a graceful shutdown step before using SIGKILL."
tags: ["command-line"]
---

If a TCP development server reports `EADDRINUSE: address already in use :::3001`, another process may already be listening on that port. On systems with `lsof`, find the listener and identify it before deciding whether to stop it.

---

## The Universal Command

List TCP listeners on port `3001`:

```bash
lsof -nP -iTCP:3001 -sTCP:LISTEN
```

If the command shows no listener, stop here. If it reports an error, resolve that first. Check the `COMMAND`, `USER`, and `PID` columns to confirm that the process is the development server you intend to stop. If several rows appear and you cannot identify the intended process, leave them running.

### How It Works: Breaking Down the Syntax

- `-nP` displays numeric addresses and port numbers.
- `-iTCP:3001` selects TCP sockets that match port `3001`.
- `-sTCP:LISTEN` limits the results to listening sockets. An established client connection alone does not make a process a listener.

---

## Modifying the Command for Any Port

Replace `3001` with the TCP port in your server’s error message. For example:

- **Port 3000:** `lsof -nP -iTCP:3000 -sTCP:LISTEN`
- **Port 5173:** `lsof -nP -iTCP:5173 -sTCP:LISTEN`
- **Port 4200:** `lsof -nP -iTCP:4200 -sTCP:LISTEN`

---

## ⚠️ A Word of Warning: The Danger of `-9` (SIGKILL)

`SIGKILL` stops a process immediately. The process loses its chance to complete pending work or clean up. Start with a graceful shutdown.

### A Safer, Gracious Approach

Send `SIGTERM` to the one PID you confirmed above. Replace the example PID `12345` with that PID:

```bash
kill -TERM 12345
```

Give the server time to shut down, then rerun the same `lsof` command. If the listener is gone, you can restart your development server. If the same confirmed process is still listening and graceful shutdown has failed, you can use `SIGKILL` as a last resort. If the PID or process changed, identify the new listener before taking any action.

```bash
kill -KILL 12345
```

Rerun the listener check before restarting the server.

---

## Quick Reference Summary

| Goal | Command | When to use it |
| :--- | :--- | :--- |
| Find the listener | `lsof -nP -iTCP:3001 -sTCP:LISTEN` | Check the command, owner, and PID. |
| Request graceful shutdown | `kill -TERM 12345` | Replace `12345` with the confirmed PID. |
| Force shutdown | `kill -KILL 12345` | Use only if the same confirmed listener remains after `SIGTERM`. |
