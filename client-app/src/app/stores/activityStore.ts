// Activity store for MobX.
// Date - 24th Apr, 2023.

import { makeObservable, observable } from "mobx";

// Date - 24th Apr, 2023.
export default class ActivityStore {
    title = 'Hello from MobX';

    constructor() {
        makeObservable(this, {
            title: observable
        })
    }
}