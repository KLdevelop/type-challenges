// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<LastIndexOf<[1, 2, 3, 2, 1], 2>, 3>>,
  Expect<Equal<LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 7>>,
  Expect<Equal<LastIndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<LastIndexOf<[string, 2, number, 'a', number, 1], number>, 4>>,
  Expect<Equal<LastIndexOf<[string, any, 1, number, 'a', any, 1], any>, 5>>,
]

// ============= Your Code Here =============
type IsNever<T> = (() => T extends never ? 1 : 2) extends (() => 1) ? true : false

type EqualIndexes<T, U> =
  { [K in keyof T]: Equal<T[K], U> extends true ? K extends `${infer N extends number}` ? N : never : never }

type FilterNever<T> =
  T extends [infer Q, ...infer R] ?
    FilterNever<R> extends infer FNR extends unknown[] ?
      IsNever<Q> extends true ?
        FNR :
          [Q, ...FNR] :
      never :
    T

type Reverse<T> = T extends [infer F, ...infer R] ? [...Reverse<R>, F] : T

type LastIndexOf<T, U> =
  FilterNever<Reverse<EqualIndexes<T, U>>> extends infer F extends unknown[] ?
      [] extends F ?
          -1 :
        F[0] :
    never
