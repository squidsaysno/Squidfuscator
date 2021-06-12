const { readdirSync } = require("fs");

const ascii = require("ascii-table");

module.exports = (client) => {
    readdirSync("./Commands/").forEach(dir => {
        const commands = readdirSync(`./Commands/`).filter(file => file.endsWith(".js"));
    
        for (let file of commands) {
            let pull = require(`../Commands/${file}`);
    
            if (pull.name) {
                client.commands.set(pull.name, pull);
            } else {
                console.log("Couldnt load file")
                continue;
            }
    
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
}