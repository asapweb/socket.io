# QUEUE MANAGEMENT SERVER

Servidor para gestionar las llamadas

## How to use

```bash
npm install
node server.js
```

## Set Up for Production

###Installing PM2

[Detailed instructions](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-18-04)

Next let’s install PM2, a process manager for Node.js applications. PM2 makes it possible to daemonize applications so that they will run in the background as a service

```bash
sudo npm install pm2@latest -g
pm2 start server.js
```

Applications that are running under PM2 will be restarted automatically if the application crashes or is killed, but we can take an additional step to get the application to launch on system startup using the startup subcommand. This subcommand generates and configures a startup script to launch PM2 and its managed processes on server boots:

```bash
pm2 startup systemd
```

### Reverse proxy on a NGINX Server

```bash
server {
    server_name app.domain.com;

    location /socket.io/ {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;

        proxy_pass http://SERVER_IP:SERVER_PORT;
        proxy_redirect off;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}

```
