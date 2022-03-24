import { LightningElement, api } from 'lwc';

export default class ResponsiveDatatable extends LightningElement {
	@api columnConfig;
	@api pkField; //primary key
	rows; //array of data that the datagrid will output
	_selectedRow; // for highlight the currently selected row


	reformatRows = function(rowData) {
		let colItems = this.columnConfig;
		let reformattedRows = [];

		for (let i = 0; i < rowData.length; i++) {
			let rowDataItems = [];
			for (let j = 0; j < colItems.length; j++) {
				let colClass = '';
				if (colItems[j].hiddenOnMobile) {
					colClass = 'hiddenOnMobile';
				}
				rowDataItems.push({
					value: rowData[i][colItems[j].fieldName],
					label: colItems[j].label,
					type: colItems[j].type,
					class: colClass,
					columnId: 'col' + j + '-' + rowData[i][this.pkField],
					isPhone: (colItems[j].type==='phone'),
					isEmail: (colItems[j].type==='email'),
					isOther: (colItems[j].type!=='phone' && colItems[j].type!=='email')
				});
			}
			reformattedRows.push({
				data: rowDataItems,
				pk: rowData[i][this.pkField]
			});
		}
		return reformattedRows;
	}//데이터 불러와서 테이블에 뿌려주는 부분


	//클릭이벤트 처리하는 부분
	onRowClick(event){
		const target = event.currentTarget;
		const evt = new CustomEvent( 'rowclick' , {
			detail: {
				pk: target.getAttribute('data-pk')	//click시 pk 같이 보내주는 구조???
			}
		});
		this.dispatchEvent(evt);
		this.highlightSelectedRow(target);
	}
	onRowDblClick(event){
		const target = event.currentTarget;
		const evt = new CustomEvent( 'rowdblclick' , {
			detail: {
				pk: target.getAttribute('data-pk') //click시 pk 같이 보내주는 구조???
			}
		});
		this.dispatchEvent(evt);
	}

	//현재 선택된 줄 하이라이트
	highlightSelectedRow(target){
		if(this._selectedRow){//이미 하이라이트 되어 있다면 하이라이트 지우기
			this._selectedRow.classList.remove("slds-is-selected")
		}
		target.classList.add("slds-is-selected");//타겟에 css입혀주고
		this._selectedRow = target;//타겟을 _selectedRow변수에 저장
	}


	//getter & setter : Annotate the getter with @api which will make both the getter and setter public.
	// only put annotation on getter
	//get : return the rows property
	@api
	get rowData(){
		return this.rows;
	}
	set rowData(value){
		if (typeof value !== "undefined"){ // if value has been passed in
			this.rows = this.reformatRows (value) // uses the reformatRows function to update the rows property.
		}

	}

	//Define a public method that accepts a recordId
	@api setSelectedRecord(recordId) {
		//selector that will find the row has recordId(data-pk)
		const mySelector = `tr[data-pk='${recordId}']`;
		//myselector결과를 selectedRow상수로 저장
		const selectedRow = this.template.querySelector(mySelector);
		// If the row is found, highlight the row.
		if (selectedRow) {
			this.highlightSelectedRow(selectedRow);
		}
	}
}