import React from "react";
import { CKEditor, CKEditorContext } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Bold,
  Essentials,
  Heading,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  Table,
  Undo,
  Context,
  ContextWatchdog,
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

export default function WyziwigField({fieldName, fieldValue, placeholder, updateCredentials}) {

    const handleChange = (editor) => {
        updateCredentials(fieldName, editor.getData())
    }

    return (
        <CKEditorContext context={Context} contextWatchdog={ContextWatchdog}>
            <CKEditor
                editor={ClassicEditor}
                config={{
                    toolbar: [
                        'undo', 'redo', '|',
                        'heading', '|', 'bold', 'italic', '|',
                        'link', 'insertTable', 'mediaEmbed', '|',
                        'bulletedList', 'numberedList', 'indent', 'outdent'
                    ],
                    style: {
                        definitions: [
                            {
                                name: 'Article category',
                                element: 'h3',
                                classes: [ 'category' ]
                            },
                            {
                                name: 'Info box',
                                element: 'p',
                                classes: [ 'info-box' ]
                            },
                        ]
                    },
                    plugins: [
                        Bold,
                        Essentials,
                        Heading,
                        Indent,
                        IndentBlock,
                        Italic,
                        Link,
                        List,
                        MediaEmbed,
                        Paragraph,
                        Table,
                        Undo
                    ],
                    initialData: fieldValue,
                    placeholder: placeholder
                }}
                onChange={(e, editor) => handleChange(editor)}
                // onReady={editor => editor.setData(fieldValue)}
            />
        </CKEditorContext>
    )
}