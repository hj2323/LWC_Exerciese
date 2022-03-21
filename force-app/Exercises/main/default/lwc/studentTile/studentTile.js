import { LightningElement, api } from 'lwc';

export default class StudentTile extends LightningElement {
    @api student = {
        Name: '최혜지',
        PhotoUrl: '/services/images/photo/003B0FakePictId',
        };

    @api isSelected = false;

    get tileSelected() {
        return this.isSelected ? "tile selected" : "tile";
    }

    studentClick(){
        //alert(this.student.Name);
        debugger;
        console.log('Name', this.student.Name);
        console.log('Photo', this.student.PhotoUrl);
    }
}