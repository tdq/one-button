import {LitElement, html} from 'lit-element';

class OneButton extends LitElement {
    render() {
        return html `
            <style>
                :host {
                    display: block;
                }
                .one-button {
                    display: block;
                    border: 3px solid green;
                    border-radius: 50%;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }

                .one-button slot {
                    display: block;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                }
            </style>
            <div class="one-button" @click="${this._clickEvent}" @touch="${this._clickEvent}" @mousedown="${this._startRotate}" @touchstart="${this._startRotate}" @mousemove="${this._rotate}" @touchmove="${this._rotate}" @mouseup="${this._stopRotate}" @touchend="${this._stopRotate}"><slot></slot></div>
        `;
    }

    constructor() {
        super();
        this.angle = 0;
    }

    _clickEvent(event) {
        if(!this._rotateEnabled) {
            
        }
    }

    _startRotate(event) {
        this._rotateEnabled = true;
        const centerX = this.offsetLeft + this.clientWidth / 2;
        const centerY = this.offsetTop + this.clientHeight / 2;
        const relativeX = (event.type && event.type === 'touchstart' ? event.touches[0].pageX :  event.x) - centerX;
        const relativeY = (event.type && event.type === 'touchstart' ? event.touches[0].pageY :  event.y) - centerY;
        const relation = relativeY / relativeX;

        this.initialAngle =  (relativeX < 0 ? Math.PI + Math.atan(relation) : Math.atan(relation));
    }

    _rotate(event) {
        if(this._rotateEnabled) {
            const centerX = this.offsetLeft + this.clientWidth / 2;
            const centerY = this.offsetTop + this.clientHeight / 2;

            const relativeX = (event.type && event.type === 'touchmove' ? event.touches[0].pageX :  event.x) - centerX;
            const relativeY = (event.type && event.type === 'touchmove' ? event.touches[0].pageY :  event.y) - centerY;
            const relation = relativeY / relativeX;

            const delta =  (relativeX < 0 ? Math.PI + Math.atan(relation) : Math.atan(relation)) - this.initialAngle;

            this.initialAngle += delta;
            this.angle += delta;

            this.shadowRoot.querySelector(".one-button").style.transform = "rotate("+ this.angle +"rad)";
            
        }
    }

    _stopRotate(event) {
        this._rotateEnabled = false;
    }
}

customElements.define('one-button', OneButton);