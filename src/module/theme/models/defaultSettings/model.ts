export interface LayoutProps {
    paddingLeft: number;
    paddingRight: number;
    paddingTop: number;
    paddingBottom: number;
    marginLeft: number;
    marginRight: number;
    marginTop: number;
    marginBottom: number;
}

export interface DefaultItemProps {
    defaultClass?: string;
    layout?: LayoutProps;
}

export const generateDefaultLayoutProps = (): LayoutProps => ({
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0
});

export const generateDefaultProps = (): DefaultItemProps => ({
    layout: generateDefaultLayoutProps()
});
