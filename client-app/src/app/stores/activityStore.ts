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
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list();


            activities.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                this.activities.push(activity);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    // Any steps after 'await' aren't in the same tick, so they require action wrapping.
    // Here, we can leverae 'runInAction'. This means every update has to be inside a action.
    // Date - 25th Apr, 2023.
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    // Date - 26th Apr, 2023.
    selectActivity = (id: string) => {
        this.selectedActivity = this.activities.find(a => a.id === id);
    }

    // Date - 26th Apr, 2023.
    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    // Date - 26th Apr, 2023.
    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    // Date - 26th Apr, 2023.
    closeForm = () => {
        this.editMode = false;
    }
}