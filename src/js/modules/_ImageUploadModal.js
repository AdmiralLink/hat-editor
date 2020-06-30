export default ImageUploadModal;

import ImageUploader from '../lib/_ImageUploader';
import MiniModal from '../lib/_MiniModal';

class ImageUploadModal extends MiniModal {
    constructor() {
        super(false, true);
        this.uploader = new ImageUploader;
        this.addEvents();
        this.constructModal(this.getModalOptions());
    }

    addEvents() {
        let modal = this;
        let uploader = this.uploader;
        this.uploader.form.addEventListener('uploaded', function() {
            modal.modalContainer.dispatchEvent(new Event('uploaded'));
            modal.close();
        });
        this.uploader.form.addEventListener('keydown', function(e) {
            if (e.keyCode == 13) {
                e.preventDefault();
                uploader.confirm();
            }
        });
        this.uploader.input.addEventListener('change', function(e) {
            uploader.acceptFile(this.files[0]);
        });
        this.uploader.label.addEventListener('drop', function(e) {
            uploader.acceptFile(e.dataTransfer.files[0]);
        });
    }

    confirm() {
        this.uploader.confirm();
    }

    getModalOptions() {
        return {
            contentType: 'node',
            content: this.uploader.container,
            confirm: true,
            enterConfirms: false,
            focusTarget: this.uploader.label,
        };
    }
}