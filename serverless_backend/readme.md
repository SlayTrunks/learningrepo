1. to initilize the cloudflare workers use the command 
            `npm create cloudflare -- my-app`
2. select normal hello world workers
3. select typescript or any other language
4. select no when they ask "do you want to deploy?"
5. we dont have to care about listening the server like we did in express.
    just press npm run dev and the server will start.
6. to return json remove the "new" from "return new Response" and just do 
    "return Response.json({json:json})"
7. since we dont have to care about listening the server but we have to 
    care about routing we can do that as i've written in code in my-app/index.js folder.
8. we wont be writing the code this hard way since there is a library.
9. first we logged in to our cloudflare account using wrangler cli
    `npx wrangler login` and we can verify if we are logged in by using the command  `npx wrangler whoami`
10. use the command `npm run deploy` to deploy the code to backend
11. it will give us link in terminal which will work but whenever we change code we should redeploy it again and again.
12. we cannot use express in workers cause they are written differently. we can instead use other libraries which we'll talk later
13. if you want to deploy your existing express project(mvc then it'll be easy) in cloudflareworker you can still use the js code which doesnot use express for eg controllers , databasae and models folders and replace the codes in index.js and routes.js which uses express. use the code written in point 6 and other index.js initial boilercode format (ifelse format) for routes and other app.js parts. take reference from projects.100xdevs.com serverless-backend page no 9.

____________________________________________________________________________________________________________________

1. using HONO library to get away from ugly way of writing workers code and making it look like express.just it supports other runtimes too now but it was initially made for cloudflare-workers.
2. to initilize the hono app we can use the command `npm create hono@latest my-app`
3. hono is very similar to express but instead of req,res it uses only c which have power of both req and res
4. hono uses wangler(cloudflare-cli) when we select 'cloudflare-workers' while instaling hono. so it will automatically deploy our projects in cloudflare like workers did. (thats what a library means ig. never learnt this further about library just theoretically so this is cool thing for me today.(2024-12-11) )
