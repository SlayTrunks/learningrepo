interface props {
    params:Promise<{
    slug:string[]
    }>
}
const page = async({params}:props) => {
    try {
        
    const {slug} = await params;
    return( <div>
        
    {slug && slug?.map((item,i)=>{
        
  return (
    <h1 className="bg-amber-400 text-black" key={i}>{item}</h1>
  )
    })
}
</div>)
    } catch (error) {
    console.log(error)    
    return <div>
        error
    </div>
    }
}
export default page
