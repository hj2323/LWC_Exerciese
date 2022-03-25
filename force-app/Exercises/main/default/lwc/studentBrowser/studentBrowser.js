import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService'; //LMS
import SELECTED_STUDENT_CHANNEL from '@salesforce/messageChannel/SelectedStudentChannel__c';
import getStudents from '@salesforce/apex/StudentBrowser.getStudents';
import { NavigationMixin } from 'lightning/navigation'; // 다른 클래스에 있는 내용들을 멀티로 상속받는 것처럼 사용하기 위해서 

export default class StudentBrowser extends NavigationMixin(LightningElement) {
    
    @wire(MessageContext) messageContext;
    //salesforce data랑 연결되기 때문에

    selectedDeliveryId = '';
    selectedInstructorId = '';

    
    students = []; //include data and error
    @wire(getStudents,{instructorId:'$selectedInstructorId', courseDeliveryId:'$selectedDeliveryId'})
    wired_getStudents(result) {
        this.students = result;
        this.dispatchEvent(new CustomEvent ('doneloading', {bubbles:true, composed:true}));
    }

    //columns that reponsiveDatatable will use
    cols = [
        {
            fieldName:"Name",
            label:"Name"
        },
        {
            fieldName:"Title",
            label:"Title",
            hiddenOnMobile: true
        },
        {
            fieldName:"Phone",
            label:"Phone",
            type: "phone"
        },
        {
            fieldName:"Email",
            label:"Email",
            type: "email"
        }
    ];


    handleFilterChange(event){
        this.selectedInstructorId = event.detail.instructorId;
        this.selectedDeliveryId = event.detail.deliveryId;
        this.dispatchEvent(new CustomEvent('loading', {bubbles:true, composed:true}));
    }

    //tile에서 타고 올라와서 detail에 보내주는 event
    handleStudentSelected(event){
        const studentId=event.detail.studentId;
        this.updateSelectedStudent(studentId);
    }
    
    updateSelectedStudent(studentId) {
        const grid = this.template.querySelector('c-responsive-datatable');
        const gallery = this.template.querySelector('c-student-tiles');
        if (gallery) {
            gallery.setSelectedStudent(studentId);
        }
        if (grid) {
             grid.setSelectedRecord(studentId);
        }
        publish(this.messageContext, SELECTED_STUDENT_CHANNEL,{studentId: studentId});
    }

    //responsiveDatatable.js에서 이벤트 정의한것의 핸들러
    handleRowDblClick(event) {
        const studentId = event.detail.pk;// 더블클릭한 이벤트에서 pk받아와서 상수로 studentId에 저장한다
         //navigation service to open a *modal* to edit the contact record for the selected student
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: studentId,
                objectApiName: 'Contact',
                actionName: 'edit'
            }
        });
    }
     
     //responsiveDatatable.js에서 이벤트 정의한것의 핸들러 - dom 타고 올라가서 student detail값 바꿔 주는 핸들러
     handleRowClick(event) {
        const studentId = event.detail.pk;// 클릭한 이벤트에서 pk받아와서 상수로 studentId에 저장한다
         //navigation service to open a *modal* to edit the contact record for the selected student
         this.updateSelectedStudent(studentId);
    }  
        
    
   
   

    // studentList = [];
    
    // constructor(){
    //     super();
    //     const studentNames = ['Rad', 'Stuart', 'Andres', 'Rahul',
    //     'Amit', 'Simon'];
    //     this.studentList = studentNames.map(    
    //         (studentName, index) => {
    //             return{
    //                 'sobjectType': 'Contact',
    //                 'Name': studentName,
    //                 'PhotoUrl': '/services/images/photo/003B0FakePictId',
    //                 'Id': index
    //             };
    //         }
    //     );
    // }
}