const Discord = require('discord.js');
const client = new Discord.Client();

const embed = {
  "color": 123456,
  "fields": [
    {
      "name": "Listing Roles",
      "value": "```/rb list```"
    },
    {
      "name": "Adding Roles",
      "value": "```/rb add \"role1\" \"role2\" ...```"
    },
    {
      "name": "Removing Roles",
      "value": "```/rb remove \"role1\" \"role2\" ...```"
    }
  ]
};

function compareRoles(a, b){

  if (a.name < b.name){
    return -1;
  }
  if (a.name > b.name){
    return 1;
  }
  return 0;
}

client.on('ready', () => {
  client.user.setGame('/rb');
})

client.on('message', message => {

  data = message.content.match(/"(?:\\"|\\\\|[^"])*"|\S+/g);
  if(data != null && data[0] == "/rb"){

    if (data.length == 1){
      message.reply({embed});
    }
    else if (data.length == 2){

      if(data[1] == "list"){
        var guild = message.guild;
        guild.roles = guild.roles.sort(compareRoles);
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
        message.reply({embed});
      }
    }

    else if (data.length > 1){
      if(data[1] == "add"){
          var guild = message.guild;
          var user = guild.members.get(message.author.id);
          var tmpRole;
          for(var x = 2, n = data.length; x < n; x++){
            var parsedName = data[x].replace(/"/g, "").toLowerCase();
            for (let [id, role] of guild.roles){
              if(parsedName == role.name.toLowerCase()){
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
            var parsedName = data[x].replace(/"/g, "").toLowerCase();
            for (let [id, role] of guild.roles){
              if(parsedName == role.name.toLowerCase()){
                tmpRole = role;
                break;
              }
            }
            user.removeRole(tmpRole).then(e => {message.reply("Successfully removed role.");}).catch(e => {});
          }
      }
      else{
        message.reply({embed});
      }
    }
  }

});

client.login(process.env.BOT_TOKEN);
