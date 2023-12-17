import {test, expect} from '@playwright/test'
import {NavigationPage} from '../page-objects/navigationPage'
import { FormLayoutsPage } from '../page-objects/formLayoutsPage'


test.beforeEach(async({page}) => {
   await page.goto("http://localhost:4200/")
   
})

test('navigate to home page', async({page}) => { //Определение теста с названием 'navigate to home page'.
    const navigateTo = new NavigationPage(page) //Создает новый экземпляр класса NavigationPage, передавая ему текущий объект page. Этот класс предположительно предназначен для упрощения навигации по страницам веб-приложения.

    await navigateTo.formLayoutsPage() //Вызывает метод formLayoutsPage экземпляра navigateTo
    await navigateTo.datepickerPage()
    await navigateTo.smartTablePage()
    await navigateTo.toastrtPage()
    await navigateTo.tooltipPage()
})

test('parametraized method', async({page}) => {
    const navigateTo = new NavigationPage(page)
    const onFormLayoutsPage = new FormLayoutsPage(page)

    await navigateTo.formLayoutsPage()
    await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectionOption('shadowpn@gmail.com', '12345', 'Option 2')
    await onFormLayoutsPage.submitInlineFormWithNameEmailAndCheckbox("Nataliia", 'test1@test.com', true)
}

)