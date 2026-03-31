/**
 * Test Data and Constants
 */

export const TEST_DATA = {
  validUser: {
    email: 'test@example.com',
    password: 'TestPassword123!',
    phone: '9999999999',
  },

  invalidUser: {
    email: 'invalid@test.com',
    password: 'wrongpassword',
  },

  searchTerms: {
    laptop: 'laptop',
    shoes: 'shoes',
    watch: 'watch',
    phone: 'phone',
    headphones: 'headphones',
  },

  testAddress: {
    name: 'John Doe',
    phone: '9876543210',
    address: '123 Test Street',
    city: 'Test City',
    state: 'Test State',
    zip: '123456',
  },

  testCard: {
    cardNumber: '4111111111111111',
    cardHolder: 'John Doe',
    expiry: '12/25',
    cvv: '123',
  },

  priceRanges: {
    budget: { min: '1000', max: '5000' },
    midRange: { min: '5000', max: '15000' },
    premium: { min: '15000', max: '50000' },
  },

  couponCodes: {
    valid: 'SAVE10',
    invalid: 'INVALID123',
  },
};

export const URLS = {
  homepage: 'https://www.flipkart.com/',
  login: 'https://www.flipkart.com/account/login',
  cart: 'https://www.flipkart.com/viewcart',
};