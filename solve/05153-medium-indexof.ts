// ============= Test Cases =============
import type { Equal, Expect, MergeInsertions } from './test-utils'

type cases = [
  Expect<Equal<IndexOf<[1, 2, 3], 2>, 1>>,
  Expect<Equal<IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 2>>,
  Expect<Equal<IndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a'], number>, 2>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a', any], any>, 4>>,
  Expect<Equal<IndexOf<[string, 'a'], 'a'>, 1>>,
  Expect<Equal<IndexOf<[any, 1], 1>, 1>>,
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
