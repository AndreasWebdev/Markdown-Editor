// GENERAL
const electron = require('electron');
const remote = electron.remote;

var fileIsLoaded = false;
var fileIsModified = false;
var fileName = "";

// PREVIEW & RENDERING
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

// FILE
const uiActionFileExit = document.querySelector(".ui-action-file-exit");
uiActionFileExit.addEventListener('click', function() { remote.getCurrentWindow().close(); });

// VIEW
const uiActionViewSplit = document.querySelector(".ui-action-view-split");
const uiActionViewText = document.querySelector(".ui-action-view-text");
const uiActionViewPreview = document.querySelector(".ui-action-view-preview");

uiActionViewSplit.addEventListener('click', function() { changeView(0); });
uiActionViewText.addEventListener('click', function() { changeView(1); });
uiActionViewPreview.addEventListener('click', function() { changeView(2); });


var currentView = 0;
function changeView(viewIndex) {
  currentView = viewIndex;

  // SPLIT PANE
  if(currentView == 0) {
    mainPane.style.gridTemplateColumns = "50% 5px 50%";
  }
  // TEXT ONLY
  if(currentView == 1) {
    mainPane.style.gridTemplateColumns = "1fr 0px 0px";
  }
  // PREVIEW ONLY
  if(currentView == 2) {
    mainPane.style.gridTemplateColumns = "0px 0px 1fr";
  }
}

const handler = document.querySelector(".handler");
const mainPane = document.querySelector("main");
var isDraggingSplitPane = false;

handler.addEventListener('mousedown', function() {
  isDraggingSplitPane = true;
});
handler.addEventListener('mouseup', function() {
  isDraggingSplitPane = false;
});

window.addEventListener('mousemove', function(e) {
  e = e || window.event;

  if(isDraggingSplitPane && currentView == 0) {
    var dragX = e.pageX;
    var pageWidth = screen.width;
    var remainingWidth = pageWidth - dragX - 5;
    mainPane.style.gridTemplateColumns = dragX + "px 5px 1fr";
  }
});
