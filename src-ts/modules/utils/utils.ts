const modeRegex = new RegExp('^[LS]([1-9]\\d{0,1})T([1-9]\\d{0,1})')

export type SyMode = {
  sLayers: number
  tLayers: number
}

export function parse(SyMode?: string): SyMode {
  const match = modeRegex.exec(SyMode || '')
  if (match) {
    return { sLayers: Number(match[1]), tLayers: Number(match[2]) }
  }
  return { sLayers: 1, tLayers: 1 }
}

export function clone<T>(value: T): T {
  if (value === undefined) {
    return undefined as unknown as T
  } else if (Number.isNaN(value)) {
    return NaN as unknown as T
  } else if (typeof structuredClone === 'function') {
    return structuredClone(value)
  }
  return JSON.parse(JSON.stringify(value))
}

export function generateRandomNumber(): number {
  return Math.round(Math.random() * 10000000)
}
