import { privateRoutes } from "./Private"
import { publicRoutes } from "./Public"
import { ZenRoute } from "./types"

export const routes: ZenRoute[] = [
   ...privateRoutes,
   ...publicRoutes
]
