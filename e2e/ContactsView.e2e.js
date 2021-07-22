/* eslint-env detox/detox, jest */
describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have ContactsView', async () => {
    await expect(element(by.id('contacts-view'))).toBeVisible();
  });

  it('should show details of specific contact after tap on its avatar', async () => {
    await element(by.id('avatar-container-1')).tap();
    await expect(element(by.id('details-container-1'))).toBeVisible();
  });

  it('should show avatar of specific contact after swiping up to that contact details', async () => {
    await element(by.id('details-scrollview')).swipe('up');
    await element(by.id('details-scrollview')).swipe('up');
    await expect(element(by.id('avatar-container-2'))).toBeVisible();
  });

  it('should center avatar of selected contact after swiping up to that contact details', async () => {
    await element(by.id('details-scrollview')).swipe('up');
    await element(by.id('details-scrollview')).swipe('up');
    await expect(element(by.id('avatar-container-1'))).toBeVisible();
    await expect(element(by.id('avatar-container-3'))).toBeVisible();
  });

  it('should allow to swipe avatars and center details of selected contact', async () => {
    await element(by.id('avatars-scrollview')).swipe('left', 'slow', 0.25);
    await expect(element(by.id('details-container-1'))).toBeVisible();
  });

  it('should allow to scroll avatars and center details of selected contact', async () => {
    await element(by.id('avatars-scrollview')).scroll(116, 'right'); // SIZE
    await expect(element(by.id('details-container-1'))).toBeVisible();
  });
});
