import {test, expect} from '@playwright/test'
import {NavigationPage} from '../page-objects/navigationPage'


test.beforeEach(async({page}) => {
   await page.goto("http://localhost:4200/")
   
})

test('navigate to home page', async({page}) => { //Определение теста с названием 'navigate to home page'.
    const navigateTo = new NavigationPage(page) //Создает новый экземпляр класса NavigationPage, передавая ему текущий объект page. Этот класс предположительно предназначен для упрощения навигации по страницам веб-приложения.

    await navigateTo.formLayoutsPage() //Вызывает метод formLayoutsPage экземпляра navigateTo
})