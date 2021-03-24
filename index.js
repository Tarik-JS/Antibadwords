//////////////////////////////////////////////////////////////////////////////////////////////////////////
const db = require("quick.db")
//حقوق لاير تيم //




//كود التفعيل on,off
client.on("message",message=>{
  if(message.content.startsWith(prefix+"antibadwd")){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You dont have permissions.")
    let args = message.content.split(" ")[1]
    console.log(args)
    let system = db.get(`badword_${message.guild.id}`)
    if(system === true) system = `RUNNING`
    if(system === false) system = `STOPPING`
    if(!system) system = `UNACTIVE`

    if(!args || !['on','off'].includes(args.toLowerCase())) return message.channel.send({embed:{title:"AntiBadWords System",description:`System is **${system}** \n `,footer: {text: 'Usage: [ON,OFF]',color:"BLUE"}}})
 let badsys = db.get(`badword_${message.guild.id}`)
    if(args.toLowerCase() === 'on'){
      if(badsys) return message.reply(`Anti bad words system is already **"ON"**`)
    db.set(`badword_${message.guild.id}`,true)
    console.log('Anti bad words system has been set to ON')
    message.channel.send({embed: {color:'GREEN',description:`:white_check_mark: Anti bad words system has been set to **"ON"**`}})
    } else if(args.toLowerCase() === 'off'){
      if(!badsys) return message.reply("Anti bad words system is not ON to set OFF")
      db.set(`badword_${message.guild.id}`,false)
      console.log(`Anti bad words system has been set to OFF`)
      message.channel.send({embed: {color:'RED',description:`:white_check_mark: Anti bad words system has been set to **"OFF"**`}})
    }
  }
})


//كود اضافه كلمة للقائمة
client.on("message",message=>{
  if(message.content.startsWith(prefix+"addword")){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You dont have permissions.")
    let args = message.content.split(" ").slice(1).join(" ")
    if(!args) return message.reply("Please enter word to add it.")
    let system = db.get(`badword_${message.guild.id}`)
     if(!system || system === false) return message.reply("The Antibadwords system is off")

     if(system === true){
    let word = db.get(`system_${message.guild.id}`)
    let badlist = db.get(`system_${message.guild.id}.words`)
    if(word){
    if(badlist.includes(args)) return message.reply("This message already in the list")
    }
      db.push(`system_${message.guild.id}.words`,args.toLowerCase())

      message.channel.send({embed:{description:`**Word:**||\`${args}\`||\nhas been added to **BadWords List**`}})

  }
  }

})


// كود معرفة الكلمات المضافة داخل قائمة
client.on("message",message=>{
  if(message.content.startsWith(prefix+"badlist")){
   if(!message.member.hasPermission("MANAGE_MESSAGES"))return message.reply("You dont have permissions.")
   let word = db.get(`system_${message.guild.id}`)
   let system = db.get(`badword_${message.guild.id}`)
if(system === true) system = `RUNNING`
if(system === false) system = `STOPING`
   if(word && system){
     let blackwords = db.get(`system_${message.guild.id}.words`)
     message.channel.send({embed: {color:"BLACK",title:"BadWords List",description:`**||\n${blackwords}||**\n\nSystem is **${system}**`}})
   } else return message.reply("System is not **Active** ,Or there is no **BADLIST**")
  }
})

//كود مسح جميع الكلمات الي بالقائمة
client.on("message",message=>{
  if(message.content.startsWith(prefix+"restbadlist")){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You dont have permissions.")
    let word = db.get(`system_${message.guild.id}`)
    let badlist = db.get(`system_${message.guild.id}.words`)
    let system = db.get(`badword_${message.guild.id}`)
    if(!system || system === false) return message.reply("The Antibadwords system is off")

    if(system === true){
    if(word){
    db.delete(`system_${message.guild.id}`)
    message.reply(`BadWords List has been **REST**`)
    } else {
      message.reply("There is no BadList in this Server")
    }
  }


  }

})


//كود منع الكلام + لوق مخصص 
client.on("message",message=>{
  let logChannel = message.guild.channels.cache.find(channel => channel.id === 'ايدي روم الوق')
   // if(message.member.hasPermission("ADMINISTRATOR")) return;
   if(!message.channel.guild) return; 
   let badsys = db.get(`badword_${message.guild.id}`)
   if(!badsys || badsys === false) return;
    let word = db.get(`system_${message.guild.id}`)
    if(word){
      let blackwords = db.get(`system_${message.guild.id}.words`)
   if(!blackwords) return;
      if(blackwords.includes(message.content.split(" ").join(" ").toLowerCase())) {
        message.delete()

        message.reply("Please dont say **Badwords**").then(m=>{
          m.delete({timeout:1500})
        })
        
   let layersb = message.content.split(" ").join(" ")
   
        let embed = new Discord.MessageEmbed()
        .setTitle('Anti BadWords System !')
        .setAuthor(message.author.tag,message.author.avatarURL({dynamic:true}))
        .addField("User",`Mention: <@${message.author.id}> (ID: ${message.author.id})`)
        .addField('Word',`||${layersb}||`)
        .setTimestamp()
      logChannel.send(embed)
      }
    }

})


////////////////////////////////////////////////////////////////////////////////////
