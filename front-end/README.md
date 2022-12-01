# Front-End

Handles uploading, download, and deleting of files from the database.

## Development

### Requirements

- [Docker](http://docker.com/)
- [Node.js](https://nodejs.org/en/)
- [pnpm](https://pnpm.io/) (recommended)

### Steps

Run the live-reload server on <http://localhost:3000>

```bash
make dev
```

Please take a look at [src/setupProxy.js](src/setupProxy.js) to see how the proxy is set up.

## Docker

To docker-ize this application I followed the following guide [dockerizing-a-react-app](https://mherman.org/blog/dockerizing-a-react-app/).

To build and launch the docker container for *development* use:

```bash
make build-dev start-dev-container
```

Then you can access the application at <http://localhost:3001>.

To build and launch the docker container for *production* use:

```bash
make build-prod start-prod-container
```

Then you can access the application at <http://localhost:1337>.

## 📚 The Tech. Stack

This project uses the following technologies:

**The Front-End**:

- [**React.js**](https://reactjs.org/) - For building the interface along with:
  - [**Styled-Components**](https://www.styled-components.com/) - for styling.
  - [**carbon-components-react**](https://npmjs.com/package/carbon-components-react) - for the base design system.
  - [**react-hot-toast**](https://react-hot-toast.com/) - for handling toast style notifications.
- [**Craco**](https://craco.js.org/) - CRA configuration overrides without ejecting.

## License

© Nicholas Adamou.

It is free software, and may be redistributed under the terms specified in the [LICENSE] file.

[license]: LICENSE
