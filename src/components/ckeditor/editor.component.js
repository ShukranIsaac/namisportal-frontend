import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CustomCKEditor = ({ label, setEditorText, editorText }) => {

    return (
        <div className="form-row" style={{ marginTop: `1em` }}>
            <div style={{ width: `100%` }}>
                <label htmlFor={label}>{label}</label>
                <CKEditor
                    editor={ClassicEditor}
                    data={editorText}
                    onInit={editor => {
                        // You can store the "editor" and use when it is needed.
                        // Insert the toolbar before the editable area.
                        editor.ui.getEditableElement().parentElement.insertBefore(
                            editor.ui.view.toolbar.element,
                            editor.ui.getEditableElement()
                        );
                    }}
                    onChange={(event, editor) => setEditorText(editor)}
                    onBlur={(event, editor) => { }}
                    onFocus={(event, editor) => { }}
                />
            </div>
        </div>
    );
}

export default CustomCKEditor;
