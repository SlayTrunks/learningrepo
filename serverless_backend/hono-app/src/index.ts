import { Hono } from 'hono'

const app = new Hono()

//authentication middleware
import {Next} from "hono"
import {Context} from "hono/"

const middleware = async(c:Context,next:Next)=>{
  if(c.req.header("Authorization")){
    await next()
  }else{
    return c.text("you are not authenticated",401)
  }
} 
// app.use(middleware) we can use middleware like this
//getting input from user
app.get('/',middleware, async (c) => { //used middleware here
  const body = await c.req.json() //this is req.body but it is quite different
  console.log(body);
  console.log(c.req.header("Authorization")); // req.header in express
  console.log(c.req.query("param")); //req.params in express

  return c.text('Hello Hono!')
})
export default app
