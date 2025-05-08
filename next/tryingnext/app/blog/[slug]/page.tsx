
interface props {
 params:Promise<{
     slug:string
 }>
}

const page = async ({ params}:props) => {
    try {
        
    const {slug} = await params; //await params
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`)
    const data = await response.json()
    const {title,body} = data;

  return (
    <div>
        <h1>{title}</h1>
        <p>{body}</p>
    </div>
  )
}
    catch(error){
    console.log(error);
    return <div>error</div>
    }
}
export default page



//  const page = ({params}:{params:{
//         slug:string
//     } // the object came to page and it includes params so we destructured params and params is also a object so we take params.slug {abc:123,dfa:345,params:{slug:"haha"},haha:"hha",baba:[1,2,3,4]} 

//
// }) => {
//    return (
//      <div>{params.slug}</div>
//    )
//  }
//
//  export default page
