import { LightningElement, wire } from 'lwc';
import getStudents from '@salesforce/apex/StudentBrowser.getStudents';

export default class StudentBrowser extends LightningElement {
    
    @wire(getStudents,{instructorId:"", courseDeliveryId:""})
    students; //include data and error

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