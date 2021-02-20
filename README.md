# Bitmetro React Content Editor

A simple drag-and-drop content editor for react

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
