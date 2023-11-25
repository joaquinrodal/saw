//----------------------------------
BASICO.
m(selector, attributes, children)
m("div", {class: "foo"}, "hello")
<div class="foo">hello</div>

vnode = m(selector, attributes, children)
m("div", {id: "foo"}, ["a", "b", "c"])

// RENDER 
m.render(document.body, "hello")
m.render(element, vnodes)

// MOUNT
m.mount(element, {view: function () {return m(Component, attrs)}})
m.mount(element, null)  // DESMONTAR

// API REQUEST 

promise = m.request([url,] options)
//------------------------------
// METODO GET 
m.request({
    method: "GET",
    url: "/api/v1/users",
})
.then(function(users) {
    console.log(users)
})
//----------------------------
m.request({
    method: "GET",
    url: "/api/v1/users/foo:bar",
    data: {id: 123},
})
//-----------------------------
function upload(e) {
    var file = e.target.files[0]

    var data = new FormData()
    data.append("myfile", file)

    m.request({
        method: "POST",
        url: "/api/v1/upload",
        data: data,
    })
}
//-------------------------------

function upload(e) {
    var file = e.target.files[0]

    var data = new FormData()
    data.append("myfile", file)

    m.request({
        method: "POST",
        url: "/api/v1/upload",
        data: data,
        config: function(xhr) {
            xhr.upload.addEventListener("progress", function(e) {
                progress = e.loaded / e.total

                m.redraw() // tell Mithril that data changed and a re-render is needed
            })
        }
    })
}

//-------------------------------

