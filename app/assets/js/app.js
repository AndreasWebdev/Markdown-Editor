const showdown = require('showdown');
const mdConverter = new showdown.Converter();

const editorPane = document.querySelector(".editor");
const previewPane = document.querySelector(".preview");
const editorTextarea = document.querySelector(".editor textarea");

editorTextarea.addEventListener('input', function() { updatePreview(); });

function updatePreview() {
  let editorContent = editorTextarea.value;

  previewPane.innerHTML = mdConverter.makeHtml( editorContent );
}
