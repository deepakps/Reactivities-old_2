// Activity store for MobX.
// Date - 24th Apr, 2023.

import { makeAutoObservable } from "mobx";

// Date - 24th Apr, 2023.
export default class ActivityStore {
    title = 'Hello from MobX';

    constructor() {
        // makeObservable(this, {
        //     title: observable,
        //     // setTitle is making the use of this keyword, we need to bind this to the class.
        //     // Therefore, make use of action.bound to automatically bound the function to the class.
        //     // Alternate option is make setTitle as arrow funtion. Then, mention only as action.
        //     // Date - 25th Apr, 2023.
        //     setTitle: action
        // })
        makeAutoObservable(this)
    }


    setTitle = () => {
        this.title = this.title + '!';
    }
}