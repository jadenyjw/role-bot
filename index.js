const Discord = require('discord.js');
const client = new Discord.Client();

client.on('message', message => {

  //console.log(message);
  data = message.content.split(" ");


  if(data[0] == "rb!"){

    if (data.length == 1){
      message.reply(help());
    }
    else if (data.length == 2){

      if(data[1] == "list"){
        var guild = message.guild;
        var count = 0;
        var response = "\n";
        for (let [id, role] of guild.roles){
          if (role.name != "@everyone" && role.name != "roles-bot"){
            response = response + "ID: " + id + " Name: " + role.name + "\n";
          }
        }
        message.reply(response);
      }
      else{
        message.reply(help());
      }
    }
    else if (data.length > 2){
      if(data[1] == "add"){
        var guild = message.guild;
        var user = guild.members.get(message.author.id);
        for(var x = 2, n = data.length; x < n; x++){
          user.addRole(data[x]);
        }
      }

      else if(data[1] == "remove"){
        var guild = message.guild;
        var user = guild.members.get(message.author.id);
        for(var x = 2, n = data.length; x < n; x++){
          user.removeRole(data[x]);
        }
      }
    }


  }

});

client.login('process.env.BOT_TOKEN');


function help(){
  return "Commands:\n list - Lists all roles in the server.\n add - Adds yourself to the following roles given IDs."
}
