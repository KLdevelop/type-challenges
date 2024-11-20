// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Unique<[1, 1, 2, 2, 3, 3]>, [1, 2, 3]>>,
  Expect<Equal<Unique<[1, 2, 3, 4, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
  Expect<Equal<Unique<[1, 'a', 2, 'b', 2, 'a']>, [1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]>, [string, number, 1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[unknown, unknown, any, any, never, never]>, [unknown, any, never]>>,
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

type IndexOf<T, U> =
  FilterNever<EqualIndexes<T, U>> extends infer F extends unknown[] ?
      [] extends F ?
          -1 :
        F[0] :
    never

type Unique<T, E extends unknown[] = []> =
  T extends [infer F, ...infer R extends unknown[]] ?
    Unique<R, [...E, F]> extends infer UR extends unknown[] ?
      IndexOf<E, F> extends -1 ?
          [F, ...UR] :
        UR :
      never :
    T
