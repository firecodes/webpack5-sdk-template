const cache: any = {}

/**
 * register lib
 * @param name
 * @param lib
 */
export function registerLib(name: string, lib: any) {
  cache[name] = lib
}

/**
 * get lib
 * @param name
 * @return {*}
 */
export function getLib(name: string) {
  return cache[name]
}
