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