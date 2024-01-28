# Template for threejs projects

Template project for building Three.js applications.

## Developing

```bash
# Develop locally
$ docker compose watch
```
Served on `http://localhost:3000`

## Production

```bash
# Build and run for your prod environment
$ docker build -t myThreejsApp .
$ docker run -p 3000:80 myThreejsApp
```

Served on `http://localhost:3000/myapp`

### Endpoint to serve on

Here i've chosen to serve the application on `/myapp` to be able to run this alongside my portfolio just on a different endpoint. The more straig forward approach is just to use a different subdomain, but I don't think that looks as "clean".

In order to modify which endpoint to serve on, do the following.

Update `publicPath` in `webpack.config.js`. Here I've set the endpoint to be `myapp`, but you can of course set it to whatever you want. Set it to `/` to serve it from the root.
```js
// webpack.config.js

output: {
    publicPath: '/myapp/',
}
```

Update `Dockerfile` to store the static content generated by webpack in a folder with the same name as the value set in `publicPath` in `webpack.config.js`. By doing this Apache will serve the static files in that folder when visiting `/myapp`. Remove `myapp/` if you want to serve it from the root path.
```Dockerfile
# Dockerfile

FROM httpd:2.4

COPY --from=builder /app/dist/ /usr/local/apache2/htdocs/myapp/

EXPOSE 80
```