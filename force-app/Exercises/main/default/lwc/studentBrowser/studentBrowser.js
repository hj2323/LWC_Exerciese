import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import SELECTED_STUDENT_CHANNEL from '@salesforce/messageChannel/SelectedStudentChannel__c';
import getStudents from '@salesforce/apex/StudentBrowser.getStudents';

export default class StudentBrowser extends LightningElement {
    
    @wire(MessageContext) messageContext;
    //salesforce data랑 연결되기 때문에

    selectedDeliveryId = '';
    selectedInstructorId = '';


    @wire(getStudents,{instructorId:'$selectedInstructorId', courseDeliveryId:'$selectedDeliveryId'})
    students; //include data and error

    handleFilterChange(event){
        this.selectedInstructorId = event.detail.instructorId;
        this.selectedDeliveryId = event.detail.deliveryId;
    }

    //tile에서 타고 올라와서 detail에 보내주는 event
    handleStudentSelected(event){
        const studentId = event.detail.studentId;
        this.updateSelectedStudent(studentId);
    }

    updateSelectedStudent(studentId){
        publish(this.messsageContext, SELECTED_STUDENT_CHANNEL, {studentId: studentId});
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