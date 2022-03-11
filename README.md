# lauchpad Frontend

This project contains the main features of the lauchpad application.

If you want to contribute, please refer to the [contributing guidelines](./CONTRIBUTING.md) of this project.

## Documentation

- [Info](doc/Info.md)
- [Cypress tests](doc/Cypress.md)

### Config Nginx

Step 1: File config at /etc/nginx/sites-enabled
```shell

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

```

Step 2: Run script at repository
```shell
    $pm2 start yarn --name "nextjs" --interpreter bash -- start
```
