let useJavascript ;

import { EditorView, basicSetup } from "codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { ref, shallowRef, nextTick } from 'vue'


export default  useJavascript = ()=>{
    nextTick(() => {
        const parent = document.querySelector("#editor");
        let view = new EditorView({
            extensions: [basicSetup, javascript()],
            parent: parent || document.body
        })
    })
}