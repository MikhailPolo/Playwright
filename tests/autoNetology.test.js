const { test, expect } = require('@playwright/test');
const { email, password } = require('./user.js');

test.describe('Positive Test', () => {
    test('valid test', async ({ page }) => {
        await page.goto('https://netology.ru/');
        await page.getByRole('link', { name: 'Войти' }).click();
        await page.getByPlaceholder('Email').click();
        await page.getByPlaceholder('Email').fill(email);
        await page.getByPlaceholder('Пароль').click();
        await page.getByPlaceholder('Пароль').fill(password);
        await page.getByTestId('login-submit-btn').click();
        const titleText = await page.textContent('h2');
        await expect(page.getByRole('heading', { name: 'Мои курсы и профессии' })).toHaveText(titleText);
    });
});

test.describe('Negative test', () => {
    test('invalid email', async ({ page }) => {
        await page.goto('https://netology.ru/');
        await page.getByRole('link', { name: 'Войти' }).click();
        await page.getByPlaceholder('Email').click();
        await page.getByPlaceholder('Email').fill("chelovek@chel.ru");
        await page.getByPlaceholder('Пароль').click();
        await page.getByPlaceholder('Пароль').fill(password);
        await page.getByTestId('login-submit-btn').click();
        await expect(page.getByTestId('login-error-hint')).toHaveText('Вы ввели неправильно логин или пароль');
    });
    test('invalid password', async ({ page }) => {
        await page.goto('https://netology.ru/');
        await page.getByRole('link', { name: 'Войти' }).click();
        await page.getByPlaceholder('Email').click();
        await page.getByPlaceholder('Email').fill(email);
        await page.getByPlaceholder('Пароль').click();
        await page.getByPlaceholder('Пароль').fill("123");
        await page.getByTestId('login-submit-btn').click();
        await expect(page.getByTestId('login-error-hint')).toHaveText('Вы ввели неправильно логин или пароль');
    });
    test('send empty form', async({ page }) => {
        await page.goto('https://netology.ru/');
        await page.getByRole('link', { name: 'Войти' }).click();
        await page.getByTestId('login-submit-btn').click();
        await expect(page.getByText('Обязательное поле').first()).toHaveText('Обязательное поле');
    });
});

