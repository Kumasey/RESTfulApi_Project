const Contact = require('../../../models/contactModel');

describe('Contact model', () => {
    describe('Contact Schema', () => {
        let contact1;
        beforeEach(() => {
            contact1 = {
                name: "My Note",
                email: "Note content body",
                gender: "Female",
                phone: "55442578475"
            };
        });
        test('should correctly validate', async () => {
            await expect(new Contact(contact1).validate()).resolves.toBeUndefined();
          });
        test('should throw a validation error if name is invalid', async () => {
            contact1.name = ""
            await expect(new Contact(contact1).validate()).rejects.toThrow();
          });
        test('should throw a validation error if email is invalid', async () => {
            contact1.email = ""
            await expect(new Contact(contact1).validate()).rejects.toThrow();
          });
        test('should throw a validation error if gender is invalid', async () => {
            contact1.gender = ""
            await expect(new Contact(contact1).validate()).rejects.toThrow();
          });
          test('should throw a validation error if phone is invalid', async () => {
            contact1.phone = ""
            await expect(new Contact(contact1).validate()).rejects.toThrow();
          });
    });
});