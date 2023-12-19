import {Page, expect} from '@playwright/test'
import { HelperBase } from './helperBase'

export class DatePickerPage extends HelperBase {
    //private readonly page: Page
    constructor(page: Page) { //Конструктор класса, который принимает объект страницы (Page) и инициализирует свойство page этим объектом.
       //this.page = page
       super(page)
    }
    async selectCommonDatePickerDateFromToday(numberOfDateFromToday: number) { 
        const calendarInputField = this.page.getByPlaceholder('Form Picker') //Находит поле ввода календаря по его плейсхолдеру "Form Picker".
        await calendarInputField.click() //Кликает по найденному полю ввода календаря для его активации (чтобы открыть виджет выбора даты).
        const dateToAssert =  await this.selectDateInTheCalendar(numberOfDateFromToday)

        // let date = new Date() //Создает объект Date, содержащий текущую дату и время.
        // date.setDate(date.getDate() + numberOfDateFromToday) //Устанавливает дату объекта date на 7 дней вперед от текущей даты.
        // const expectedDate = date.getDate().toString() //Получают числовую часть даты, сокращенное и полное название месяца на английском языке и год из объекта date.
        // const expectedMonthShot = date.toLocaleString('En-US', {month: 'short'})
        // const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
        // const expectedYear = date.getFullYear()
        // const dateToAssert = `${expectedMonthShot} ${expectedDate}, ${expectedYear}`

        // let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent() //Получает текст, который представляет текущий месяц и год в виджете календаря.
        // const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}` //Формирует строку с ожидаемым месяцем и годом.
        // while(!calendarMonthAndYear.includes(expectedMonthAndYear)){ //Цикл проверяет, совпадает ли текущий месяц и год в календаре с ожидаемыми. Если нет, кликает по стрелке для перехода к следующему месяцу, пока не найдет нужный месяц.
        //     await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
        //     calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        // }
        // await this.page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click() //Находит и кликает по ячейке календаря с ожидаемым числом. {exact: true} указывает на то, что выбор осуществляется по точному соответствию текста.
        
        await expect(calendarInputField).toHaveValue(dateToAssert)
    }
    async selectDatepickerWithRangeFromToday(startDayFromToday: number, endDayFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Range Picker') //Находит поле ввода календаря по его плейсхолдеру "Form Picker".
        await calendarInputField.click() //Кликает по найденному полю ввода календаря для его активации (чтобы открыть виджет выбора даты).
        const dateToAssertStart =  await this.selectDateInTheCalendar(startDayFromToday)
        const dateToAssertEnd =  await this.selectDateInTheCalendar(endDayFromToday)
        const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`
        await expect(calendarInputField).toHaveValue(dateToAssert)

    }
    private async selectDateInTheCalendar(numberOfDateFromToday: number) {
        let date = new Date() //Создает объект Date, содержащий текущую дату и время.
        date.setDate(date.getDate() + numberOfDateFromToday) //Устанавливает дату объекта date на 7 дней вперед от текущей даты.
        const expectedDate = date.getDate().toString() //Получают числовую часть даты, сокращенное и полное название месяца на английском языке и год из объекта date.
        const expectedMonthShot = date.toLocaleString('En-US', {month: 'short'})
        const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShot} ${expectedDate}, ${expectedYear}`

        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`
        while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }
        const dayCell = this.page.locator('[class="day-cell ng-star-inserted"]')
        const rangeCell = this.page.locator('[class="range-cell day-cell ng-star-inserted"]')
        if(await dayCell.first().isVisible()){
            await dayCell.getByText(expectedDate, {exact: true}).click()
        } else {
            await rangeCell.getByText(expectedDate, {exact: true}).click()
        }
        return dateToAssert
    }
}
       
