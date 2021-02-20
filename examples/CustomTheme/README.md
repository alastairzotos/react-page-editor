# Custom theme example

This example demonstates how we can make a new component.

## Creating new components and themes

You can think of themes like classes in OOP. We can extend themes and inherit everything from them, and we can then add new items or override existing ones.

In this case we're making a slanted container, because they're really popular these days. We do this by extending the default theme: `extendDefaultTheme`. This will bring all the basic items and settings into our current theme, but will allow us to add and modify things are we please.

## Anatomy of a theme

A theme has the following properties:

```
{
    name: string;
    themeSettings: S;
    items: ThemeItem[];
}
```

Where `S` is the global theme settings. These might be basic colours, fonts, spacings, or anything else you choose.

These theme settings provide context for the editor and page renderer, meaning items can use the `useThemeSettings` hook to access the current settings and use them to render your components.

In this example, we are extending the default theme in `myTheme/index.ts`. We are providing it with a name and an array of theme items, in this case, our slanted container item.

## Anatomy of a theme item

Theme items are the drag-and-droppable components that make up the page the user is creating.

In this example, which you can find in `myTheme/slant-item/index.ts`, we're only considering the basic properties:

```
{
    isContainer: boolean;
    defaultProps: P;
    Component: React.FC<P>;
    Settings: Dictionary<
        React.FC<ItemEditorSettings<P>>
    >
}
```

Where `P` are the properties of the item. In this case, we want the slant angle and some background properties. When we create a new theme item, we can provide `defaultProps` that are initially used.

The actual React component is `Component`, and takes `P` as it's props. Simple!

We can also provide multiple settings components. These are the forms where the user can manipulate the settings of a component. Notice that we have a dictionary of react components. We can label our settings using the key, and provide a form in the value. In this case, we want to be able to update the background settings, so we have `{ Background: SlantItemBackgroundSettings }`.

The settings components do not simply take `P` as props; instead, they take:
```
{
    data: P;
    onUpdate: (data: P) => void;
}
```

In the settings components we can show the current settings, and when the user makes a change, we call `onUpdate` with the new settings.

The `isContainer` states that we can drop more items into this one.

## Using the new theme

Using the new theme is as simple as passing it in to the editor and page renderers:
```
<ContentPage content={content} theme={myTheme} />
```
and
```
<ContentEditor content={content} onChange={setContent} theme={myTheme} />
```