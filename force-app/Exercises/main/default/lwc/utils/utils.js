import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getFieldValue, getFieldDisplayValue } from 'lightning/uiRecordApi'


export default class Utils {
    static showToast = (firingComponent, toastTitle, toastBody, variant) => {
        const evt = new ShowToastEvent({ 
            title: toastTitle,
            message: toastBody,
            variant: variant
        });
        firingComponent.dispatchEvent(evt);
    }

    static getDisplayValue(data, field) {
        return getFieldDisplayValue(data, field)? getFieldDisplayValue(data, field) : getFieldValue(data, field);
    }//값이 있으면 필드밸류 없으면 로우벨류를 넣어준다

    static showModal = (firingComponent, header, content) => {
        const evt = new CustomEvent('showmodal', {
            detail: {
                header,
                content
            },
            bubbles:true,
            composed:true
        });
        firingComponent.dispatchEvent(evt);
    }


}