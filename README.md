# Template for threejs projects

Template project for building Three.js applications.

## Developing

```bash
# Develop locally
$ docker compose watch
```

## Production

```bash
# Build and run for your prod environment
$ docker build -t myThreejsApp .
$ docker run -p 3000:80 myThreejsApp
```

