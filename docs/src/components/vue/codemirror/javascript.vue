<script setup lang="ts" name="javascript">
import { EditorView, basicSetup } from "codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { ref, shallowRef, nextTick } from 'vue'

nextTick(()=>{
    const parent = document.querySelector("#editor");
    let view = new EditorView({
        extensions: [basicSetup, javascript()],
        parent: parent || document.body
    })
})

</script>

<template>
    <div id="editor">
    </div>
</template>
