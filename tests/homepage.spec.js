// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Producciones Foro 7/);
  });

  test('should display hero section', async ({ page }) => {
    const hero = page.locator('.hero');
    await expect(hero).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    const navMenu = page.locator('.nav-menu');
    await expect(navMenu).toBeVisible();

    // Test navigation links
    const serviciosLink = page.locator('a[href="#servicios"]').first();
    await serviciosLink.click();
    await expect(page.locator('#servicios')).toBeInViewport();
  });

  test('should toggle mobile menu on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const navToggle = page.locator('.nav-toggle');
    await navToggle.click();

    const navMenu = page.locator('.nav-menu');
    await expect(navMenu).toHaveClass(/active/);
  });

  test('should have working theme toggle', async ({ page }) => {
    const themeToggle = page.locator('.theme-toggle');
    await themeToggle.click();

    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'dark');

    await themeToggle.click();
    await expect(html).toHaveAttribute('data-theme', 'light');
  });
});

test.describe('Contact Form', () => {
  test('should validate required fields', async ({ page }) => {
    await page.goto('/#contacto');

    const submitBtn = page.locator('.email-btn');
    await submitBtn.click();

    // Form should not submit without required fields
    await expect(page).toHaveURL(/invitados\.org/);
  });

  test('should have WhatsApp and Email buttons', async ({ page }) => {
    await page.goto('/#contacto');

    const whatsappBtn = page.locator('.whatsapp-btn');
    const emailBtn = page.locator('.email-btn');

    await expect(whatsappBtn).toBeVisible();
    await expect(emailBtn).toBeVisible();
  });
});

test.describe('FAQ Section', () => {
  test('should toggle FAQ items', async ({ page }) => {
    await page.goto('/#faq');

    const firstFaqItem = page.locator('.faq-item').first();
    const firstQuestion = firstFaqItem.locator('.faq-question');

    await firstQuestion.click();
    await expect(firstFaqItem).toHaveClass(/active/);

    await firstQuestion.click();
    await expect(firstFaqItem).not.toHaveClass(/active/);
  });
});

test.describe('Gallery', () => {
  test('should filter gallery items', async ({ page }) => {
    await page.goto('/#portafolio');

    // Click on Bodas filter
    const bodasFilter = page.locator('.filter-btn[data-filter="bodas"]');
    await bodasFilter.click();

    // Check that only bodas items are visible
    const bodasItems = page.locator('.photo-item[data-category="bodas"]');
    const otherItems = page.locator('.photo-item:not([data-category="bodas"])');

    await expect(bodasItems.first()).toBeVisible();
    // Wait for animation
    await page.waitForTimeout(400);
  });

  test('should open lightbox on image click', async ({ page }) => {
    await page.goto('/#portafolio');

    const firstImage = page.locator('.photo-item').first();
    await firstImage.click();

    const lightbox = page.locator('#lightboxModal');
    await expect(lightbox).toHaveCSS('display', 'block');
  });
});

test.describe('Performance & SEO', () => {
  test('should have meta description', async ({ page }) => {
    await page.goto('/');

    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /Fotografía profesional/);
  });

  test('should have Open Graph tags', async ({ page }) => {
    await page.goto('/');

    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /Producciones Foro 7/);
  });

  test('should have manifest.json', async ({ page }) => {
    const response = await page.goto('/manifest.json');
    expect(response?.status()).toBe(200);
  });

  test('should register service worker', async ({ page }) => {
    await page.goto('/');

    // Wait for service worker registration
    await page.waitForTimeout(2000);

    const swRegistered = await page.evaluate(async () => {
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        return registrations.length > 0;
      }
      return false;
    });

    expect(swRegistered).toBe(true);
  });
});

test.describe('Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
  });

  test('should have alt text on images', async ({ page }) => {
    await page.goto('/');

    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < Math.min(count, 10); i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('should have ARIA labels on icon buttons', async ({ page }) => {
    await page.goto('/');

    const themeToggle = page.locator('.theme-toggle');
    await expect(themeToggle).toHaveAttribute('aria-label');
  });
});
