
import Vue from 'vue';
import { deeplink } from '../bundle';

export default class Loaction {
    /**
     * @constructor
     */
    constructor() {
        this.variables();
        this.init();
    }

    /**
     * Global Variables
     */
    variables() {
        this.id = 'location';
        this.page = null;
        this.$document = $(document);
        this.current = deeplink.$pages.eq(deeplink.current).find('.page_menu_id').val();
    }

    /**
     * Initialize
     */
    init() {
        this.$document.on('page_change', this.check.bind(this));
        if (this.id == this.current) {
            this.setMapsView();
        }
    }

    /**
     * Check
     */
    check(e, current_page, type) {
        if( current_page.find('.page_id').val() != this.id ) return;

        this.page = current_page;

        switch(type) {
            case 'reinit':
                this.reInit();
                break;
            case 'animation_in':
                this.animationIn();
                break;
            case 'animation_out':
                this.animationOut();
                break;
        }
    }

    setMapsView() {
        var mymap = L.map('maps').setView([44.545262, 6.614459], 14);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
            id: 'mapbox/streets-v11'
        }).addTo(mymap);
    }

    reInit() {
        //this.app = new Vue({el: '#app'});
        this.setMapsView();
        this.$document.title = this.page.find('.page_title').val();
    }

    animationIn() {
        TweenMax.from(this.page.find('.bg_page'), 1, { alpha: 0, ease: Linear.easeOut });
        TweenMax.from(this.page.find('.text'), 1, { y: -100, alpha: 0, ease: Expo.easeOut, delay: deeplink.delayBeforeAnimIn });
        TweenMax.from(this.page.find('.maps'), 1, { y: 100, alpha: 0, ease: Expo.easeOut, delay: deeplink.delayBeforeAnimIn });
        deeplink.reInitAnimation(deeplink.delayReInit);
    }

    animationOut() {
        TweenMax.to(this.page.find('.bg_page'), 1, { alpha: 0, ease: Linear.easeOut });
        TweenMax.to(this.page.find('.text'), 1, { y: -100, alpha: 0, ease: Expo.easeOut });
        TweenMax.to(this.page.find('.maps'), 1, { y: 100, alpha: 0, ease: Expo.easeOut });
    }
}
