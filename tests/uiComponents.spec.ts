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