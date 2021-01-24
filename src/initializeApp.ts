import { once } from "lodash";

import { CachedCoursesStore } from "./App/stores/CachedCoursesStore";

export default once(() => {
  CachedCoursesStore.get().init();
});
