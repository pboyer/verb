
export function setupViewer() {
  // create elements for the viewer
  var codecontainer = document.getElementById("code-container")
  codecontainer.innerHTML += '<textarea id="code" class="row scroll-y"></textarea>'

  // add the contents of the script to the viewer
  var code = document.getElementById("code")
  code.innerHTML = document.getElementById("script").innerHTML

  var button = document.getElementById("button")
  var isHidden = true
  button.addEventListener("click", function(){
    if (isHidden){
        codecontainer.style.display='block'
        isHidden = false
    } else {
        codecontainer.style.display='none'
        isHidden = true
    }
  })
}
