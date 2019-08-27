import React from 'react';
// ES module
import Editor from 'react-medium-editor';

// load theme styles with webpack
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';

export const OnlineEditor = (props) => {

    return (
        <div className="app">
            <Editor
                tag="pre" text={props.text} onChange={props.handleEditorTextChange}
                options={{
                    placeholder: { text: props.placeholder }, toolbar: {
                        buttons: [
                            'bold', 'italic', 'underline', 'anchor',
                            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                            'quote', 'orderedlist', 'unorderedlist',
                            'indent', 'outdent', 'subscript', 'superscript',
                            'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'
                        ],
                    }
                }}
            />
        </div>
    );
}

export default OnlineEditor;
