import { LightningElement, wire } from 'lwc';

// TODO #1: import the reduceErrors function from the c/ldsUtils component.
import reduceErrors from 'c/ldsUtils';
// TODO #2: import the getRecord, getFieldValue, and getFieldDisplayValue functions from lightning/uiRecordApi.
import { getRecord, getFieldValue, getFieldDisplayValue } from 'lightning/uiRecordApi';
// TODO #3: We've imported the name field and placed it into an array for you.
//          To prepare for Lab 1, import the Description, Email, and Phone fields and add them to the array.

import FIELD_Name from '@salesforce/schema/Contact.Name';
import FIELD_Description from '@salesforce/schema/Contact.Description';
import FIELD_Email from '@salesforce/schema/Contact.Email';
import FIELD_Phone from '@salesforce/schema/Contact.Phone';
const fields = [FIELD_Name, FIELD_Description, FIELD_Email, FIELD_Phone];

export default class StudentDetail extends LightningElement {

	// TODO #4: locate a valid Contact ID in your scratch org and store it in the studentId property.
	// Example: studentId = '003S000001SBAXEIA5';
	studentId = '0031h00000fTizWAAS';

	//TODO #5: use wire service to call getRecord, passing in our studentId and array of fields.
	//		   Store the result in a property named wiredStudent.
	@wire(getRecord, { recordId: "$studentId", fields: [FIELD_Name, FIELD_Description, FIELD_Email, FIELD_Phone] })
	wiredStudent;
		
	get name() {
		return this._getDisplayValue(this.wiredStudent.data, FIELD_Name);
	}

	//TODO #6: We provided a getter for the name field. 
	// 		   To prepare for Lab 1, create getters for the description, phone, and email fields.
	get description() {
		return this._getDisplayValue(this.wiredStudent.data, FIELD_Description);
	}
    get phone() {
		return this._getDisplayValue(this.wiredStudent.data, FIELD_Email);
	}
    get email() {
		return this._getDisplayValue(this.wiredStudent.data, FIELD_Phone);
	}
	//TODO #7: Review the errorMessages getter, the cardTitle getter, and the _getDisplayValue function below.
	get errorMessages() {
		let errors = reduceErrors(this.wiredStudent.error);
		return errors.length ? errors : false;
	}

	get cardTitle() {
		let title = "Please select a student";
		if (this.wiredStudent.data) {
			title = this.name;
		} else if (this.wiredStudent.error) {
			title = "Something went wrong..."
		}
		return title;
	}
	
	_getDisplayValue(data, field) {
		return getFieldDisplayValue(data, field) ? getFieldDisplayValue(data, field) : getFieldValue(data, field);
	}//값이 있으면 필드밸류 없으면 로우벨류를 넣어준다
	
}