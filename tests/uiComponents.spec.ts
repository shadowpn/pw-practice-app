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
         const usingTheGridEnmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})//Объявляет переменную usingTheGridEnmailInput, которая использует локатор для нахождения текстового поля (textbox) внутри компонента 'nb-card' с текстом "Using the Grid". Это текстовое поле идентифицируется по его роли ('textbox') и названию ('Email').
         await usingTheGridEnmailInput.fill('shadowpn@gmail.com') //Заполняет найденное текстовое поле значением 'shadowpn@gmail.com'.
         await usingTheGridEnmailInput.clear() //Очищает текстовое поле от ранее введенных данных.
         await usingTheGridEnmailInput.pressSequentially('test@test.com', {delay:500}) //delay если нужно печать вводить даннне медленно.Последовательно набирает текст 'test@test.com' в текстовом поле, делая задержку в 500 миллисекунд между каждым нажатием клавиши. Эта строка, однако, может содержать ошибку, так как pressSequentially не является стандартным методом в Playwright. Вместо этого обычно используется метод type.
        
         //generic assertion
         const inputValue = await usingTheGridEnmailInput.inputValue() //Получает значение, введенное в текстовое поле, и сохраняет его в переменной inputValue.
         expect (inputValue).toEqual('test@test.com') //Проверяет, равно ли значение переменной inputValue строке 'test@test.com'. Это общая проверка, подтверждающая, что в поле ввода действительно находится указанный текст.

         //locator asseertion
         await expect(usingTheGridEnmailInput).toHaveValue('test@test.com') //Использует встроенный в Playwright метод проверки toHaveValue для подтверждения, что текстовое поле содержит значение 'test@test.com'. Это еще одна проверка, направленная на подтверждение правильности данных в поле ввода.
        })

        test('radio button', async  ({page}) => {
        const usingTheGridEnmailInput = page.locator('nb-card', {hasText: "Using the Grid"}) //Создает переменную usingTheGridEnmailInput, которая ссылается на элемент 'nb-card' на странице, содержащий текст "Using the Grid".
        await usingTheGridEnmailInput.getByLabel('Option 1').check({force: true}) //отмечаем радио кнопку через лейбу. Ищет и активирует радиокнопку с меткой 'Option 1' в пределах элемента usingTheGridEnmailInput. Опция {force: true} используется для выполнения действия независимо от видимости элемента.
        await usingTheGridEnmailInput.getByRole('radio', {name: 'Option 1'}).check({force: true}) //отмечаем радио кнопку через роль. Аналогично находит и активирует радиокнопку, но на этот раз используя ее ARIA роль 'radio' и имя 'Option 1'.
        const radioStatus = await usingTheGridEnmailInput.getByRole('radio', {name: 'Option 1'}).isChecked() //Получает статус радиокнопки (выбрана она или нет) и сохраняет его в переменной radioStatus.
        expect(radioStatus).toBeTruthy() // проводим валидацию проверку на true or false. Получает статус радиокнопки (выбрана она или нет) и сохраняет его в переменной radioStatus.
        await expect(usingTheGridEnmailInput.getByRole('radio', {name: 'Option 1'})).toBeChecked() //Использует встроенную проверку Playwright toBeChecked, чтобы удостовериться, что радиокнопка с именем 'Option 1' действительно выбрана.


        await usingTheGridEnmailInput.getByRole('radio', {name: 'Option 2'}).check({force: true}) //Активирует вторую радиокнопку с именем 'Option 2', также используя принудительный выбор.
        expect(await usingTheGridEnmailInput.getByRole('radio', {name: 'Option 1'}).isChecked()).toBeFalsy() //Проверяет, что первая радиокнопка ('Option 1') теперь не выбрана, так как выбор переключился на вторую радиокнопку ('Option 2').
        expect(await usingTheGridEnmailInput.getByRole('radio', {name: 'Option 2'}).isChecked()).toBeTruthy() //Подтверждает, что вторая радиокнопка ('Option 2') теперь выбрана.
    })

})
test('checkboxes', async({page}) => {
    await page.getByText("Modal & Overlays").click() //Ищет на странице элемент с текстом "Modal & Overlays" и кликает по нему. Это обычно используется для перехода на другую часть сайта или открытия модального окна.
    await page.getByText("Toastr").click() //Аналогично, ищет и кликает по элементу с текстом "Toastr". Это может быть действие, которое ведет пользователя к функциональности, связанной с уведомлениями (toasts).
  
    await page.getByRole('checkbox', {name: "Hide on click"}).check({force: true}) //Находит чекбокс с ARIA ролью 'checkbox' и названием "Hide on click" и устанавливает его в состояние 'checked' (активированный). Опция {force: true} используется для выполнения действия независимо от видимости элемента.
    await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).check({force: true}) //То же самое делает для чекбокса с названием "Prevent arising of duplicate toast".

    const allBoxes =  page.getByRole('checkbox') //Получает все элементы с ролью 'checkbox' на странице и сохраняет их в переменной allBoxes.
    for (const box of await allBoxes.all()) { //Создает цикл, в котором каждый найденный чекбокс обрабатывается по очереди.
        await box.uncheck({force: true}) //Снимает отметку с текущего чекбокса в цикле. Опять же, используется {force: true} для принудительного выполнения действия.
        expect(await box.isChecked()).toBeFalsy //Проверяет, что после снятия отметки чекбокс действительно находится в состоянии 'unchecked' (неактивированный). Однако, здесь возможна ошибка: вместо toBeFalsy должно быть toBeFalsy().
    }
})

test('lists and dropdowns', async({page}) => {
    const dropDownMenu = await page.locator('ngx-header nb-select')//Находит выпадающее меню с селектором 'ngx-header nb-select' и сохраняет его в переменной dropDownMenu.
    await dropDownMenu.click()//Кликает по найденному выпадающему меню для его раскрытия.

    page.getByRole('list') // when the list has a UL tag. Комментарий, объясняющий, как найти список с тегом UL, используя роль 'list'.
    page.getByRole('listitem') // when the list has a LI tag. Комментарий, объясняющий, как найти элемент списка с тегом LI, используя роль 'listitem'.
    
    //const optionList = page.getByRole('list').locator('nb-option')
    const optionList = page.locator('nb-option-list nb-option')  //можно делать двумя способам. Находит все опции в выпадающем списке с использованием селектора 'nb-option-list nb-option' и сохраняет их в переменной optionList.
    await expect(optionList).toHaveText(["Light","Dark", "Cosmic", "Corporate"]) //Проверяет, что в optionList присутствуют текстовые значения "Light", "Dark", "Cosmic", "Corporate".
    await optionList.filter({hasText: "Cosmic"}).click() //Находит и кликает по опции с текстом "Cosmic" в optionList.
    const header = page.locator('nb-layout-header') //Находит элемент заголовка (header) с селектором 'nb-layout-header' и сохраняет его в переменной header
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)') //Проверяет, что у элемента header фоновый цвет соответствует RGB значению 'rgb(50, 50, 89)', что соответствует выбранной опции "Cosmic".
    const colors = { //Определяет объект colors, который содержит соответствие между названиями опций и их цветовыми значениями RGB.
        "Light": "rgb(255, 255, 255)", //
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    }
    await dropDownMenu.click() //Снова кликает по выпадающему меню для его раскрытия
    for(const color in colors) { //loop проверят каждый цвет. Цикл, который перебирает все цвета в объекте colors.
        await optionList.filter({hasText: color}).click() //В каждой итерации цикла находит и кликает по опции в optionList, соответствующей текущему цвету.
        await expect(header).toHaveCSS('background-color', colors[color]) //Проверяет, что фоновый цвет элемента header соответствует ожидаемому цвету из объекта colors.
        if(color !="Corporate") //Если текущий цвет не "Corporate", то снова кликает по выпадающему меню для его раскрытия перед следующей итерацией цикла.
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
    const targetRow = page.getByRole('row', {name: "twitter@outlook.com"})//Находит строку в таблице, где есть текст "twitter@outlook.com". В этом контексте, getByRole('row', {name: ...}) используется для идентификации строки таблицы.
    await targetRow.locator('.nb-edit').click() //Находит кнопку редактирования (класс .nb-edit) в найденной строке и кликает по ней, чтобы начать редактирование строки.
    await page.locator('input-editor').getByPlaceholder('Age').clear() //Очищает поле ввода с плейсхолдером 'Age' в редакторе строки.
    await page.locator('input-editor').getByPlaceholder('Age').fill('35') //Заполняет это же поле ввода значением '35'.
    await page.locator('.nb-checkmark').click() //Кликает по кнопке с классом .nb-checkmark, что, вероятно, сохраняет изменения.
    
    //2 get the row based on the value in the specific column

    await page.locator('.ng2-smart-pagination-nav').getByText('2').click() //Переходит на вторую страницу пагинации в таблице, кликая по элементу с текстом '2'.
    const targetRowById = page.getByRole('row', {name: "11"}).filter({has: page.locator('td').nth(1).getByText('11')})//Находит строку по ее идентификатору или другому уникальному значению ('11'), используя фильтрацию по содержимому второй ячейки строки.
    await targetRowById.locator('.nb-edit').click() //Аналогично кликает по кнопке редактирования в найденной строке.
    await page.locator('input-editor').getByPlaceholder('E-mail').clear() //Очищает поле ввода с плейсхолдером 'E-mail' в редакторе строки.
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com') //Заполняет это же поле значением 'test@test.com'.
    await page.locator('.nb-checkmark').click() //Снова кликает по кнопке с классом .nb-checkmark, чтобы сохранить изменения.
    await expect(targetRowById.locator('td').nth(5)).toHaveText('test@test.com')//Проверяет, что пятая ячейка в измененной строке содержит текст 'test@test.com', подтверждая успешное редактирование.
    
    //3 test filter of the table 

    const ages = ["20", "30", "40", "200"] //Объявляет массив ages, содержащий строки со значениями "20", "30", "40", "200". Эти значения будут использоваться для фильтрации строк в таблице.

    for( let age of ages) { //Цикл for...of, который итерирует по каждому элементу массива ages.
        await page.locator('input-filter').getByPlaceholder('Age').clear() //Находит поле ввода с плейсхолдером 'Age' и очищает его. input-filter — это селектор для поля ввода фильтра.
        await page.locator('input-filter').getByPlaceholder('Age').fill(age) //Заполняет это же поле ввода текущим значением возраста (age) из массива ages.
        await page.waitForTimeout(500) //Ожидает 500 миллисекунд. Это может быть сделано для ожидания обновления данных в таблице после фильтрации.
        const ageRows = page.locator('tbody tr') //Находит все строки (tr) в теле таблицы (tbody) и сохраняет их в переменной ageRows.
       
        for(let row of await ageRows.all()) { //Второй цикл for...of, который проходит по каждой строке (row), найденной в ageRows.
            const cellValue = await row.locator('td').last().textContent() //Получает текстовое содержимое последней ячейки (td) в текущей строке (row).

            if(age == "200") { //Условный оператор, который проверяет, равно ли текущее значение age "200".
                expect(await page.getByRole('table').textContent()).toContain('No data found') //Если age равно "200", проверяет, что текст в таблице содержит фразу "No data found". Это предполагает, что для нереалистичного возраста "200" данных в таблице не найдено.
            } else {
                   expect(cellValue).toEqual(age) //В противном случае (для значений "20", "30", "40"), проверяет, что текст последней ячейки в каждой строке соответствует текущему значению age, что означает успешную фильтрацию таблицы по возрасту.
                }
            }
            
        }

})