// Activity store for MobX.
// Date - 24th Apr, 2023.

import { makeAutoObservable } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";

// Date - 24th Apr, 2023.
export default class ActivityStore {
    /*title = 'Hello from MobX';

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
    }*/

    activities: Activity[] = [];
    selectedActivity: Activity | null = null;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                this.activities.push(activity);
            })
            this.loadingInitial = false;
        } catch (error) {
            console.log(error);
            this.loadingInitial = false;
        }
    }
}