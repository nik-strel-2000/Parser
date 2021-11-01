const { count, Console } = require('console');
const fs = require('fs');
const puppeteer = require('puppeteer');
const { attr } = require('cheerio/lib/api/attributes');
const cheerio = require('cheerio');
const { resourceUsage } = require('process');
const path = require('path');
const json2xls = require('json2xls');


let linkвфы = 'https://sofiadoors.com/catalog/mezhkomnatnye-dveri/kollektsiya_original?page=';

const urlSite = "https://sofiadoors.com"


const parserUrl = async(link) => {
    let urlCatalogs = [],
        allElements = [];
    let browser = await puppeteer.launch({
        //отображение браузера
        headless: true,
        slowMo: 100,
        devtools: true
    });
    let page = await browser.newPage()
    await page.setViewport({
        width: 1400,
        height: 900
    });
    try {
        await page.goto(`${link}`);
        //Ожидание загрузки до введенного элемента
        await page.waitForSelector('ul.fixed');
        //console.log(counter);
        //Создание cheerio объекта и загрузка в него данных
        const $ = cheerio.load(await page.content());

        const counter = $('#header > nav > div > div > ul').children('li').length;
        //console.log(counter);
        for (let i = 1; i <= counter; i++) {
            const counteChild = $(`#header > nav > div > div > ul > li:nth-child(${i})`).children('ul').children().length;
            //console.log(counteChild);
            for (let j = 1; j <= counteChild; j++) {
                const transName = $(`#header > nav > div > div > ul > li:nth-child(${i}) > ul > li:nth-child(${j})`).children('a').attr('href');
                //Все ссылки надо просортировать на проверку каталога и ссылки на сайт
                if (transName != undefined && transName.includes("/catalog")) urlCatalogs.push(transName);
                //console.log(transName, j);
            };
        };
        await browser.close();
        let max = urlCatalogs.length;
        console.log(`Количество категорий ${max}`)
            //Переделай
        for (let i = 1; i <= max; i++) {
            let mass = await parseCatalog(`${link}${urlCatalogs[i]}?page=`);
            allElements.push(mass);
        }
        console.log(allElements);

    } catch (error) {
        console.log(error);
    }
    //console.log(urlCatalogs);
    allElements = allElements.flat();
    //Запись в JSON файл
    fs.writeFile('test.json', JSON.stringify(allElements), err => { if (err) console.log('Error') });
    //const elements = require('../test.json');
    var xls = json2xls(allElements);

    fs.writeFileSync('data.xlsx', xls, 'binary');
};


const parseCatalog = async(link) => {

    let flag = true;
    let res = [];
    let counter = 1;

    try {
        let browser = await puppeteer.launch({
            //отоюражение браузера
            headless: true,
            slowMo: 100,
            devtools: true
        });
        let page = await browser.newPage()
        await page.setViewport({
            width: 1400,
            height: 900
        });

        while (flag) {
            //Загрузка страницы в объект
            await page.goto(`${link}${counter}`);
            //Ожидание загрузки до введенного элемента
            await page.waitForSelector('div.products-category');
            console.log(counter);
            //Создание cheerio объекта и загрузка в него данных
            const $ = cheerio.load(await page.content());
            //Проверка на последнюю страницу
            /**
             * Сделать проверку там где есть title-product 
             * https://sofiadoors.com/catalog/skrytye-dveri/skrytaa-dver-na-seba/invisible-na-seba
             * и Доделать Сортировку категорий в parseUrl
             */

            let pr = $('#content > div > div.text-center').children('ul.pagination')
            pr == null || pr == undefined || pr == '' ? flag = false : true;
            let prov = $('#content > div > div.text-center > ul > li.next.disabled > span').text();
            prov == '»' ? flag = false : true;
            //categoriProduct = $('#content > div > h1').text();

            let html = await page.evaluate(async() => {
                let pageNew = [];
                try {
                    let categoriProduct = $('#content > div > h1').text();
                    console.log(categoriProduct);
                    //Выборка всех карточек каталога (alls div)
                    let divs = document.querySelectorAll('div.product-item-container');

                    divs.forEach(div => {
                        //Поиск элемента (а)
                        let a = div.querySelector('a')
                            //Объект с название, стоимостью, и Категорией
                        let pris = div.querySelector('span.price-new').innerText;
                        let obj = {
                                title: a.title,
                                price: pris.includes('от') ? pris.substring(3, pris.length - 2) : pris.substring(0, pris.length - 2),
                                categori: categoriProduct
                            }
                            //Добавление объекта в массив
                        pageNew.push(obj);
                    });

                } catch (error) {
                    console.log(error);
                }
                //передача массива
                return pageNew;
            }, { waitUntil: 'li.next' })

            await res.push(html);

            res = res.flat();

            console.log(res);

            counter++;
        }
        await browser.close();
        return res;

    } catch (error) {
        console.log(error);
        await browser.close();
    }
};

// const fun = async() => {

// };
// fun();
parserUrl(urlSite);