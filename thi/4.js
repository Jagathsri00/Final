const express=require('express');
const app=express();
const bodyParser=require('body-parser');

app.use(express.json());

const hobbies=[
{title:'Anime',id:1},
	{title:'Gaming',id:2}
	];

app.get('/',(req,res) =>{
	res.send('Using RESTful services');
});

app.get('/api/hobbies',(req,res) =>{
	res.send(hobbies);
});

app.get('/api/hobbies/:id', (req,res) =>{
	const hobby=hobbies.find(c=> c.id === parseInt(req.params.id));
	if(!hobby)
		res.status(404).send('id unavailable');
	else
		res.send(hobby);
});

app.post('/api/hobbies', (req,res) =>{
	const hobby={title:req.body.title,id:hobbies.length +1};
	hobbies.push(hobby);
	res.send(hobby);
});

app.delete('/api/hobbies/:id', (req,res) =>{
	const hobby=hobbies.find(c=> c.id === parseInt(req.params.id));
	if(!hobby)
		res.status(404).send('id unavailable');
	else
	{
		const index=hobbies.indexOf(hobby);
		hobbies.splice(index,1);
		res.send(hobby);
	}
});

app.put('/api/hobbies/:id', (req,res) =>{
	const hobby=hobbies.find(c=>c.id===parseInt(req.params.id));
	if(!hobby)
		res.status(404).send('id unavailable');
	else
	{
		hobby.title=req.body.title;
		res.send(hobby);
	}
});

const port=8080;
app.listen(port,()=> console.log(`Listening on port ${port}`));