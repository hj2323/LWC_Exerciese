import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import SELECTED_STUDENT_CHANNEL from '@salesforce/messageChannel/SelectedStudentChannel__c';
import getStudents from '@salesforce/apex/StudentBrowser.getStudents';
import { NavigationMixin } from 'lightning/navigation'; // 다른 클래스에 있는 내용들을 멀티로 상속받는 것처럼 사용하기 위해서 

export default class StudentBrowser extends NavigationMixin(LightningElement) {
    
    @wire(MessageContext) messageContext;
    //salesforce data랑 연결되기 때문에

    selectedDeliveryId = '';
    selectedInstructorId = '';


    @wire(getStudents,{instructorId:'$selectedInstructorId', courseDeliveryId:'$selectedDeliveryId'})
    students; //include data and error

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
    }

    //tile에서 타고 올라와서 detail에 보내주는 event
    handleStudentSelected(event){
        const studentId=event.detail.studentId;
        this.updateSelectedStudent(studentId);

    }
    
    updateSelectedStudent(studentId){
        publish(this.messageContext,SELECTED_STUDENT_CHANNEL,{studentId: studentId});
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