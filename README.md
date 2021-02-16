# Bitmetro React Content Editor

A simple drag-and-drop content editor for react

## Installation

```
npm install --save @bitmetro/page-editor
```


## Usage

```jsx
const App = () => {
    const [state, setState] = React.useState({
        id: 'page',
        itemType: 'Page',
        parentId: null,
        children: []
    });

    return (
        <ContentEditor
            id="my_page" // Different editors should have different IDs
            content={state}
            onChange={s => setState(s)}
        />
    )
};
```
