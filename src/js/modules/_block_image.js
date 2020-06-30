export default ImageBlock;

import Block from './_block';
import ImageUploader from './../lib/_ImageUploader';
import DomButton from '../lib/_DomButton';

class ImageBlock extends Block {
    acceptFile(file) {
        if (file) {
            if (!file.type.match(/image.*/)) {
                new ErrorModal('File is not a valid image');
            } else {    
                this.uploader.fileData = file;
                this.uploader.confirm();
            }
        }
    }
    
    addEvents() {
        let block = this;
        this.uploader.input.addEventListener('change', function(e) {
            block.acceptFile(this.files[0]);
        });
        this.uploader.label.addEventListener('drop', function(e) {
            block.acceptFile(e.dataTransfer.files[0]);
        });
        this.uploader.form.addEventListener('uploaded', function() {
            block.removeButton.classList.remove('hide');
            block.contentContainer.append(block.uploader.imageEl);
            block.uploader.form.style.display = 'block';
            block.uploader.form.classList.add('uploaded');
        });
        this.removeButton.addEventListener('click', function(e) {
            e.preventDefault();
            block.uploader.imageEl.remove();
            delete(block.uploader.imageEl);
            block.uploader.form.classList.remove('uploaded');
            this.classList.add('hide');
        });
    }

    createElement() {
        this.el.classList.add('image');
        this.uploader = new ImageUploader();
        this.removeButton = new DomButton('Select this to remove the current image', 'eye-slash', 'removeBtn', 'Remove image');
        this.removeButton.classList.add('hide');
        this.contentContainer.appendChild(this.uploader.form);
        this.contentContainer.appendChild(this.removeButton);
    }

    focus() {
        this.uploader.label.focus();
    }

    getContents() {
        let content = {
            altText: this.uploader.altText.value,
            image: false
        };
        if (this.uploader.imageEl) {
            content.image = this.uploader.imageEl.src;
        }
    }

    loadContent() {
        if (this.content) {
            this.uploader.setContent(this.content);
            delete this.content;
        }
    }
}