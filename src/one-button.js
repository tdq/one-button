import {LitElement, html} from 'lit-element';

class OneButton extends LitElement {
    render() {
        return html `
            <style>
                :host {
                    display: block;
                    position: relative;
                }
                .one-button {
                    display: block;
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

                .rotator {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                    pointer-events: none;
                }
            </style>
            <div class="one-button" @click="${this._clickEvent}" @touch="${this._clickEvent}" @mousedown="${this._startRotate}" @touchstart="${this._startRotate}" @mousemove="${this._rotate}" @touchmove="${this._rotate}" @mouseup="${this._stopRotate}" @touchend="${this._stopRotate}"><slot></slot></div>
            <svg class="rotator" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" stroke-dasharray="5" stroke-width="5" fill="none" stroke="green"/>
                <circle cx="50" cy="6" r="6" fill="green"/>
            </svg>
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
        const centerX = this.offsetLeft + this.clientWidth / 2;
        const centerY = this.offsetTop + this.clientHeight / 2;
        const relativeX = (event.type && event.type === 'touchstart' ? event.touches[0].pageX :  event.x) - centerX;
        const relativeY = (event.type && event.type === 'touchstart' ? event.touches[0].pageY :  event.y) - centerY;
        const relation = relativeY / relativeX;
        const actualRadius = this.clientWidth / 2;
        const clickRadius = Math.sqrt(relativeX*relativeX + relativeY*relativeY);

        if(clickRadius > actualRadius - 15 && clickRadius <= actualRadius) {
            //event.preventDefault();
            this._rotateEnabled = true;
            this.initialAngle =  (relativeX < 0 ? Math.PI + Math.atan(relation) : Math.atan(relation));
        }
    }

    _rotate(event) {
        if(this._rotateEnabled) {
            //event.preventDefault();
            const centerX = this.offsetLeft + this.clientWidth / 2;
            const centerY = this.offsetTop + this.clientHeight / 2;

            const relativeX = (event.type && event.type === 'touchmove' ? event.touches[0].pageX :  event.x) - centerX;
            const relativeY = (event.type && event.type === 'touchmove' ? event.touches[0].pageY :  event.y) - centerY;
            const relation = relativeY / relativeX;

            const delta =  (relativeX < 0 ? Math.PI + Math.atan(relation) : Math.atan(relation)) - this.initialAngle;

            this.initialAngle += delta;
            this.angle += delta;

            this.shadowRoot.querySelector(".rotator").style.transform = "rotate("+ this.angle +"rad)";
        }
    }

    _stopRotate(event) {
        //event.preventDefault();
        this._rotateEnabled = false;
    }
}

customElements.define('one-button', OneButton);