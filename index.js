const Bot = require('./Bot');

const run = async () => {
    const bot = new Bot();
    await bot.initPuppeteer().then(()=>console.log("Bot initialized"));
    
    await bot.visitInsta().then(()=>console.log("Bot started"));
    
    await bot.searchTags().then(()=>console.log("Bot researched"));  
    
    await closeBrowser().then(() => console.log("Browser closed"))    
}
run().catch(err => console.log(err.message));