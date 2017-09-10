const Discord = require('discord.js');
const client = new Discord.Client();

client.on('message', message => {

  data = message.content.match(/"(?:\\"|\\\\|[^"])*"|\S+/g);
  if(data[0] == "/rb"){

    if (data.length == 1){
      message.reply(help());
    }
    else if (data.length == 2){


      if(data[1] == "list"){
        var guild = message.guild;
        var botPosition = 0;
        for (let [id, role] of guild.roles){
            if(role.name == "roles-bot"){
              botPosition = role.calculatedPosition;
              break;
            }
        }

        var response = "\n";
        for (let [id, role] of guild.roles){
            if(role.calculatedPosition < botPosition && role.name != "@everyone"){
              response = response + "**Name**: " + role.name + "\n";
            }
        }

        message.reply(response);
      }
      else{
        message.reply(help());
      }
    }
    else if (data.length > 1){
      if(data[1] == "add"){
          var guild = message.guild;
          var user = guild.members.get(message.author.id);
          var tmpRole;
          for(var x = 2, n = data.length; x < n; x++){
            var parsedName = data[x].replace(/"/g, "");
            for (let [id, role] of guild.roles){
              if(parsedName == role.name){
                tmpRole = role;
                break;
              }
            }
            user.addRole(tmpRole).then(e => {message.reply("Successfully added role.");}).catch(e => {});
          }
      }

      else if(data[1] == "remove"){

          var guild = message.guild;
          var user = guild.members.get(message.author.id);
          var tmpRole;
          for(var x = 2, n = data.length; x < n; x++){
            var parsedName = data[x].replace(/"/g, "");
            for (let [id, role] of guild.roles){
              if(parsedName == role.name){
                tmpRole = role;
                break;
              }
            }
            user.removeRole(tmpRole).then(e => {message.reply("Successfully removed role.");}).catch(e => {});
          }
      }

      else{
        message.reply(help());
      }

    }


  }

});

client.login(process.env.BOT_TOKEN);


function help(){
  return "Commands:\n`/rb list` - Lists all roles in the server.\n`/rb add \"role\" \"role\"...` - Adds yourself to the following roles with role names in quotes.\n`/rb remove \"role\" \"role\"...` - Removes yourself from the following roles with role names in quotes."
}
