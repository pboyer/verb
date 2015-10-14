
var codecontainer = document.getElementById("code-container");
codecontainer.innerHTML += '<textarea id="code" class="row scroll-y"></textarea>';

var title = document.getElementById("title");
title.innerHTML += document.title;

var code = document.getElementById("code");
code.innerHTML = document.getElementById("script").innerHTML;

var codemirror = CodeMirror.fromTextArea(code, {
  mode : "javascript",
  readOnly : true,
  "theme" : "colorforth"
});

codecontainer.style.display='none';

var button = document.getElementById("button");
var isHidden = true;
button.addEventListener("click", function(){
    if (isHidden){
        codecontainer.style.display='block';
        isHidden = false;
    } else {
        codecontainer.style.display='none';
        isHidden = true;
    }
});
