// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Join<['a', 'p', 'p', 'l', 'e'], '-'>, 'a-p-p-l-e'>>,
  Expect<Equal<Join<['Hello', 'World'], ' '>, 'Hello World'>>,
  Expect<Equal<Join<['2', '2', '2'], 1>, '21212'>>,
  Expect<Equal<Join<['o'], 'u'>, 'o'>>,
  Expect<Equal<Join<[], 'u'>, ''>>,
]

// ============= Your Code Here =============
type WithToString = string | number | bigint | boolean | null | undefined

type Join<T extends readonly WithToString[], U extends WithToString> =
  T extends [infer F extends WithToString, ...infer R extends WithToString[]] ?
      [] extends R ?
        F :
  `${F}${U}${Join<R, U>}` :
    ''
