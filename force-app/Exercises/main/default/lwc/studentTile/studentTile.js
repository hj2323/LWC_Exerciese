import { LightningElement, api } from 'lwc';

export default class StudentTile extends LightningElement {
    @api student = {
        Name: "최혜지",
        PhotoUrl: '/services/images/photo/003B0FakePictId',
    };

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
        // alert(this.student.Name);
        // debugger;
        // console.log('Name', this.student.Name);
        // console.log('Photo', this.student.PhotoUrl);
    }
}