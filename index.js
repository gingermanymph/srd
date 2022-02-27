const puppeteer = require('puppeteer');

async function main() {

    const browser = await puppeteer.launch({
        headless: true,
        // args: ['--proxy-server=socks5://127.0.0.1:9053']
    });

    const r = r => Math.floor(Math.random() * r);

    const page = await browser.newPage();
    await page.setUserAgent(`Mozilla/5.0 (Macintosh; Intel Mac OS X ${r(10)}_${r(10)}_${r(10)}) AppleWebKit/${r(1000)}.${r(10)} (KHTML, like Gecko) Chrome/99.${r(10)}.${r(1000)}.${r(10)} Safari/537.${r(10)}`);

    await page.goto('http://stop-russian-desinformation.near.page');

    const userAgent = await page.evaluate(() => navigator.userAgent);
    console.log(userAgent);

    setTimeout(() => {
        browser.close();
        main();
    }, 600000); // 10min
}

try {
    main();
}
catch (e) {
    main();
}