export default ImageUploadModal;

import Ajax from '../lib/_Ajax';
import DomEl from '../lib/_DomEl';
import ErrorModal from './_ErrorModal.js'
import InputField from '../lib/_InputField';
import MiniModal from '../lib/_MiniModal';
import ProgressBar from '../lib/_ProgressBar';

class ImageUploadModal extends MiniModal {
    constructor() {
        super(false, true);
        this.uploading = false;
        this.createElements();
        this.addEvents();
        this.constructModal(this.getModalOptions());
    }

    acceptFile(file) {
        if (file) {
            if (!file.type.match(/image.*/)) {
                new ErrorModal('File is not a valid image');
            } else {    
                this.preview.src = window.URL.createObjectURL(file);
                this.fileData = file;
                if (!this.label.classList.contains('previewing')) {
                    this.label.classList.add('previewing');
                }
            }
        }
    }

    addEvents() {
        let uploadModal = this;
        let label = this.label;
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            label.addEventListener(eventName, function(e){e.preventDefault(); e.stopPropagation();}, false );
        });
        ['dragenter','dragover'].forEach(eventName => {
            label.addEventListener(eventName, function(e){ label.classList.add('hovered')});
        });
        ['dragleave','drop'].forEach(eventName=> {
            label.addEventListener(eventName, function(e) { label.classList.remove('hovered')});
        });
        this.label.addEventListener('keydown', function(e) {
            if (e.keyCode == 13) {
                e.preventDefault();
                e.stopPropagation();
                this.click();
            }
        });
        this.form.addEventListener('keydown', function(e) {
            if (e.keyCode == 13) {
                uploadModal.confirm();
            }
        });
        this.input.addEventListener('change', function(e) {
            uploadModal.acceptFile(this.files[0]);
        });
        label.addEventListener('drop', function(e) {
            uploadModal.acceptFile(e.dataTransfer.files[0]);
        });
    }

    confirm() {
        if (!this.uploading) {
            this.uploading = true;
            if (HatRack.options.imageUploadUrl) {
                let url = HatRack.options.imageUploadUrl;
                if (this.fileData && this.altText.value) {
                    let data = {
                        image: this.fileData,
                        altText: this.altText.value
                    };
                    this.form.style.display = 'none';
                    let bar = new ProgressBar(this.modalContent);
                    let upload = new Ajax(url, data, bar);
                    upload.addEventListener('success', (e) => {
                        bar.track.classList.add('success');
                        this.imageEl = new DomEl('img[src=' + e.target.getAttribute('imageUrl') + '][alt=' + e.target.getAttribute('altText') + ']');
                        this.modalContainer.dispatchEvent(new Event('uploaded'));
                        this.close();
                    });
                    upload.addEventListener('failure', (e) => {  
                        bar.track.classList.add('failure');
                        this.uploading = false;
                        bar.track.remove();
                        this.form.style.display = 'block';
                    });
                } else {
                    new ErrorModal('You must have both an image and alt text to upload');
                    this.uploading = false;
                }
            } else {
                new ErrorModal('Upload URL is not set')
                this.uploading = false;
            }
        }
    }

    createElements() {
        this.fileData = false;
        this.form = new DomEl('div#imageUpload');
        this.input = new DomEl('input[type=file][name="uploader"]#uploader');
        let span = new DomEl('span');
        span.innerText = 'Click here to browse or drop the image you want to upload';
        let icon = new DomEl('i.fas.fa-file-image');
        this.label = new DomEl('label.imageUploader[for="uploader"][tabindex="1"][title="Hit enter to browse for an image to upload"]');
        this.preview = new DomEl('img.preview'); 
        this.label.append(icon);
        this.label.append(this.preview);
        this.label.append(document.createElement('br'));
        this.label.append(span);
        this.label.append(this.input);
        this.form.append(this.label);
        let altLabel = new InputField('altText','Alternative text for accessibility','A description of the photo');
        this.form.append(altLabel);
        this.altText = altLabel.children[0];
    }

    getModalOptions() {
        return {
            contentType: 'node',
            content: this.form,
            confirm: true,
            enterConfirms: false,
            focusTarget: this.label,
        };
    }
}