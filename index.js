class InstaBot{
    constructor(){
        this.firebase = require('./firebase_db');
        this.config = require('./config/puppeteer.json');
        const shuffle = require('shuffle-array');
    }
    async initPuppeteer(){
        const puppeteer = require('puppeteer');
        this.browser = await puppeteer.launch({
            headless: this.config.settings.headless
        });
        this.page = await this.browser.newPage();
        await this.page.setViewport({width:1500, height:764});
        }
    
    async visitInsta(){
        await this.page.goto(this.config.base_url);
        await this.page.click(this.config.selectors.username_field);
        await this.page.keyboard.type(this.config.username);
        await this.page.click(this.config.selectors.password_field);
        await this.page.keyboard.type(this.config.password);
        await this.page.click(this.config.selectors.login_button);
        await this.page.waitForNavigation();
        }
        
    async searchTags(){
            let hashtags = shuffle(this.config.hashtags);
            for (let hl = 0; hl < hashtags.length; hl++) {
                await this.page.goto('https://www.instagram.com/explore/tags/' + hashtags[hl] + '/?hl=en');
                console.log('hashtag search: ' + hashtags[hl]);
            //les 9 derniers posts
            for (let i = 1; i < 4; i++) {
                for (let c = 1; c < 4; c++) {
                    
                //selection du post
                    let br = false;
                    await this.page.click('section > main > article > div:nth-child(3) > div > div:nth-child(' + i + ') > div:nth-child(' + c +') > a').catch(() => {
                        br = true;
                    });
                    await this.page.waitForTimeout(2250 + Math.floor(Math.random() * 250));
                    if (br) continue;
                    //
                    let hasEmptyHeart = await this.page.$(this.config.selectors.post_heart_grey);
                    
                    let username = await this.page.evaluate(x => {
                    let element = document.querySelector(x);
                    return Promise.resolve(element ? element.innerHTML : '');
                    }, this.config.selectors.post_username);
                    
                    let followStatus = await this.page.evaluate(x => {
                    let element = document.querySelector(x);
                    return Promise.resolve(element ? element.innerHTML : '');
                }, this.config.selectors.post_follow_link);

                console.log('post from ' + username);
                
                // liker post
                if (hasEmptyHeart !== null && Math.random() < this.config.settings.like_ratio) {
                    await this.page.click(this.config.selectors.post_like_button);
                    console.log('---> like for ' + username);
                    await this.page.waitFor(10000 + Math.floor(Math.random() * 5000));
                }
                
            }
          }
                
        }  
    }  
            
    async closeBrowser(){
        await this.browser.close();
    }  
}
module.exports = InstaBot;