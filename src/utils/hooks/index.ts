import { ZenAppFlowHooks } from "./appFlow"
import { UtilsHooks } from "./utils"

class ZenHooks {
   app: ZenAppFlowHooks
   utils: UtilsHooks

   constructor () {
      this.app = new ZenAppFlowHooks()
      this.utils = new UtilsHooks()
   }
}

const zenHooks = new ZenHooks()
export default zenHooks