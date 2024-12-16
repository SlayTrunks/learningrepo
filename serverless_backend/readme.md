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

____________________________________________________________________________________________________________________

We cannot use prisma or mongoose any databases normally in our cloudflare workers or hono app easy way so we need to practise some conditions to do that they are listed below.

1.
the reason the database cannot normally work in workers is because the server is in a lot of locations and it sends requests to database from all the location but database has certain limit to send response for the request sent by all those servers. 

So connection pooling is the main solution for this.

connection pooling is the place where all the servers sends requests to and only connection pool sends every request to the database which solves the problem.

2.
Another reason we cannot do it normally for prisma is cloudflare cannot understands prisma library dependencies like it didnt understood express apis.prisma is only made for node js.

for this problem too we need a connection pool

____________________________________________________________________________________________________________________

initilizing prisma in cloudflare.
> [!NOTE]
> for mongoose we have another different method but easy thing will be we using mongodb in prisma and doing the same thing.
1. setup cloudflare by npm create cloudflare@latest
2. install prisma as dev dependencies `npm install --save-dev prisma`
3. initialize prisma using `npx prisma init `
4. now in schema.prisma i added the url from neondb(the url is temporarily used there because lateron we are gonna add connection pooling link there).
5. After that I added a simple user model and migrated the database using
`npx prisma migrate dev --name init`
6. Since prisma orm donot work in workers we can use prisma orm in cloudflare workers with the help of prisma accelerate.
7. for that go to prisma accelerate website and click on get started and start new project.
8. when went to accelerate they asked for url which is the url we get from neondb we give it there and our server location and press on enable accelerate
9. we get a connection api from accelerate which we use in our schema.prisma replacing the url of neondb ive used there.
10. since there is no .env in cloudflare workers we need to keep our env file in wrangler.toml and get access to the variable everywhere using env(variableName). we are getting same variable in schema.prisma for url value.
11. in wrangler.toml inside the environmental variable section inside Docs:(line 21 when i am learning). there is a # MY_VARIABLE in there under      [vars]  put the link there and if we want to add another envs we can add them here too below [vars].
12. since we cannot use migrate command for the connection pool url so we need direct url in our .env file which can be used for prisma in .env file created which initilizing prisma and put the value of direct url in there and access that in the datasource db{} object with url and provider. add directUrl = "directurl link" which is used for prisma migration
13. all the environmental url which we use in index.ts(cloudflare-workers) will be in wrangler.toml and all the environmental variable which we need for migration or any specific feature can be in .env since prisma can understand .env unlike cloudflare workers.
14. the environmental variable thing can be confusing so we can do our project without adding directurl in prisma.schema and just replacing the direct url in place of url when we need to migrate and again replacing it with env of wrangler.toml will be easy.
15. while we are using directUrl our prisma will understand direct url and while migrating prisma will automatically migrate using direct url and the workers uses the connection pooling to connect to the database.
16. now run the command `npm install @prisma/extension-accelerate`
17. to generate the client we can use the command`npx prisma generate --no-engine` --no engine is required for serverless backend since engine is already installed in connection pool thing.
18. after that the index.ts file is modified as we can see in code.
19. after connecting the code and running the code we can deploy the code with the command `npm run deploy` if we have loggedin if not than first `npm wrangler login` and then `npm run deploy`. my codes not throwing any error till now.
