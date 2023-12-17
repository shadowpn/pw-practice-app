import { Page } from "@playwright/test"
export class NavigationPage { //Определяет класс NavigationPage, который будет экспортирован для использования в других частях теста.
    
    readonly page: Page //Объявляет свойство page, которое является экземпляром класса Page из Playwright. Модификатор readonly указывает, что это свойство может быть присвоено только один раз (обычно в конструкторе).
    constructor(page: Page) { //Конструктор класса, который принимает объект страницы (Page) и инициализирует свойство page этим объектом.
       this.page = page
    }
    async formLayoutsPage() { //Асинхронный метод formLayoutsPage, который при вызове выполняет навигацию на страницу форм.
        await this.page.getByText("Forms").click() //Внутри метода formLayoutsPage, сначала находит и кликает по элементу с текстом "Forms", затем по элементу с текстом "Form Layouts" на странице.
        await this.selectGroupMenuItem('Forms') //Внутри метода formLayoutsPage, сначала находит и кликает по элементу с текстом "Forms", затем по элементу с текстом "Form Layouts" на странице.
        await this.page.getByText("Form Layouts").click()
    }
    async datepickerPage() {

        await this.selectGroupMenuItem('Forms')
        //await this.page.waitForTimeout(1000)
        await this.page.getByText('Datepicker').click()   

    }
    async smartTablePage(){
        await this.selectGroupMenuItem('Tables & Data') //Ищет на странице элемент с текстом 'Tables & Data' и кликает по нему. Это может быть кнопка или ссылка, переводящая пользователя на раздел сайта, связанный с таблицами и данными.
        await this.page.getByText('Smart Table').click() 
    }
    async toastrtPage() {
         await this.selectGroupMenuItem("Modal & Overlays") //Ищет на странице элемент с текстом "Modal & Overlays" и кликает по нему. Это обычно используется для перехода на другую часть сайта или открытия модального окна.
         await this.page.getByText("Toastr").click() //Аналогично, ищет и кликает по элементу с текстом "Toastr". Это может быть действие, которое ведет пользователя к функциональности, связанной с уведомлениями (toasts).
    }
    async tooltipPage(){
          await this.selectGroupMenuItem("Modal & Overlays") //Ищет на странице элемент с текстом "Modal & Overlays" и кликает по нему. Это обычно используется для перехода на другую часть сайта или открытия модального окна.
          await this.page.getByText("Tooltip").click() //Аналогично, ищет и кликает по элементу с текстом "Toastr". Это может быть действие, которое ведет пользователя к функциональности, связанной с уведомлениями (toasts).
    }
    private async selectGroupMenuItem(groupItemTitle: string) { //    private: Этот ключевой слово означает, что метод selectGroupMenuItem является приватным, то есть он может быть вызван только внутри класса, в котором он определен.async: Это ключевое слово указывает на то, что функция асинхронная. Асинхронные функции могут выполнять длительные сетевые запросы, операции с файлами или другие задачи, которые занимают время, без блокировки выполнения кода.
    //selectGroupMenuItem: Это название метода.
    //(groupItemTitle: string): Метод принимает один параметр - groupItemTitle, который является строкой. Это название элемента группового меню, с которым будет взаимодействовать функция.
        const groupMenuItem = this.page.getByTitle(groupItemTitle) //Объявляется постоянная переменная с именем groupMenuItem. Относится к объекту page текущего экземпляра класса. page обычно является объектом страницы Playwright, который представляет открытую страницу в браузере.
        const expendedState = await groupMenuItem.getAttribute('aria-expanded')  
        if(expendedState == "false") //Эта строка проверяет, равно ли значение переменной expendedState (которая содержит значение атрибута aria-expanded) строке "false". Если это так, то код внутри блока if будет выполнен.
          await groupMenuItem.click()
    }
}