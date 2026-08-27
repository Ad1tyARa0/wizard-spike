# Customer Capability

## Purpose

The Customer capability covers everything related to a signed-in shopper on the Hydrogen storefront: authenticating through Shopify's Storefront API customer access token flow (login, register, logout), persisting that session across page reloads via a secure cookie, rendering the customer's order history, viewing and editing profile fields, running the password recovery and reset flows, and associating the cart with the customer through cartBuyerIdentity so carts persist across sessions and devices.

## Requirements

### Requirement: authentication

The Customer MUST authenticate through the Storefront API customer access token flow, including login, registration, and logout, with the session persisted in a secure cookie that survives page reloads.

#### Scenario: successful login persists across reloads

- **WHEN** a visitor submits valid email and password to the login action
- **AND** the Storefront API returns a customerAccessToken
- **AND** the token is stored in an HttpOnly, Secure, SameSite cookie
- **THEN** the storefront renders the signed-in customer's name
- **AND** a full page reload keeps the customer signed in

#### Scenario: invalid credentials are rejected

- **WHEN** a visitor submits an email or password that fails Storefront API authentication
- **THEN** the storefront shows a form-level or field-level error message
- **AND** no customer access token cookie is created

#### Scenario: register creates a customer and signs them in

- **WHEN** a visitor registers with a valid email and password via the register action
- **AND** the customerCreate mutation returns a customerAccessToken
- **THEN** the customer is signed in immediately
- **AND** subsequent page loads show them as authenticated

#### Scenario: logout deletes the access token

- **WHEN** a signed-in customer invokes the logout action
- **AND** the customerAccessTokenDelete mutation succeeds
- **THEN** the access token cookie is removed
- **AND** protected customer routes redirect to the login page

### Requirement: account-orders

The Customer MUST render the signed-in customer's order history fetched from the Storefront API orders connection.

#### Scenario: order history renders for a signed-in customer

- **WHEN** a signed-in customer visits the orders page
- **AND** the loader queries the customer's orders via the Storefront API
- **THEN** the page lists each order with its number, processed date, and total price

#### Scenario: empty order history shows an empty state

- **WHEN** a signed-in customer with no orders visits the orders page
- **THEN** the page renders an empty-state message inviting the customer to shop

#### Scenario: unauthenticated access redirects to login

- **WHEN** a visitor who is not signed in requests the orders page
- **THEN** the storefront redirects them to the login page

### Requirement: profile

The Customer MUST be able to view and edit their profile fields (first name, last name, email) with client-side validation before submitting updates to the Storefront API.

#### Scenario: profile renders current customer fields

- **WHEN** a signed-in customer opens the profile page
- **THEN** the form is pre-filled with their first name, last name, and email from the Storefront API customer object

#### Scenario: invalid email blocks submission

- **WHEN** the customer edits their email to a value that fails email validation
- **THEN** an inline validation error is shown
- **AND** no update request is sent to the Storefront API

#### Scenario: valid update persists

- **WHEN** the customer submits valid profile changes
- **AND** the customerUpdate mutation succeeds
- **THEN** a success message confirms the update
- **AND** the form reflects the updated values

### Requirement: password-reset

The Customer MUST be able to initiate a password recovery and complete a password reset using the Storefront API customerRecover and customerReset mutations.

#### Scenario: recover request sends a reset email

- **WHEN** a customer submits their email on the recover form
- **AND** the customerRecover mutation is called with that email
- **THEN** the storefront shows a confirmation that a reset email was sent without revealing whether the account exists

#### Scenario: reset with valid token and password succeeds

- **WHEN** the customer opens the reset link containing a reset token and url
- **AND** submits a new password that meets the password policy
- **AND** the customerReset mutation returns a new customerAccessToken
- **THEN** the customer is signed in with the new password

#### Scenario: reset with expired or invalid token fails

- **WHEN** the customer submits a reset with an expired or invalid token
- **THEN** the storefront shows a reset error
- **AND** the customer is not signed in

### Requirement: cart-association

The Customer MUST have their cart associated with their account on login via cartBuyerIdentity so the cart persists across sessions and devices.

#### Scenario: login associates the anonymous cart with the customer

- **WHEN** a visitor with an existing cartId logs in
- **AND** the cartBuyerIdentityUpdate mutation is called with the customerAccessToken
- **THEN** the cart's buyer identity is updated to the signed-in customer

#### Scenario: cart persists across sessions and devices

- **WHEN** the signed-in customer logs out and later logs back in on another device
- **AND** the previously associated cart is retrieved by cartId
- **THEN** the saved cart contents are restored

#### Scenario: sign-in without an existing cart creates a fresh associated cart

- **WHEN** a customer signs in without an existing cartId
- **THEN** a new cart is created and associated with the customer's access token via cartBuyerIdentity
