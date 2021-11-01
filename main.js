const axios = require('axios');
const cheerio = require('cheerio');
const { attr } = require('cheerio/lib/api/attributes');
const urlSite = "https://sofiadoors.com"
    //Метод получения данных с сайта
const parse = async() => {
    const getHTML = async(url) => {

        const { data } = await axios.get(url);
        //setTimeout(() => { console.log("Property!"); }, 1000);
        return cheerio.load(data);

    };
    const $ = await getHTML(urlSite);
    const counter = $('#header > nav > div > div > ul').children('li').length;
    //console.log(counter);
    for (let i = 1; i <= counter; i++) {
        const counteChild = $(`#header > nav > div > div > ul > li:nth-child(${i})`).children('ul').children().length;
        //console.log(counteChild);
        for (let j = 1; j <= counteChild; j++) {
            const transName = $(`#header > nav > div > div > ul > li:nth-child(${i}) > ul > li:nth-child(${j})`).children('a').attr('href');
            //Все ссылки надо просортировать на проверку каталога и ссылки на сайт
            console.log(transName, j);
            //проверка на наличие 
            // if (transName != undefined && transName.includes('/catalog')) {
            //     let urlSelectedItem = urlSite + transName;
            //     const $get = await getHTML(urlSelectedItem);
            //     const info = $get('#content > div > div.products-list.row.nopadding-xs.so-filter-gird').children('div').length;
            //     console.log(info + " Карточек");
            // };

        };
        console.log("---------------------------------------------");
        // #header > nav > div > div > ul > li:nth-child(1) > ul > li:nth-child(2)
        // #header > nav > div > div > ul > li:nth-child(1) > ul > li:nth-child(15)
        //console.log(href);
    }
    //дороботать
    // for (let i = 1; i < PERMENNAI; i++){
    //     const selector = await getHTML('https://sofiadoors.com')
    // }
};
parse();
// let vto = $('#header > nav > div > div > ul').find('a').attr('href');

// axios.get('https://sofiadoors.com').then(html => {
//         const $ = cheerio.load(html.data)
//          let text = ''
//             // for (let a = 1; a < 10; a++) {

//         //     // for(let b = 1; a )
//         //     // $(`#header > nav > div > div > ul > li:nth-child(${a.toString()}) > ul > li:nth-child(1) > a`).each((i, elem) => {
//         //     //     text += `${$(elem).text()}\n`
//         //     // })


//         // }
//         // let per = $('#header > nav > div > div > ul').children('li').children('a').href();

//         //per = per.match(/[А-Я]?[а-я ]+|/g);
//         // console.log(per);
//         console.log(vto);
//     })
//Почитать документацию

// #header > nav > div > div > ul > li:nth-child(1) > a
// #header > nav > div > div > ul > li:nth-child(1) > ul > p
// #header > nav > div > div > ul > li:nth-child(1) > ul > li:nth-child(3)
// # header > nav > div > div > ul > li: nth - child(1) > a
// #header > nav > div > div > ul > li:nth-child(1) > ul > li:nth-child(2) > a
// #header > nav > div > div > ul > li:nth-child(1) > ul > li:nth-child(3) > a

// #header > nav > div > div > ul > li:nth-child(2) > ul > li:nth-child(2) > a

// #header > nav > div > div > ul > li:nth-child(3) > ul > li:nth-child(1) > a







//     body > div.wrapper.mobile__new > div.main-container > div > div > div:nth-child(2) > div > div > div.products-list.row.nopadding-xs.so-filter-gird > div:nth-child(1)
//     body > div.wrapper.mobile__new > div.main-container > div > div > div:nth-child(2) > div > div > div.products-list.row.nopadding-xs.so-filter-gird > div:nth-child(2)
//     body > div.wrapper.mobile__new > div.main-container > div > div > div:nth-child(2) > div > div > div.products-list.row.nopadding-xs.so-filter-gird > div:nth-child(3)

//     body > div.wrapper.mobile__new > div.main-container > div > div > div:nth-child(2) > div > div > div > div:nth-child(27)


//#content > div > div.products-list.row.nopadding-xs.so-filter-gird > div:nth-child(2) > div > div.right-block > h4 > a


//     body > div.wrapper.mobile__new > div.main-container > div > div > div:nth-child(2) > div > div > div.products-list.row.nopadding-xs.so-filter-gird > div:nth-child(2)
// // разные страницы
//     body > div.wrapper.mobile__new > div.main-container > div > div > div:nth-child(2) > div > div > div.products-list.row.nopadding-xs.so-filter-gird > div:nth-child(2)

//body > div.wrapper.mobile__new > div.main-container > div > div > div.row > div > h1

//body > div.wrapper.mobile__new > div.main-container > div > div > div:nth-child(2) > div > div > div.products-list.row.nopadding-xs.so-filter-gird > div:nth-child(1)
//#content > div > div.products-list.row.nopadding-xs.so-filter-gird > div:nth-child(2)

//#content > div > div.products-list.row.nopadding-xs.so-filter-gird > div:nth-child(2) > div > div.right-block > h4 > a
//#content > div > div.products-list.row.nopadding-xs.so-filter-gird > div:nth-child(2) > div > div.right-block > div.price > span.price-new

//#content > div > div.products-list.row.nopadding-xs.so-filter-gird > div:nth-child(10) > div > div.right-block > h4 > a

//#content > div > div.products-list.row.nopadding-xs.so-filter-gird > div:nth-child(26) > div > div.right-block > h4 > a

//#content > div > div.products-list.row.nopadding-xs.so-filter-gird > div:nth-child(38) > div > div.right-block > h4 > a

// #content > div > div.products-list.row.nopadding-xs.so-filter-gird > div:nth-child(6) > div > div.right-block > h4 > a
// #content > div > div.products-list.row.nopadding-xs.so-filter-gird > div:nth-child(6) > div > div.right-block > div.price > span.price-new