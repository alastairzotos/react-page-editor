# @bitmetro/react-page-editor

![react page editor](https://media.giphy.com/media/UoeNfsHNPTgI5rmQsA/giphy.gif)

An easy-to-use drag-and-drop content editor for React.

Note that this is currently a WIP and there may be breaking changes.

You can raise any issues or ask questions in the [Github repo](https://github.com/alastairzotos/react-page-editor).

## Installation

```
npm install --save @bitmetro/react-page-editor
```


## Usage

```jsx
const App = () => {
    const [state, setState] = React.useState(createPage());

    return <ContentEditor content={state} onChange={s => setState(s)} />;
};
```

## Running the examples

Navigate into `examples` and then into one of the example projects, e.g. `Basic`, then:

```
npm install
npm start
```

And navigate to `http://localhost:8787`

## Documentation

// Todo 🤙
