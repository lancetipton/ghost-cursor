import type { Page } from 'playwright'
import { createCursor, GhostCursor } from '../spoof'
import { join } from 'path'
import { promises as fs } from 'fs'
import installMouseHelper from '../mouse-helper'

declare const page: Page

let cursor: GhostCursor

describe('Mouse movements', () => {
  beforeAll(async () => {
    await installMouseHelper(page)
    const html = await fs.readFile(join(__dirname, 'custom-page.html'), 'utf8')
    await page.setContent(html, { waitUntil: 'networkidle' })
  })

  beforeEach(async () => {
    const locator = await page.locator('#box')
    await locator.evaluate(node => {
      node.innerHTML = '0'
    })
  })

  it('Should click on the element without throwing an error (CSS selector)', async () => {
    cursor = createCursor(page)

    const locator = await page.locator('#box')
    const orgAmount = await locator.innerHTML()
    expect(orgAmount).toBe('0')

    await cursor.click('#box')

    const amount = await locator.innerHTML()
    expect(amount).toBe('1')
  })

  it('Should click on the element without throwing an error (XPath selector)', async () => {
    cursor = createCursor(page)

    const locator = await page.locator('#box')
    const orgAmount = await locator.innerHTML()
    expect(orgAmount).toBe('0')

    await cursor.click('//*[@id="box"]')

    const amount = await locator.innerHTML()
    expect(amount).toBe('1')
  })

  it('Should click on the element without throwing an error (Locator selector)', async () => {
    cursor = createCursor(page)

    const locator = await page.locator('#box')
    const orgAmount = await locator.innerHTML()
    expect(orgAmount).toBe('0')

    await cursor.click(locator)

    const amount = await locator.innerHTML()
    expect(amount).toBe('1')
  })
})

jest.setTimeout(15_000)
