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


