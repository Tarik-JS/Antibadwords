//////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on("message",message=>{
  if(message.content.startsWith(prefix+"antibadwd")){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You dont have permissions.")
    let args = message.content.split(" ")[1]
    console.log(args)
    if(!args || !['on','off'].includes(args.toLowerCase())) return message.reply("Usage: [ON,OFF]")
 let badsys = db.get(`badword_${message.guild.id}`)
    if(args.toLowerCase() === 'on'){
      if(badsys) return message.reply(`Anti bad words system is already **"ON"**`)
    db.set(`badword_${message.guild.id}`,true)
    console.log('Anti bad words system has been set to ON')
    message.channel.send({embed: {color:'GREEN',description:`:white_check_mark: Anti bad words system has been set to **"ON"**`}})
    } else if(args.toLowerCase() === 'off'){
      if(!badsys) return message.reply("Anti bad words system is not ON to set OFF")
      db.delete(`badword_${message.guild.id}`)
      console.log(`Anti bad words system has been set to OFF`)
      message.channel.send({embed: {color:'RED',description:`:white_check_mark: Anti bad words system has been set to **"OFF"**`}})
    }
  }
})


client.on("message",message=>{
  if(message.content.startsWith(prefix+"addword")){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You dont have permissions.")
    let args = message.content.split(" ").slice(1).join(" ")
    if(!args) return message.reply("Please enter word to add it.")
    console.log(args)
    let word = db.get(`system_${message.guild.id}`)
    let badlist = db.get(`system_${message.guild.id}.words`)
    if(word){
    if(badlist.includes(args)) return message.reply("This message already in the list")
    }
      db.push(`system_${message.guild.id}.words`,args.toLowerCase())

      message.channel.send({embed:{description:`**Word:**||\`${args}\`||\nhas been added to **BadWords List**`}})


  }

})


client.on("message",message=>{
  if(message.content.startsWith(prefix+"restbadlist")){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You dont have permissions.")
    let word = db.get(`system_${message.guild.id}`)
    let badlist = db.get(`system_${message.guild.id}.words`)
    if(word){
    db.delete(`system_${message.guild.id}`)
    message.reply(`BadWords List has been **REST**`)
    } else {
      message.reply("There is no BadList in this Server")
    }


  }

})

client.on("message",message=>{
  let logChannel = message.guild.channels.cache.find(channel => channel.id === '823602725844549642')
   // if(message.member.hasPermission("ADMINISTRATOR")) return;
   if(!message.channel.guild) return; 
   let badsys = db.get(`badword_${message.guild.id}`)
   if(!badsys) return;
    let word = db.get(`system_${message.guild.id}`)
    if(word){
      let blackwords = db.get(`system_${message.guild.id}.words`)
   if(!blackwords) return;
      if(blackwords.includes(message.content.split(" ").join(" ").toLowerCase())) {
        message.delete()

        message.reply("Please dont say **Badwords**").then(m=>{
          m.delete({timeout:1500})
        })

        let embed = new Discord.MessageEmbed()
        .setTitle('Anti BadWords System !')
        .setAuthor(message.author.tag,message.author.avatarURL({dynamic:true}))
        .addField("User",`Mention: <@${message.author.id}> (ID: ${message.author.id})`)
        .addField('Word',`||${message.content.split(" ").join(" ")}||`)
        .setTimestamp()
      logChannel.send(embed)
      }
    }

})

client.on("message",message=>{
  if(message.content.startsWith(prefix+"badlist")){
   if(!message.member.hasPermission("MANAGE_MESSAGES"))return message.reply("You dont have permissions.")
   let word = db.get(`system_${message.guild.id}`)
   if(word && db.get(`badword_${message.guild.id}`)){
     let blackwords = db.get(`system_${message.guild.id}.words`)
     message.channel.send({embed: {color:"BLACK",title:"BadWords List",description:`**||\n${blackwords}||**`}})

   } else {
     message.reply("I think BadWords System is OFF or there is no words in list")
   }
  }
})

////////////////////////////////////////////////////////////////////////////////////
