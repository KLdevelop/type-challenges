// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>, [1, 4, 5]>>,
  Expect<Equal<FindEles<[2, 2, 3, 3, 6, 6, 6]>, []>>,
  Expect<Equal<FindEles<[1, 2, 3]>, [1, 2, 3]>>,
]

// ============= Your Code Here =============
type Includes<T extends unknown[], El> =
  T extends [El, ...unknown[]] ?
    true :
    T extends [unknown, ...infer R] ?
      Includes<R, El> :
      false

type FilterDup<T extends unknown[], F extends unknown[]> =
  T extends [infer Q, ...infer W] ?
    Includes<[...F, ...W], Q> extends true ?
      FilterDup<W, [...F, Q]> :
        [Q, ...FilterDup<W, F>] :
    T

type FindEles<T extends any[]> = FilterDup<T, []>
