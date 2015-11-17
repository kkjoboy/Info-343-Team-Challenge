describe('Signup App', function() {

	var lastname = element(by.name('lastname'));
	var email = element(by.name('email'));
	var birthdate = element(by.name('birthdate'));
	var password = element(by.name('pw1'));
	var passwordConfirm = element(by.name('pw2'));

    beforeEach(function() {
      //reload the page before each test
      browser.get('http://localhost:8000');
    });

	it('should show an error if the lastname field is touched and left blank', function() {
		lastname.click();
		email.click();
		expect(element(by.id('lastnameValidate')).getText()).toEqual('Your last name is required.');
	});

	it('should show an error if the email field is touched and left blank', function() {
		email.click();
		lastname.click();
		expect(element(by.id('emailBlankValidate')).getText()).toEqual('Enter your email.');
	});

	it('should show an error if the email field is given an invalid email', function() {
		email.sendKeys('test');
		lastname.click();
		expect(element(by.id('emailErrorValidate')).getText()).toEqual('Please enter a valid email.');
	});

	it('should show an error if a birthdate is put in the birthdate field that is below 13 years old', function() {
		birthdate.sendKeys('11/17/2005');
		expect(element(by.id('ageCheck')).getText()).toEqual('You must be at least 13.');
	});

	it('should show an error if a birthdate is put in the birthdate field that is an improper form', function() {
		birthdate.sendKeys('lol this is a test');
		expect(element(by.id('dateValidation')).getText()).toEqual('Your date format is invalid, please enter as mm/dd/yyyy!');
	});

	it('should show an error if password is clicked and nothing is inputted', function() {
		password.click();
		lastname.click();
		expect(element(by.id('passwordValidate')).getText()).toEqual('Password required!');
	});

	it('should show an error if password does not match passwordConfirm', function() {
		password.sendKeys('password');
		passwordConfirm.sendKeys('passwork');
		expect(element(by.id('passwordConfirmValidate')).getText()).toEqual('Passwords must be equal!');
	});

	it('should have the submit button disabled when the form is invalid', function() {
		expect(element(by.id('formSubmit')).isEnabled()).toBe(false);
	});

	it('should display an alert when the submit button is pressed', function() {
		lastname.sendKeys('test');
		email.sendKeys('test@mytestsite.com');
		birthdate.sendKeys('11/17/1996');
		password.sendKeys('password');
		passwordConfirm.sendKeys('password');
		element(by.id('formSubmit')).click();
		expect(element(by.id('submitAlert')).isDisplayed()).toBe(true);
	});
});