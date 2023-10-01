import {test} from '@playwright/test'

test.beforeAll(() => {
  
})
test.beforeEach(async({page}) => {
   await page.goto("http://localhost:4200/")
   await page.getByText("Forms").click()
   await page.getByText("Form Layouts").click()
})

test('Locator systax rules', async({page}) => {
   //by Tage name
   await page.locator('input').first().click()
   // by ID
   page.locator('#inputEmail1')
   //by class value
   page.locator('.shape-rectangle')
   //by atribute
   page.locator('[placeholder = "Email"]')
   //by class value (full)
   page.locator(
     '[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]'
)
   //combine diffrent selection tag+atribut
   page.locator('input placeholder = "Email"')
   //by XPath (this Not recommend)
   page.locator('//*[@id="#inputEmail1"')

   // by partial text match
   page.locator(':text("Using")')
   // by exect text match
   page.locator(':text-ist("Using the Grid")')
})
test('User facing locators', async({page}) => {
   await page.getByRole('textbox', {name: "Email"}).first().click()
   await page.getByRole('button', {name: "Sign in"}).first().click()
   await page.getByLabel('Email').first().click()

   await page.getByPlaceholder('Jane Doe').click()
   await page.getByText("Using the Grid").click()
   await page.getByTestId("SignIn").click()
   await page.getByTitle("IoT Dashboard").click()

})
test('locating child elements', async({page}) => {
   await page.locator('nb-card nb-radio :text-is("Option 1")').click()
   await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
   await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()
   await page.locator('nb-card').nth[3].getByRole('button').click()
})


