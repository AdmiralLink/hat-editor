import ErrorModal from "../modules/_ErrorModal";
import DomEl from "./_DomEl";

export default Ajax;

class Ajax {
    constructor(url, data, progressBar) {
        this.xhr = new XMLHttpRequest();
        let fd = new FormData();
        for (let [key,value] of Object.entries(data)) {
            fd.append(key, value);
        }
        var xhr = new XMLHttpRequest();
        if (progressBar) {
            xhr.upload.addEventListener('progress', function(e) {
                progressBar.update( Math.round( (e.loaded * 100) /e.total) );
            });
        }
        let eventEl = new DomEl('div');
        xhr.responseType = 'json';
        xhr.open('POST', url);
        xhr.send(fd);
        xhr.onerror = () => { new ErrorModal('An error occurred during upload.'); }
        let ajax = this;
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    if (xhr.response.type == 'error') {
                        new ErrorModal(xhr.response.message);
                        ajax.throwError(eventEl, progressBar);
                    } else {
                        for (let [key, value] of Object.entries(xhr.response)) {
                            eventEl.setAttribute(key, value);
                        }
                        if (progressBar) {
                            progressBar.update(100);
                        }
                        eventEl.dispatchEvent(new Event('success'));
                    }
                } else if (xhr.status == 410 || xhr.status === 404 || xhr.status == 403 || xhr.status === 401 ) {
                    new ErrorModal(xhr.status + ', check your upload URL');
                    ajax.throwError(eventEl, progressBar);
                } else if (xhr.status === 500, xhr.status === 414, xhr.status === 444, xhr.status === 431 || xhr.status === 413) {
                    new ErrorModal(xhr.status + ', check your server settings');
                    ajax.throwError(eventEl, progressBar);
                } else {
                    new ErrorModal('Upload returned a ' + xhr.status + ' error');
                    ajax.throwError(eventEl, progressBar);
                }
            }
        };
        return eventEl;
    }

    throwError(eventEl, progressBar) {
        if (this.progressBar) {
            progressBar.update('failure');
        }
        eventEl.dispatchEvent(new Event('failure'));
    }
}