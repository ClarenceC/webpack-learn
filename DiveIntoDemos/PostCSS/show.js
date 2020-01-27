function show(content) {
    window.document.getElementById('app').innerHTML = 'Hello,' + '<h1>'+content+'</h1>'
}

module.exports = show