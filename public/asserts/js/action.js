function closeAside() {
    document.getElementById('aside').style.display = 'none';
    document.getElementById('container').style.backgroundColor = 'whitesmoke';
    document.getElementById('footer').style.backgroundColor = 'whitesmoke';
}

function scrollToStart(id) {
    document.getElementById(id).scrollIntoView({behavior: 'smooth', block: "start"});
}