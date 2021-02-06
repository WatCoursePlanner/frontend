import { singletonGetter } from "@watcourses/utils/SingletonGetter";
import {
  Action,
  createBrowserHistory,
  History,
  Location,
  LocationDescriptorObject,
} from "history";
import { cloneDeep, defer } from "lodash";
import { action, IObservableArray, observable } from "mobx";
import { stringify } from "query-string";

export class AppHistory {
  static get = singletonGetter(AppHistory);

  private pastLocations: IObservableArray<Location> = observable.array();

  constructor(public readonly history: History = createBrowserHistory()) {
    this.pastLocations.push(this.history.location);
    this.history.listen(this.updatePastLocations);
  }

  previousLocation() {
    return cloneDeep(this.pastLocations[this.pastLocations.length - 2]);
  }

  isPreviousLocationWithinApp(): boolean {
    return this.pastLocations.length > 1;
  }

  /**
   * Supports including the query in the path or specifying an additional
   * object with the query params.
   */
  goTo(path: History.Path, query?: { [key: string]: string | string[] }) {
    if (query) {
      if (path.includes("?")) {
        throw new Error(
          "Query params included in both path and in the query object"
        );
      }

      const queryString = stringify(query);
      if (queryString) {
        path = `${path}?${queryString}`;
      }
    }
    this.history.push(path);
  }

  /**
   * Use this only if you want to go to the last location in the app.
   *
   * If you are exiting out of a modal you probably want to use this
   * function to remove the modal path from your history.
   *
   * goBack takes a required location because sometimes going back
   * take us out of the react app. In this case we should replace
   * the location with the provided path.
   */
  goBack(path: History.Path, state?: History.LocationState): void;
  goBack(location: LocationDescriptorObject): void;
  goBack(
    location: History.Path | LocationDescriptorObject,
    state?: History.LocationState
  ): void {
    if (this.isPreviousLocationWithinApp()) {
      this.history.goBack();
    } else {
      this.history.replace(location as any, state);
    }
  }

  replace(path: History.Path, state?: History.LocationState): void;
  replace(location: LocationDescriptorObject): void;
  replace(
    location: History.Path | LocationDescriptorObject,
    state?: History.LocationState
  ) {
    this.history.replace(location as any, state);
  }

  private updatePastLocations = (location: Location, historyAction: Action) => {
    defer(() => {
      switch (historyAction) {
        case "PUSH":
          this.pushLocation(location);
          break;
        case "REPLACE":
          this.replaceLocation(location);
          break;
        case "POP": {
          this.popLocation(location);
          break;
        }
        default:
      }
    });
  };

  @action
  private pushLocation(location: Location) {
    this.pastLocations.push(location);
  }

  @action
  private replaceLocation(location: Location) {
    const updatedPastLocations = this.pastLocations.slice(0, -1);
    updatedPastLocations.push(location);
    this.pastLocations.replace(updatedPastLocations);
  }

  @action
  private popLocation(location: Location) {
    let updatedPastLocations = this.pastLocations.slice(0, -1);
    const previousLocation =
      updatedPastLocations[updatedPastLocations.length - 1];
    if (!previousLocation || previousLocation.key !== location.key) {
      updatedPastLocations = [location];
    }
    this.pastLocations.replace(updatedPastLocations);
  }
}
