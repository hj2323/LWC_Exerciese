import { LightningElement, api } from 'lwc';

export default class StudentTile extends LightningElement {
    @api student = {
        Name: "최혜지",
        PhotoUrl: '/services/images/photo/003B0FakePictId',
    };

    //public property
    @api selectedStudentId = '';

    
    get tileSelected(){
        return (this.selectedStudentId === this.student.Id) ? "tile selected" : "tile";
    }

    studentClick(){
        const evt = new CustomEvent('studentselected', 
        {
            bubbles:true, composed:true, 
            detail: {studentId: this.student.Id}});
        this.dispatchEvent(evt);
    }

    //define a public method setSelectedStudent that accepts a studentId and stores it in selectedStudentId
    @api setSelectedStudent(studentId) {
        this.selectedStudentId = studentId;
    }
}