//pick in ts (lets you pick from both types and interfaces)


// interface User {
//     id:string;
//     name:string;
//     age:number;
//     email:string;
//     password:string
// }

// to get a user in mongoose;

    // const userData:User = user.findOne({email:"insane@mail.com"})  

// to update user;
    //you just can update id, name , password and cannot email and id
    // interface UpdatedProps {
    //     name:string;
    //     age:number;
    //     password:string
    // }
//  we could do that but our rule is DRY also one value changed in mongoose we need to change two placess

// type UpdatedProps = Pick<User,"name"|"age"|"password">
// //      function updateUser(updatedProps :UpdatedProps){
// //         const update = User.findOneAndUpdate(updatedProps.name = "insane")
// //      }
//     // updateUser({name:"insane",age:12,password:"143ldjfa"})





//partial in ts

// in line 25 and 26 we are expecting all three name age and password as required but what if we only update one name or age or password
//we can do that by

// type updatedPropsOptional = Partial<UpdatedProps>

// //function updateUser(updatedProps :updatedPropsOptional){
//     //         const update = User.findOneAndUpdate(updatedProps.name = "insane")
//     //      }

//     // updateUser({name:"insane"})








//read only in ts

// const user:readOnlyUser = { //not adding readonly user complains
//     name:'insane',
//     age:34
// }



// // user.name = "papa"
// // console.log(user); 

// const place = ["birtamomde","arjundhara","musichowk"]
// // place[2] = "moshi chowk"
// // console.log(place); 


// //even though the user and place is constant we can change values of them 
// //adding value below makes the funciton complains

// type readOnlyUser = {
//     readonly name:string;
//     readonly age : number;
// }
// //if we dont want to write readonly in all the values we can do another way
// type readOnlyUser1 = {
//      name:string;
//      age : number;
// }
// const user1:Readonly<readOnlyUser1> = { //not adding readonly user complains
//     name:'insane',
//     age:34
// }








//records
// type User = {
//     id:string,
//     password:string 
// }
// type Users = {
//     [key:string]:User
// }

// const users:Users = {
//     "name":{
//         id:"insane",
//         password:"greem"
//     },
//     "name1":{
//         id:"slay",
//         password:"trunks"
//     }
// }

//above code is common way of writing object in ts but records makes it easier

// type User = {
//     id:string,
//     password:string 
// }
// type Users = Record<string,User> //just makes it cleaner

// const users:Users = {
//     "name":{
//         id:"insane",
//         password:"greem"
//     },
//     "name1":{
//         id:"slay",
//         password:"trunks"
//     }
// }









// maps
// maps is just another way of writing object and cool way to get it
// also map is javascript thing and not typescript thing

// const users = new Map<string,{name:string,age?:number}>()

// users.set("user1",{name:"string",age:22})
// users.set("user2",{name:"stringx",age:22}) //instead of users={"user1":{name:"rick",age:20}}

// const user = users.get("user1") // instead of using users[user1]
// // users.delete("user2")
// console.log(users)









//exclude

// type Events = 'click' | 'scroll' | 'mousemove'

// type ExcludeScroll = Exclude<Events,'scroll'>

// const handleEvent = (event:ExcludeScroll)=>{
//     console.log("handling event", event)

// }
// handleEvent('mousemove')




//for enums

// enum Direction {
//     Up,
//     Down,
//     Left,
//     Right
// }
// type ExcludeUp = Exclude<Direction,1>
// const handleExclude = (event:ExcludeUp) =>{
//     console.log("nothing",event)
// }
// handleExclude(Direction.Down) //throws error


















