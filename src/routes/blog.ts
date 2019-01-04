import { Router, Request, Response } from 'express'
import remarkable from 'remarkable';
import fs from 'fs';
import path from 'path'
import temp from '../../temp/stories';

const md = new remarkable();

const blogRouter: Router = Router();

blogRouter.get('/blog/story/:id', (req: Request, res: Response) => {
	console.log(req.params);
	res.setHeader('Content-type', 'text/html');
	res.send(md.render(fs.readFileSync(path.resolve('test.md')).toString()));
});

blogRouter.post('/contact', (req: Request, res: Response) => {
	console.log(req.body);
	if(req.body.contactFrom === 'home'){
		let {name, email, subject, message} = req.body;
		console.log('Recevied: ', name, subject, email, message);
		res.send('OK');
	}
	else if( req.body.contactFrom === 'blog' ){
		let { name, email, text } = req.body;
		console.log('Recieved: ', name, email, text);
		res.send('OK');
	}
	else{
		res.send('Not OK');
	}
});

blogRouter.get('/contact/:type', (req: Request, res: Response) => {
	if(req.params.type === 'recentStories'){

		res.send(JSON.stringify({recentStories: temp.recentStories}));
	}
	else{
		res.send(new Error('Cannot accept this request'));
	}
});	

blogRouter.get('/stories', (req: Request, res: Response) => {
	console.log(req.query);
	res.send(JSON.stringify({stories : temp.stories}));
})

blogRouter.get('/about', (req: Request, res: Response) => {

	console.log(req.host);

	res.send(JSON.stringify({
		aboutStory: {
			id: '1',
			date: "January 30, 2018",
			title: "Hi, I am Abhinav",
			content: [
				`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus assumenda optio esse eaque rem veniam et nostrum, distinctio animi. Dolorum a atque distinctio molestiae pariatur neque inventore quod cum, reprehenderit!`,
				`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus fugit atque facere soluta qui ab, illum neque consectetur ipsa dolores sit tempora, vero ea. Perspiciatis itaque fuga suscipit alias blanditiis?`,
				`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum tempore officia et minima aspernatur, laborum, repellendus ipsa sapiente odit similique, voluptates cupiditate. Eius facere consequatur voluptatibus numquam atque veniam quibusdam.`
			],
			featureImage: "images/about.jpg",
			hashtags: ["#myStory", "#aboutMe"],
			image: "images/about-2.png",
			comments: 2
		},
		activities: [
			{
				date: "2018",
				achievement: "XYZ",
				description: "ABC"
			},
			{
				date: "2017",
				achievement: "LDSKJ",
				description: "aksd"
			},
			{
				date: "2016",
				achievement: "LKJKL",
				description: "ABC"
			},
			{
				date: "2015",
				achievement: "XYZ",
				description: "ABC"
			}
		]
	}
	));
})

export default blogRouter;