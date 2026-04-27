const req = new XMLHttpRequest();
req.addEventListener('load',()=>{
    console.log(req.response);
});

req.open('GET','https://supersimplebackend.dev');
req.send();
