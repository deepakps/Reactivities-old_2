// Activity store for MobX.
// Date - 24th Apr, 2023.

import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';

// Date - 24th Apr, 2023.
export default class ActivityStore {
    activities: Activity[] = [];
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    // Defaulted to true to resolve flickring issue on page refresh. Date - 01st May, 2023.
    // Defaulted to false to handle loading indicator on page refresh for Create Activity. Date - 09th May, 2023.
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    // Computed action to sort activities by date.
    // Date - 01st May, 2023.
    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) =>
            Date.parse(a.date) - Date.parse(b.date));
    }

    // This function will treat each activity date as key.
    // reduce initial value is activity Array. Inside reduce if activity present by date then it will be 
    // grouped with the Date, if not then the acitivity will be grouped individually.
    // I.e. we will have array of Object, where each object has key as activity date & for each date we have array of activities.
    // Date - 12th May, 2023.
    get groupedActivities() {
        let grpActivities = Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = activity.date;
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as { [key: string]: Activity[] })
        );
        // console.log(grpActivities);
        return grpActivities;
    }

    loadActivities = async () => {
        // Uncommented to resolve single activity issue after refresh while routing. Date - 04th May, 2023.
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list();

            activities.forEach(activity => {
                this.setActivity(activity);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    // Date - 04th May, 2023.
    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        }
        else {
            this.setLoadingInitial(true);
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => this.selectedActivity = activity);
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    // Date - 04th May, 2023.
    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    // Date - 04th May, 2023.
    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
    }

    // Any steps after 'await' aren't in the same tick, so they require action wrapping.
    // Here, we can leverae 'runInAction'. This means every update has to be inside a action.
    // Date - 25th Apr, 2023.
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    /* Commented because they are no longer needed as Routing is implemented. Date - 04th May, 2023.
    // Date - 26th Apr, 2023.
    selectActivity = (id: string) => {
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
    }*/

    // Date - 30th Apr, 2023.
    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();

        try {
            await agent.Activities.create(activity);
            runInAction(() => {
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
                this.activityRegistry.set(activity.id, activity);
                runInAction(() => this.selectedActivity = activity);
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