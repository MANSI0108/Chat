const Chats = require("../models/chatModel");
const User = require("../models/userModel");


const userSocketConnection = async function (socket) {
  console.log("User Connected");

 socket.on('newUser',async (sender_id)=>{
  await User.findByIdAndUpdate({ _id: sender_id }, { $set: { is_Online: '1' } });
  
    //broadcast of userId which is online 
    socket.broadcast.emit('getOnlineuser', { user_id: sender_id });
 })

  console.log("Hello");

  socket.on('disconnect', async function () {
    console.log('User Disconnected');

    var userId = socket.handshake.auth.token;

    await User.findByIdAndUpdate({ _id: userId }, { $set: { is_Online: '0' } });

    //broadcast of userId which is offline
  
    socket.broadcast.emit('getOfflineuser', { user_id: userId });
    console.log("Hello2"); 

  })
      

  socket.on('newChat',function(data){
    socket.broadcast.emit('loadNewChat',data)
  })

  //load Old Chats

  socket.on('existChat', async function(data){
   var chats = await  Chats.find({$or:[
      {sender_id:data.sender_id,receiver_id:data.receiver_id},
      {sender_id:data.receiver_id,receiver_id:data.sender_id},

     ]})

     socket.emit('loadChats',{chats:chats})

  })

  //delete chat
  socket.on('chatDeleted',function(id){
    socket.broadcast.emit('chatMessageDeleted',id)
  })

  //updateChat
  socket.on('chatUpdated',function(data){
    socket.broadcast.emit('chatMessageUpdated',data)
  })
  

}        
                                                                     
module.exports = userSocketConnection          