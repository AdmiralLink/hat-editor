import DomEl from "./_DomEl";

export default ProgressBar;

class ProgressBar {
    constructor(target, removeOnCompletion, type) {
        this.type = type || 'Upload';
        this.removeOnCompletion = removeOnCompletion;
        let notificationId = 'progress' + new Date().getMilliseconds();
        this.notification = new DomEl('div.sr-only[tab-index=0][aria-hidden=true][aria-live=assertive][aria-atomic=additions]#' + notificationId);
        this.notification.innerText = 'Press spacebar to get current value';
        this.track = new DomEl('div.progressBar[tab-index=1][role=progressbar][aria-describedby=' + notificationId + '][aria-valuenow=0]');
        let theBar = this;
        this.track.addEventListener('keydown', function(e) {
            if (e.keyCode == 32) {
                theBar.notify();
            }
        })
        this.bar = new DomEl('div.bar[tab-index=0]');
        this.track.append(this.bar);
        target.append(this.track);
        target.append(this.notification);
    }

    notify(num) {
        if (num == 'failure') {
            this.track.setAttribute('tab-index',0);
            this.notification.innerText = this.type + ' failed';
        } else if (num == 100) {
            this.track.setAttribute('tab-index',0);
            this.notification.innerText = this.type + ' Complete';
            if (this.removeOnCompletion) {
                let theBar = this;
                setTimeout(function() { 
                    theBar.track.remove();
                    theBar.notification.remove(); 
                }, 500);
            }
        } else {
            this.notification.innerText = num + '%';
        }
    }

    update(num) {
        this.bar.style.width = num + '%';
        if (num == 100) {
            this.bar.classList.add('done');
            this.notify(num);
        }
    }
}