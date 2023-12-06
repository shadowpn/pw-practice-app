
import { test, expect } from "@playwright/test"

test.beforeAll(() => { //general preconditions
  
})
test.beforeEach(async({page}, testInfo) => {
   await page.goto("http://uitestingplayground.com/ajax")
   await page.getByText('Button Triggering AJAX Request').click()
   testInfo.setTimeout(testInfo.timeout + 2000)
  
})

test('auto waiting', async({page}) => {
   const succsessButton = page.locator('.bg-success')
   //await succsessButton.click()

   //const text = await succsessButton.textContent()
   //await succsessButton.waitFor({state: "attached"})
   //const text = await succsessButton.allTextContents()
   //expect(text).toContain('Data loaded with AJAX get request.')
   await expect(succsessButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})
test('alternative waits', async({page}) => {
   const succsessButton = page.locator('.bg-success')
   

   //1) ______wait for element
   await page.waitForSelector('.bg-success')

   //2)_____wait for particular responce
   await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

   //3)____wait for network calls to be conpleted ("NOT RECOMMENDED")
   await page.waitForLoadState('networkidle')

   const text = await succsessButton.allTextContents()
   expect(text).toContain('Data loaded with AJAX get request.')
})

test('timeouts', async({page}) => {
 test.setTimeout(10000)
 test.slow()
 const succsessButton = page.locator('.bg-success')
 await succsessButton.click()

})



//Data loaded with AJAX get request.