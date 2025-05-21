'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

// Dynamically import react-ace to avoid SSR issues
const AceEditor = dynamic(() => import('react-ace'), { ssr: false });

// Import modes and themes
import 'ace-builds/src-noconflict/ace' //doesn't work without this import
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai'; //dark theme
import 'ace-builds/src-noconflict/theme-tomorrow' //light theme
import 'ace-builds/src-noconflict/ext-language_tools'; // Optional: autocompletion

export default function CodeEditor() {
    const [code, setCode] = useState('');


    return <AceEditor
        mode='python'
        theme="tomorrow"
        onChange={setCode}
        value={code}
        name="editor"
        placeholder='//Start coding'
        editorProps={{ $blockScrolling: true }}
        setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            fontSize: 14,
            showPrintMargin: false,
            autoScrollEditorIntoView: true
        }}
        minLines={12}
        maxLines={50}
    />
}