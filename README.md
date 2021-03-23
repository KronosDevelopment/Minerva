### Minerva - A Discord captcha bot that verifies users externally from Discord.
- Minerva is open-sourced, meaning you can fork/clone this github repository to host Minerva.
- This is just a kind of a rewrite of Euphoria Captcha Bot made by me.

## Features:
- Utilitize Sharding
- Multi-core request processing for performance
- Uses JWT to verify users.

## How to use Minerva:
- You can fork the github repo or.. You can clone this repository into your server or device!

```powershell
git clone https://github.com/KronosDevelopment/minerva
```

- Then head to the directory with Minerva in it.

```powershell
# This is just an example!
cd minerva
```

- But firstly edit the .env file with the needed configurations, such as the Discord token, and the MongoDB url.

- Install all needed dependencies via **npm**:

```powershell
npm install # Installs all dependencies that are needed.
```

- You can start using Minerva by just typing an 11-character command!

```powershell
npm run start # Starts the server and the discord bot.
```
