

export default {
	async fetch(request:Request, env:Env, ctx:ExecutionContext): Promise<Response> {
		console.log(request.body);
		console.log(request.headers)
		// console.log(request.)
		if(request.method == "GET"){
			return  Response.json({
				message:"hello world also hi world"
			});
		}else{
			return Response.json({
				message:"You didnt send any get request"
			})
		}

	},
} satisfies ExportedHandler<Env>;
