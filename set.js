const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUk3VGlHOVIraGNRaUlmZkxpditvdXlvK1FnQVd3SHB4UWNqQjdhS3VYND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNGdjR2JsN3FZbmhrS2dGRVB3WFo0LzNsTzBFOGhwMnN0VW00bVBqR2pTRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3QUNvL1greE9oSzZXeU1zaG9GWVJjMGRVQUttSG9UMGxCN0syeDBKeVd3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJOa3V5RDc4UkdSTnVrRktiNmN1aUtXTDErK0o5Z0VOOFZJV1c0U0dyTng4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFObnY1dEZPSUR1czVjWmpMN1QzWE44STRtRTFUb0tjZzgwbkRlNWFYWHc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVpazU1SVZTQXpWcCtDSmd5VWNFa3hWZnllLzRuYWtOcDhjNVY5eXovRzA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0g3MHRiMTJ0RWdzTDIxSkdpUzVkWmVBYzVvQUZza2V2Vnp2WU5qMnRucz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidU5kZ25xYnNOVDI4TDJYbEhLREZSMHUrenMzUnA4Sk1vbmlmci9uVUxWbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJEeDFsSDhmN25YQmwzUTQ4RmVvWmZNamhsOWo2QjdndDZ3TWliUXlmNmFEY01IOU5reElHWEc0OFVTSEJ6TmdNdXQwaGl3cmR2WmJ0eDhzMElpT0FRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjAsImFkdlNlY3JldEtleSI6IjlYNEpSNUlOZ3gxSVh4VmR4cGRjSUt4eG1aZ3VXeGpZWmFXM1A3RW5Wb1k9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InpBRzJuVXZRUm5PdEtSRUZFcThYcWciLCJwaG9uZUlkIjoiZGU3NWM5YzEtMGE5Yy00YjNkLWI1NjAtZGViZDZkMDU0YWIzIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFHbkRKdFZBaXVoYWpYTGdieFBXZTExdmVzTT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI3SFhHN3Z0a0JuZ1JWZzRqRk9PbEFaNjlhYTg9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiMjU4VkxCWVIiLCJtZSI6eyJpZCI6IjI1NDc5NjA4Nzc2NDoxOEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJDZWVqYXkifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ08vZDNVc1EzNEdydkFZWUN5QUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Im5vRE9ZNSs5VmxTQUNrWUZmZVprKzI4NTRsaTV5V2JwTnZLTVNpUHE4a1E9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjhYYXMxWWdHb2d4cGF0NHVVblFjdHEwMHFFNlZYYmgxc1pVTnMyclp5ZThVL0RVUjdLaUVoK21jU2wrU1B2eldNRGh6Mm8waXo4aGFYUkZlUElySkJRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIwVnBLZVpLMVUyQ1JXSTlaMlcza3pRa1h0VVhFcTg4aDR2REl2SDBEWDJwUis3blFrU280aFNxT2U3djdGSVlVUVB2Y05FczAwMG5jajE3UWtzRHlDZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc5NjA4Nzc2NDoxOEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJaNkF6bU9mdlZaVWdBcEdCWDNtWlB0dk9lSll1Y2xtNlRieWpFb2o2dkpFIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM3MTQ2NjI4LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQVBaKyJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    AUTOREAD_MESSAGE : process.env.AUTO_READ || "yes",
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TECH : process.env.AUTO_REACT_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
