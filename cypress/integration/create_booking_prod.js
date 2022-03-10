describe('Makes a Booking', () => {
    it('Opens book.qrono.dev, puts in dates and user info, and gets to the Confirmed page', () => {
        cy.intercept({
            method: 'GET',
            path: '/api/items/?account__handle=qronouptime',
        }).as('getItems');
        cy.visit('book.qrono.dev/qronouptime')
        cy.wait('@getItems')
        cy.wait(1)
        cy.intercept({
            method: 'GET',
            path: '/api/items/?account__handle=qronouptime&handle=bookingtest',
        }).as('getItemDetails');
        cy.contains('make_booking_test').click()
        cy.wait('@getItemDetails')
        cy.wait(1)
        cy.get('.DayPicker-NavButton--next').click()
        cy.contains('15').click()
        cy.contains('16').click()
        cy.contains('Next').click()
        cy.get('.input-container').contains('Full Name').parent().within(() => {cy.get('input').type('Cypress Testaroo')})
        cy.get('.input-container').contains('Email').parent().within(() => {cy.get('input').type('cypress-test@qrono.dev')})
        cy.get('#PhoneInput').type('201-351-1428') // real phone number that Priya generated via an app
        cy.contains('Confirm').click()
        cy.contains('Confirmed')
    })
  })