const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let links = [
  { title: "GitHub", url: "https://github.com" },
  { title: "Instagram", url: "https://instagram.com" },
  { title: "LinkedIn", url: "https://linkedin.com" }
];

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Linktree Clone</title>

<style>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:Arial,sans-serif;
}

body{
  min-height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  background:linear-gradient(135deg,#ff6ec4,#7873f5,#4ADEDE);
}

.container{
  width:350px;
  background:white;
  padding:25px;
  border-radius:20px;
  text-align:center;
  box-shadow:0 10px 25px rgba(0,0,0,0.2);
}

.profile{
  width:100px;
  height:100px;
  border-radius:50%;
  margin-bottom:10px;
}

h1{
  color:#333;
}

p{
  color:gray;
  margin-bottom:15px;
}

.link-btn{
  display:block;
  text-decoration:none;
  background:#7873f5;
  color:white;
  padding:12px;
  margin:10px 0;
  border-radius:10px;
  transition:0.3s;
}

.link-btn:hover{
  transform:scale(1.05);
}

input{
  width:100%;
  padding:10px;
  margin:5px 0;
  border:1px solid #eda2de;
  border-radius:8px;
}

button{
  width:100%;
  padding:12px;
  margin-top:10px;
  border:none;
  border-radius:8px;
  background:#ff6ec4;
  color:white;
  cursor:pointer;
  font-size:16px;
}

button:hover{
  opacity:0.9;
}
</style>
</head>

<body>

<div class="container">

<img class="profile"
src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png">

<h1>@student</h1>
<p>My Social Links</p>

<div id="links"></div>

<input type="text" id="title" placeholder="Link Title">
<input type="text" id="url" placeholder="Link URL">

<button onclick="addLink()">Add Link</button>

</div>

<script>

async function loadLinks(){
  const res = await fetch('/api/links');
  const data = await res.json();

  const linksDiv = document.getElementById('links');
  linksDiv.innerHTML = '';

  data.forEach(link=>{
    linksDiv.innerHTML +=
    '<a class="link-btn" href="'+link.url+'" target="_blank">'+link.title+'</a>';
  });
}

async function addLink(){

  const title = document.getElementById('title').value;
  const url = document.getElementById('url').value;

  if(!title || !url){
    alert('Please fill all fields');
    return;
  }

  await fetch('/api/links',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({title,url})
  });

  document.getElementById('title').value='';
  document.getElementById('url').value='';

  loadLinks();
}

loadLinks();

</script>

</body>
</html>
`);
});

app.get("/api/links", (req, res) => {
  res.json(links);
});

app.post("/api/links", (req, res) => {
  links.push(req.body);
  res.json({ message: "Added Successfully" });
});

app.listen(PORT, () => {
  console.log("Server running on http://localhost:3000");
});