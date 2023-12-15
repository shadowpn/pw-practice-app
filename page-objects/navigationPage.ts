import { Page } from "@playwright/test"

export class NavigationPage { //Определяет класс NavigationPage, который будет экспортирован для использования в других частях теста.
    
    readonly page: Page //Объявляет свойство page, которое является экземпляром класса Page из Playwright. Модификатор readonly указывает, что это свойство может быть присвоено только один раз (обычно в конструкторе).
    constructor(page: Page) { //Конструктор класса, который принимает объект страницы (Page) и инициализирует свойство page этим объектом.
       this.page = page
    }
    async formLayoutsPage() { //Асинхронный метод formLayoutsPage, который при вызове выполняет навигацию на страницу форм.
        await this.page.getByText("Forms").click() //Внутри метода formLayoutsPage, сначала находит и кликает по элементу с текстом "Forms", затем по элементу с текстом "Form Layouts" на странице.
        await this.page.getByText("Form Layouts").click()
    }
}