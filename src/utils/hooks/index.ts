import { ZenAppFlowHooks } from "./appFlow"
import { AsyncSearchHooks } from "./asyncSearch"
import { UtilsHooks } from "./utils"

class ZenHooks {
   app: ZenAppFlowHooks
   asyncSearch: AsyncSearchHooks
   utils: UtilsHooks

   constructor () {
      this.app = new ZenAppFlowHooks()
      this.asyncSearch = new AsyncSearchHooks()
      this.utils = new UtilsHooks()
   }
}

const zenHooks = new ZenHooks()
export default zenHooks