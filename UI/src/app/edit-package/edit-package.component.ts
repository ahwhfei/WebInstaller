import { Component, Input } from '@angular/core';

import { Application } from '../application/application';
import { OperatingSystem, ALLWINDOWS } from '../operating-system/operating-system';

@Component({
    providers: [],
    selector: 'edit-package',
    styles: [require('./edit-package.component.less')],
    template: require('./edit-package.component.html')
})
export class EditPackageComponent {
    @Input()
    package: Application;

    allWindows: OperatingSystem[] = ALLWINDOWS;
    public fileSrc: string = '';
    public img: any = {
        height: 48,
        width: 48
    };
    public isLogoError: string = '';
    public invalidType: string = 'Invalid or unknown image format. Supported formats are jpg, png, bmp, icon, svg.';

    public fileChange(file: any) {
    	this.isLogoError = '';
    	if (this.isValidImageType(file)) {
    		// Create a FileReader
	        let reader = new FileReader();
	        // Add an event listener to deal with the file when the reader is complete
	        reader.addEventListener('load', (event: any) => {
	            let img = document.createElement('img');
	            img.src = event.target.result;
	            this.img.height = 48;
	            this.img.width = 48;
	            this.fileSrc = img.src;
	        }, false);
	        // Start reading this file
	        reader.readAsDataURL(file);
    	}
    	(<HTMLInputElement> document.getElementById('input-file')).value = '';
    }

    public deleteFile() {
    	this.isLogoError = '';
    	this.fileSrc = '';
    }

    // prevent the default drag operation
    public dragDefault(event: any) {
        event.stopPropagation();
        event.preventDefault();
     }

    // triggered when drop the file
    public handleDrop(event: any) {
        this.dragDefault(event);
        let files = event.dataTransfer.files;
        if (files.length <= 1) {
            this.fileChange(files[0]);
        }
    }

    private isValidImageType(file: any): boolean {
        const imageType = ['image/jpeg', 'image/jpg', 'image/png', 'image/bmp', 'image/icon', 'image/svg', 'image/gif'];
        if (imageType.indexOf(file.type) !== -1) {
            return true;
        }
        this.isLogoError = this.invalidType;
        return false;
    }
}
