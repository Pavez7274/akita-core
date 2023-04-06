<h1 align="center">akita.ts</h1>

# Importing
```ts
import { AkitaClient } from "akita.ts";
// or const { AkitaClient } = require("akita.ts");
```

# Defining *client*
```ts
const client = new AkitaClient({
    auth: "Bot YOUR_TOKEN",
    gateway: {
        intents: [
            "GUILDS",
            "GUILD_MEMBERS"
            // ...
        ],
        maxShards: "auto"
    }
});
```

# Adding Commands
```ts
client.add_commands({
    names: [ "echo" ],
    type: 0, // CommandTypes.MESSAGE_CREATE
    code: "@send({ content: '@args.strify()' })"
});
```

# Listen Events
```ts
client.on_<snake-case event name>({ before?: "..." });

// this is just a before property example
client.add_command({
    names: ["..."],
    type: CommandTypes.UNKNOWN,
    code: "@log(@get(type))"
});
client.on_interaction_create({ before: "@set(type|INTERACTION)" });
client.on_message_create({ before: "@set(type|MESSAGE)" });
```