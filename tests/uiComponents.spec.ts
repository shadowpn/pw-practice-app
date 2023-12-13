import { test, expect } from "@playwright/test"

test.beforeEach(async({page}) => {
   await page.goto("http://localhost:4200/")
   
})
test.describe('Form Layout page', () => {
    
    test.beforeEach(async({page}) => {
    
    await page.getByText("Forms").click()
    await page.getByText("Form Layouts").click()
    })
        test('input fields', async({page}) => {
         const usingTheGridEnmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})
         await usingTheGridEnmailInput.fill('shadowpn@gmail.com') //заполнить значениями поля
         await usingTheGridEnmailInput.clear()
         await usingTheGridEnmailInput.pressSequentially('test@test.com', {delay:500}) //delay если нужно печать вводить даннне медленно
        
         //generic assertion
         const inputValue = await usingTheGridEnmailInput.inputValue()
         expect (inputValue).toEqual('test@test.com')

         //locator asseertion
         await expect(usingTheGridEnmailInput).toHaveValue('test@test.com')
        })

        test('radio button', async  ({page}) => {
        const usingTheGridEnmailInput = page.locator('nb-card', {hasText: "Using the Grid"})
        await usingTheGridEnmailInput.getByLabel('Option 1').check({force: true}) //отмечаем радио кнопку через лейбу
        await usingTheGridEnmailInput.getByRole('radio', {name: 'Option 1'}).check({force: true}) //отмечаем радио кнопку через роль
        const radioStatus = await usingTheGridEnmailInput.getByRole('radio', {name: 'Option 1'}).isChecked()
        expect(radioStatus).toBeTruthy() // проводим валидацию проверку на true or false
        await expect(usingTheGridEnmailInput.getByRole('radio', {name: 'Option 1'})).toBeChecked()


        await usingTheGridEnmailInput.getByRole('radio', {name: 'Option 2'}).check({force: true})
        expect(await usingTheGridEnmailInput.getByRole('radio', {name: 'Option 1'}).isChecked()).toBeFalsy()
        expect(await usingTheGridEnmailInput.getByRole('radio', {name: 'Option 2'}).isChecked()).toBeTruthy()
    })

})
test('checkboxes', async({page}) => {
    await page.getByText("Modal & Overlays").click()
    await page.getByText("Toastr").click()  
  
    await page.getByRole('checkbox', {name: "Hide on click"}).check({force: true})
    await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).check({force: true})

    const allBoxes =  page.getByRole('checkbox')
    for (const box of await allBoxes.all()) {
        await box.uncheck({force: true})
        expect(await box.isChecked()).toBeFalsy
    }
})

test('lists and dropdowns', async({page}) => {
    const dropDownMenu = await page.locator('ngx-header nb-select')
    await dropDownMenu.click()

    page.getByRole('list') // when the list has a UL tag
    page.getByRole('listitem') // when the list has a LI tag
    
    //const optionList = page.getByRole('list').locator('nb-option')
    const optionList = page.locator('nb-option-list nb-option')  //можно делать двумя способами 
    await expect(optionList).toHaveText(["Light","Dark", "Cosmic", "Corporate"])
    await optionList.filter({hasText: "Cosmic"}).click()
    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')
    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    }
    await dropDownMenu.click()
    for(const color in colors) { //loop проверят каждый цвет
        await optionList.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if(color !="Corporate")
        await dropDownMenu.click()
    }
})

test('tooltips', async({page}) => { //указывает на асинхронный тест, где page - это объект страницы, с которым будет взаимодействовать тест.
    await page.getByText('Modal & Overlay').click() //Ищет элемент на странице, содержащий текст 'Modal & Overlay', и кликает по нему. Это может быть, например, кнопка или ссылка, которая открывает модальное окно или оверлей.
    await page.getByText('Tooltip').click() //Аналогично, ищет и кликает по элементу с текстом 'Tooltip'. Это действие, вероятно, переносит пользователя на раздел страницы, связанный с всплывающими подсказками.
    const toolTipCard = page.locator('nb-card', {hasText: "Tooltip Placements"}) //Определяет переменную toolTipCard, которая ссылается на элемент с тегом или классом 'nb-card', содержащим текст 'Tooltip Placements'. Это может быть карточка или раздел на странице, где демонстрируются различные расположения всплывающих подсказок.
    await toolTipCard.getByRole('button', {name: "TOP"}).hover() //Находит внутри toolTipCard кнопку с ариа-ролью 'button' и текстом 'TOP', затем наводит на неё курсор мыши. Это, вероятно, вызывает всплывающую подсказку.

    page.getByRole('tooltip') //if you have a role tooltip created - Это комментарий, предполагающий, что если у вас создана ариа-роль 'tooltip', можно использовать её для поиска всплывающей подсказки. Эта строка сама по себе не выполняет никаких действий.
    const tooltip  = await page.locator('nb-tooltip').textContent() //Определяет переменную tooltip, которая получает текстовое содержимое элемента с селектором 'nb-tooltip'. Это предположительно элемент, отображающий всплывающую подсказку.
    expect(tooltip).toEqual('This is a tooltip') // Проверяет, соответствует ли текст всплывающей подсказки ожидаемому значению 'This is a tooltip'. Это утверждение теста, которое проверяет, правильно ли работают всплывающие подсказки.
})

test('Dialog boxes', async({page}) => {
    await page.getByText('Tables & Data').click() //Ищет на странице элемент с текстом 'Tables & Data' и кликает по нему. Это может быть кнопка или ссылка, переводящая пользователя на раздел сайта, связанный с таблицами и данными.
    await page.getByText('Smart Table').click() //Аналогично, ищет и кликает по элементу с текстом 'Smart Table'. Это действие, вероятно, ведет пользователя к функциональности 'умной' таблицы на сайте.
    
    page.on('dialog', dialog => { //Устанавливает обработчик событий для диалоговых окон на странице. Каждый раз, когда на странице появляется диалоговое окно, выполняется следующий код.
        expect(dialog.message()).toEqual('Are you sure you want to delete?') //Проверяет, соответствует ли сообщение в диалоговом окне ожидаемому тексту 'Are you sure you want to delete?'. Это подтверждает, что появилось правильное диалоговое окно.
        dialog.accept() //Принимает или подтверждает диалоговое окно. Это действие обычно имитирует нажатие кнопки 'OK' или 'Принять' в диалоговом окне.
    })
    await page.getByRole('table').locator('tr', {hasText: "mdo@gmail.com"}).locator('.nb-trash').click() //Находит в таблице строку, содержащую текст "mdo@gmail.com", затем находит в этой строке элемент с классом '.nb-trash' (предположительно, кнопку удаления) и кликает по нему. Это действие должно вызвать диалоговое окно подтверждения удаления.
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com') //Проверяет, что первая строка в таблице больше не содержит текст 'mdo@gmail.com'. Это подтверждает, что запись была успешно удалена из таблицы после подтверждения в диалоговом окне.
})

test('web tables', async ({page}) => {
    await page.getByText('Tables & Data').click() //Ищет на странице элемент с текстом 'Tables & Data' и кликает по нему. Это может быть кнопка или ссылка, переводящая пользователя на раздел сайта, связанный с таблицами и данными.
    await page.getByText('Smart Table').click() //Аналогично, ищет и кликает по элементу с текстом 'Smart Table'. Это действие, вероятно, ведет пользователя к функциональности 'умной' таблицы на сайте.
    
    // 1 get the row  by any testin this row
    const targetRow = page.getByRole('row', {name: "twitter@outlook.com"})
    await targetRow.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('35')
    await page.locator('.nb-checkmark').click()
    
    //2 get the row based on the value in the specific column

    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
    const targetRowById = page.getByRole('row', {name: "11"}).filter({has: page.locator('td').nth(1).getByText('11')})
    await targetRowById.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com')
    await page.locator('.nb-checkmark').click()
    await expect(targetRowById.locator('td').nth(5)).toHaveText('test@test.com')
})