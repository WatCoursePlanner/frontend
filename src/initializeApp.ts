import { once } from "lodash";

import { CachedCoursesStore } from "./App/stores/CachedCoursesStore";
import { ProfileCoursesStore } from "./App/stores/ProfileCoursesStore";
import { StudentProfileStore } from "./App/stores/StudentProfileStore";

export default once(async () => {
  CachedCoursesStore.get().init();
  await StudentProfileStore.get().init();
  ProfileCoursesStore.get().init();
});
