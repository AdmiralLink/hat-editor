export default ImageUploader;

import Ajax from './_Ajax';
import DomEl from './_DomEl';
import ErrorModal from './../modules/_ErrorModal'
import InputField from './_InputField';
import ProgressBar from './_ProgressBar';

class ImageUploader {
    constructor() {
        this.requireBoth = true;
        this.uploading = false;
        this.createElements();
        this.addEvents();
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
        let uploader = this;
        let label = this.label;
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function(eventName) {
            label.addEventListener(eventName, function(e){e.preventDefault(); e.stopPropagation();}, false );
        });
        ['dragenter','dragover'].forEach(function(eventName) {
            label.addEventListener(eventName, function(e){ label.classList.add('hovered')});
        });
        ['dragleave','drop'].forEach(function(eventName) {
            label.addEventListener(eventName, function(e) { label.classList.remove('hovered')});
        });
        label.addEventListener('keydown', function(e) {
            if (e.keyCode == 13) {
                e.preventDefault();
                e.stopPropagation();
                this.click();
            }
        });
    }   

    confirm() {
        if (!this.uploading) {
            this.uploading = true;
            if (Hat.getOption('imageUploadUrl')) {
                let url = Hat.getOption('imageUploadUrl');
                if (this.fileData) {
                    if (this.requireBoth && this.altText.value) {
                        new ErrorModal('You must have both an image and alt text to upload');
                        this.uploading = false;
                        return false;
                    }
                    let uploader = this;
                    let data = {
                        image: this.fileData,
                        altText: this.altText.value
                    };
                    this.form.style.display = 'none';
                    let bar = new ProgressBar(this.container);
                    let upload = new Ajax(url, data, bar);
                    window.upload = upload;
                    upload.addEventListener('success', function(e) {
                        bar.track.classList.add('success');
                        uploader.createImageEl(e.target.getAttribute('imageUrl'),e.target.getAttribute('altText'));
                        uploader.form.dispatchEvent(new Event('uploaded'));
                        bar.track.remove();
                        uploader.uploading = false;
                    });
                    upload.addEventListener('failure', function(e) {
                        if (uploader.uploading) {  
                            uploader.uploading = false;
                            bar.track.classList.add('failure');
                            bar.track.remove();
                            uploader.form.style.display = 'block';
                        }
                    });
                } else {
                    new ErrorModal('No image to upload');
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
        this.container = new DomEl('div');
        this.form = new DomEl('div.imageUploadContainer');
        this.input = new DomEl('input[type=file][tabindex=-1][name="uploader"]#uploader');
        let span = new DomEl('span');
        span.innerText = 'Click here to browse or drop the image you want to upload';
        let icon = new DomEl('i.fas.fa-file-image');
        this.label = new DomEl('label.imageUploader[for="uploader"][tabindex=0][title="Hit enter to browse for an image to upload"]');
        this.preview = new DomEl('img.preview'); 
        this.label.append(icon);
        this.label.append(this.preview);
        this.label.append(document.createElement('br'));
        this.label.append(span);
        this.label.append(this.input);
        this.form.append(this.label);
        let altLabel = new InputField('altText','Alternative text for accessibility','A description of the photo');
        this.form.append(altLabel);
        this.container.append(this.form);
        this.altText = altLabel.children[0];
    }

    createImageEl(url, altText) {
        this.imageEl = new DomEl('img[src=' + url + '][alt=' + altText + '].chosen');
    }

    setContent(content) {
        if (content.image) {
            this.input.value = content.image;
            this.createImageEl(content.image, content.altText);
            this.preview.src = content.image;
            this.preview.classList.add('previewing');
        }
        if (content.altText) {
            this.altText.value = content.altText;
        }
    }
}