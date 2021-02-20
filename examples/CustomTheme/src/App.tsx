import { ContentEditor, ContentPage, createPage } from '@bitmetro/react-page-editor';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { myTheme } from './myTheme';

const App = () => {
    const [content, setContent] = React.useState(createPage());
    const [preview, setPreview] = React.useState(false);

    return (
        <div style={{ height: '100vh' }}>
            <button onClick={() => setPreview(!preview)}>{preview ? 'Edit' : 'Preview'}</button>

            {
                preview
                    ? <ContentPage content={content} theme={myTheme} />
                    : <ContentEditor content={content} onChange={setContent} theme={myTheme} />
            }
        </div>
    );
};

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
