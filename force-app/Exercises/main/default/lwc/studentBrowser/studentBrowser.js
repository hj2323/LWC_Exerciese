import { LightningElement, wire } from 'lwc';
import getStudents from '@salesforce/apex/StudentBrowser.getStudents';

export default class StudentBrowser extends LightningElement {
    
    selectedDeliveryId = '';
    selectedInstructorId = '';


    @wire(getStudents,{instructorId:'$selectedInstructorId', courseDeliveryId:'$selectedDeliveryId'})
    students; //include data and error

    handleFilterChange(event){
        this.selectedInstructorId = event.detail.instructorId;
        this.selectedDeliveryId = event.detail.deliveryId;
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