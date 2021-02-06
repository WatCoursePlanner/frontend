import { CachedCoursesStore } from "./stores/CachedCoursesStore";
import { ProfileCoursesStore } from "./stores/ProfileCoursesStore";
import { StudentProfileStore } from "./stores/StudentProfileStore";

export default new Promise<void>(async (resolve, reject) => {
  try {
    CachedCoursesStore.get().init();
    await StudentProfileStore.get().init();
    ProfileCoursesStore.get().init();
    resolve();
  } catch (error) {
    reject(error);
  }
});
