import { LightningElement, wire } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService'; //LMS
import SELECTED_STUDENT_CHANNEL from '@salesforce/messageChannel/SelectedStudentChannel__c';
// TODO #1: import the reduceErrors function from the c/ldsUtils component.
import reduceErrors from 'c/ldsUtils';
// TODO #2: import the getRecord, getFieldValue, and getFieldDisplayValue functions from lightning/uiRecordApi.
import { getRecord } from 'lightning/uiRecordApi';
import Utils from 'c/utils';
// TODO #3: We've imported the name field and placed it into an array for you.
//          To prepare for Lab 1, import the Description, Email, and Phone fields and add them to the array.

import FIELD_Name from '@salesforce/schema/Contact.Name';
import FIELD_Description from '@salesforce/schema/Contact.Description';
import FIELD_Email from '@salesforce/schema/Contact.Email';
import FIELD_Phone from '@salesforce/schema/Contact.Phone';

const fields = [FIELD_Name, FIELD_Description, FIELD_Email, FIELD_Phone];

export default class StudentDetail extends LightningElement {

	subscription;

	// TODO #4: locate a valid Contact ID in your scratch org and store it in the studentId property.
	// Example: studentId = '003S000001SBAXEIA5';
	//studentId = '0031h00000fTizWAAS'; 이제 땡겨온거 받아와서 처리 해야되므로 지워준다
	studentId;

	@wire(MessageContext) messageContext;

	//TODO #5: use wire service to call getRecord, passing in our studentId and array of fields.
	//		   Store the result in a property named wiredStudent.
	//@wire(getRecord, { recordId: "$studentId", fields: [FIELD_Name, FIELD_Description, FIELD_Email, FIELD_Phone] }) 마찬가지로 받아와서 처리해야되므로 필드값 지움
	@wire(getRecord, { recordId: '$studentId', fields })
	wiredStudent;
		
	connectedCallback() {
		if(this.subscription){
			return;
		}
		this.subscription = subscribe(
			this.messageContext,
			SELECTED_STUDENT_CHANNEL,
			(message) => {
				this.handleStudentChange(message)
			}
		);
	}

	disconnectedCallback() {
		unsubscribe(this.subscription);
		this.subscription = null;
	}

	handleStudentChange(message) {
		this.studentId = message.studentId;
	}

	get name() {
		return Utils.getDisplayValue(this.wiredStudent.data, FIELD_Name);
	}

	//TODO #6: We provided a getter for the name field. 
	// 		   To prepare for Lab 1, create getters for the description, phone, and email fields.
	get description() {
		return Utils.getDisplayValue(this.wiredStudent.data, FIELD_Description);
	}
    get phone() {
		return Utils.getDisplayValue(this.wiredStudent.data, FIELD_Email);
	}
    get email() {
		return Utils.getDisplayValue(this.wiredStudent.data, FIELD_Phone);
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
	
	
	
}