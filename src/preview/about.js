import common from '../common/common.js';

class BundleFN {
    constructor () {
        this.abd = '123123';
    }
    async init () {
        let options = await this.askBundle();
        console.log(options)
        console.log(this.abd);
    }
    async askBundle () {
        return 'aaaaa';
    }
}

new BundleFN().init();
