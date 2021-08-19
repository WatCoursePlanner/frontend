import { CachedCoursesStore } from "./stores/CachedCoursesStore";
import { ProfileCoursesStore } from "./stores/ProfileCoursesStore";
import { StudentProfileStore } from "./stores/StudentProfileStore";
import { UserStore } from "./stores/UserStore";

export default new Promise<void>(async (resolve, reject) => {
  try {
    CachedCoursesStore.get().init();
    await UserStore.get().init();
    await StudentProfileStore.get().init();
    ProfileCoursesStore.get().init();
    gapi.load('auth2', () => {
      gapi.auth2.init({});
    });
    resolve();
  } catch (error) {
    reject(error);
  }
});
