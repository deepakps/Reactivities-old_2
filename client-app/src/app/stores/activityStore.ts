// Activity store for MobX.
// Date - 24th Apr, 2023.

import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';

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
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    // Defaulted to true to resolve flickring issue on page refresh. Date - 01st May, 2023.
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    // Computed action to sort activities by date.
    // Date - 01st May, 2023.
    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) =>
            Date.parse(a.date) - Date.parse(b.date));
    }

    loadActivities = async () => {
        // Commented to resolve flickring issue on page refresh. Date - 01st May, 2023.
        // this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list();

            activities.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                // Repalcement with Map object. Date - 01st May, 2023.
                // this.activities.push(activity);
                this.activityRegistry.set(activity.id, activity);
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
        // Repalcement with Map object. Date - 01st May, 2023.
        // this.selectedActivity = this.activities.find(a => a.id === id);
        this.selectedActivity = this.activityRegistry.get(id);
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

    // Date - 30th Apr, 2023.
    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();

        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                // Repalcement with Map object. Date - 01st May, 2023.
                // this.activities.push(activity);
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.editMode = false;
                this.loading = false;
            });
        }
    }

    // Date - 30th Apr, 2023.
    updateActivity = async (activity: Activity) => {
        this.loading = true;

        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                // Repalcement with Map object. Date - 01st May, 2023.
                // this.activities = [...this.activities.filter(a => a.id !== activity.id), activity];
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.editMode = false;
                this.loading = false;
            })
        }
    }

    // Date - 1st May, 2023.
    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                // Repalcement with Map object. Date - 01st May, 2023.
                // this.activities = [...this.activities.filter(a => a.id !== id)];
                this.activityRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}