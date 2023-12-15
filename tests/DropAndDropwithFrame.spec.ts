import { test, expect } from "@playwright/test"

test('drag and drop with iframe', async({page}) => { //Определение теста для проверки функциональности drag-and-drop с использованием iframe.
   await page.goto('https://www.globalsqa.com/demo-site/draganddrop/') //Переход на указанный URL.

   const frame = page.frameLocator('[rel-title="Photo Manager"] iframe') //Находит iframe с определенным селектором на странице.
   await frame.locator('li', {hasText:"High Tatras 2"}).dragTo(frame.locator('#trash')) //Выполняет действие drag-and-drop для элемента с текстом "High Tatras 2" в корзину (trash).
   await frame.locator('li', {hasText:"High Tatras 3"}).dragTo(frame.locator('#trash')) //Аналогично перетаскивает элемент "High Tatras 3" в корзину.

   //more presic control 
    await frame.locator('li', {hasText:"High Tatras 4"}).hover()
    await page.mouse.down() // Более точное управление перетаскиванием:
    await frame.locator('#trash').hover()
    await page.mouse.up()
    
    await expect(frame.locator('#trash li h5')).toHaveText(["High Tatras 2","High Tatras 3", "High Tatras 4"]) //Проверяет, что элементы успешно перемещены в корзину.
})