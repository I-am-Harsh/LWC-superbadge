import { api, LightningElement, wire } from 'lwc';
import {
    APPLICATION_SCOPE,
    subscribe,
    unsubscribe,
    MessageContext,
} from "lightning/messageService";
import getBoats from '@salesforce/apex/BoatDataService.getBoats';
import { updateRecord } from '@salesforce/uiRe  '

import NAME_FIELD from '@salesforce/schema/Boat__c.Name';
import LENGTH_FIELD from '@salesforce/schema/Boat__c.Length__c';
import PRICE_FIELD from '@salesforce/schema/Boat__c.Price__c';
import DESCRIPTION_FIELD from '@salesforce/schema/Boat__c.Description__c';

const SUCCESS_TITLE = 'Success';
const MESSAGE_SHIP_IT     = 'Ship it!';
const SUCCESS_VARIANT     = 'success';
const ERROR_TITLE   = 'Error';
const ERROR_VARIANT = 'error';


export default class BoatSearchResults extends LightningElement {
    selectedBoatId;
    columns = [
        { label: 'Name', fieldName: NAME_FIELD.fieldApiName, type: 'text' },
        { label: 'Length', fieldName: LENGTH_FIELD.fieldApiName, type: 'text' },
        { label: 'Price', fieldName: PRICE_FIELD.fieldApiName, type: 'currency' },
        { label: 'Description', fieldName: DESCRIPTION_FIELD.fieldApiName, type: 'text' }
      ];
    boatTypeId = '';
    boats;
    isLoading = false;

    // wired message context
    @wire(MessageContext)
    messageContext;
    // wired getBoats method 
    @wire(getBoats)
    wiredBoats(result, error) {
        if(error){
            console.log('error');
        }
        else{
            this.boats = result;
        }
    }

    // public function that updates the existing boatTypeId property
    // uses notifyLoading
    @api searchBoats(boatTypeId) {
        this.notifyLoading(true);
    }

    // this public function must refresh the boats asynchronously
    // uses notifyLoading
    @api refresh() { }

    // this function must update selectedBoatId and call sendMessageService
    updateSelectedTile() { }

    // Publishes the selected boat Id on the BoatMC.
    sendMessageService(boatId) { 
    // explicitly pass boatId to the parameter recordId
        
    }

    // This method must save the changes in the Boat Editor
    // Show a toast message with the title
    // clear lightning-datatable draft values
    handleSave() {
    const recordInputs = event.detail.draftValues.slice().map(draft => {
        const fields = Object.assign({}, draft);
        return { fields };
    });
    const promises = recordInputs.map(recordInput =>{
            //update boat record
        });
    Promise.all(promises)
        .then(() => {})
        .catch(error => {})
        .finally(() => {});
    }
    // Check the current value of isLoading before dispatching the doneloading or loading custom event
    notifyLoading(isLoading) { 

        if(!isLoading){
            this.dispatchEvent(new CustomEvent('doneloading', {
                loading : false
            }))
        }
        else{
            this.dispatchEvent(new CustomEvent('loading'))
        }
    }
}