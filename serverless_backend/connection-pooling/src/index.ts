
import { PrismaClient } from "@prisma/client/extension";
import { withAccelerate } from "@prisma/extension-accelerate";

export interface Env{
	MY_Variable :string
}


export default {
	async fetch(request:Request, env:Env, ctx:ExecutionContext): Promise<Response> {
		const prisma = new PrismaClient({
			datasourceUrl: env.MY_Variable
		}).$extends(withAccelerate())

		const response = await prisma.user.create({
			data:{
				name:"isnnae",
  				password:"insane123",
  				address:{
					ghar:"insane",
					paisa:"kcha"
				} 
				
			},
		})
		//complicated part you can ignore this or just copy paste this
		// const {data,info} = prisma.user.findMany({
		// 	take:20,orderBy:{
		// 		id:"desc"
		// 	},
		// }).withAccelerateInfo()
		// console.log(JSON.stringify(info))
		// return new Response('info', info);

		console.log(JSON.stringify(response))
		return Response.json({response})
	},
} satisfies ExportedHandler<Env>;
