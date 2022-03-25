import { LightningElement } from 'lwc';
import Utils from 'c/utils';

const VIEW_STUDENT_BROWSER = 'students';
const VIEW_TRIP_REPORTS = 'tripreports';
const VIEW_CERTIFICATION = 'certifiedStudents';
const VIEW_POPULARITY = 'certPopularity';

export default class LayoutManager extends LightningElement {

	viewMode = VIEW_STUDENT_BROWSER;
	certificationName = '';
	certificationId = 0;

	//modal property
	modalHeader = '';
	modalContent = '';

	//spinner property
	loading = true;

	handleNavItemSelected(event) {
		const selectedItemName = event.detail.itemName;
		
		if (selectedItemName === 'students') {
			this.viewMode = VIEW_STUDENT_BROWSER;
		} else if (selectedItemName === 'tripreports') {
			this.viewMode = VIEW_TRIP_REPORTS;
		} else if (selectedItemName === 'certpopularity') {
			this.viewMode = VIEW_POPULARITY;
		} else if (selectedItemName.indexOf('certification') !== -1) {
			this.viewMode = VIEW_CERTIFICATION;
			const selectedCertificationObj = selectedItemName.split('|');
			this.certificationId = selectedCertificationObj[1];
			this.certificationName = selectedCertificationObj[2];
		}
	}

	get studentBrowserView() {
		return (this.viewMode === VIEW_STUDENT_BROWSER);
	}
	get tripReportView() {
		return (this.viewMode === VIEW_TRIP_REPORTS);
	}
	get certifiedStudentsView() {
		return (this.viewMode === VIEW_CERTIFICATION);
	}
	get certPopularityView() {
		return (this.viewMode === VIEW_POPULARITY);
	}

	//to hook into the lifecycle event
	connectedCallback(){
		Utils.showToast(
			this,
			'Welcome',
			"Dont forget to check back here for updated class schedules and assignments",
			'info'
		);
	}

	handleShowModal(event){
		//set value of the modal properties
		this.modalHeader = event.detail.header;
		this.modalContent = event.detail.content;
		//html template 변수에 저장하기 
		const modal = this.template.querySelector('c-modal');
		modal.show();
	}

	closeModal(){
		const modal = this.template.querySelector('c-modal');
		modal.hide();
	}


	handleLoading() {
		this.loading = true;
	}

	handleDoneLoading() {
		this.loading = false;
	}
}