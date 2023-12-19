import {test, expect} from '@playwright/test'
import {PageManager} from '../page-objects/pageManager'
//import {NavigationPage} from '../page-objects/navigationPage' - эти 3 импорта не нужно потому что мы уже импортируем Page Manager а там уже все конструкции есть 
//import { FormLayoutsPage } from '../page-objects/formLayoutsPage'
//import { DatePickerPage }  from '../page-objects/datepickerPage'


test.beforeEach(async({page}) => {
   await page.goto("http://localhost:4200/")
   
})

test('navigate to home page', async({page}) => { //Определение теста с названием 'navigate to home page'.
    const pm = new PageManager(page)
    //const navigateTo = new NavigationPage(page) //Создает новый экземпляр класса NavigationPage, передавая ему текущий объект page. Этот класс предположительно предназначен для упрощения навигации по страницам веб-приложения.

    await pm.navigateTo().formLayoutsPage() //Вызывает метод formLayoutsPage экземпляра navigateTo
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrtPage()
    await pm.navigateTo().tooltipPage()
})

test('parametraized method', async({page}) => {
    const pm = new PageManager(page)
    //const navigateTo = new NavigationPage(page) -> если уаотребляем page manager то это константа не нужна
    //const onFormLayoutsPage = new FormLayoutsPage(page)
    //const onDatepickerPage = new DatePickerPage(page)

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectionOption('shadowpn@gmail.com', '12345', 'Option 2')
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox("Nataliia", 'test1@test.com', true)
    await pm.navigateTo().datepickerPage()
    await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(1)
    await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(6, 10)
})

