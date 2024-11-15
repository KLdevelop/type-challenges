// ============= Test Cases =============
import type { Equal, Expect, MergeInsertions } from './test-utils'

type cases = [
  Expect<Equal<Fill<[], 0>, []>>,
  Expect<Equal<Fill<[], 0, 0, 3>, []>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0>, [0, 0, 0]>>,
  Expect<Equal<Fill<[1, 2, 3], true>, [true, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 20>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 10>, [true, true, true]>>,
]

// ============= Your Code Here =============
type ParseInt<T extends string> =
  T extends `0${infer N}` ? ParseInt<N> :
    T extends `${infer N extends number}` ? N : never

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

type GetLastDigit<T extends string | number> =
  `${T}` extends `${infer Q extends Digit}${infer R}` ?
    R extends '' ? Q : GetLastDigit<R> :
    never

type IncDigit<D extends Digit> =
  D extends 0 ? 1 :
    D extends 1 ? 2 :
      D extends 2 ? 3 :
        D extends 3 ? 4 :
          D extends 4 ? 5 :
            D extends 5 ? 6 :
              D extends 6 ? 7 :
                D extends 7 ? 8 :
                  D extends 8 ? 9 :
                    D extends 9 ? 10 :
                      never

type PlusOne<T extends number, D extends Digit = GetLastDigit<T>> =
  T extends Digit ?
    IncDigit<T> :
  `${T}` extends `${infer S extends number}${D}` ?
    D extends 9 ?
      ParseInt<`${PlusOne<S>}0`> :
      ParseInt<`${S}${IncDigit<D>}`> :
    never

type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  CurrentIndex extends number = 0,
  Started extends boolean = false,
> =
  CurrentIndex extends End | T['length'] ?
    T :
    Started extends true ?
      T extends [unknown, ...infer R] ?
          [N, ...Fill<R, N, Start, End, PlusOne<CurrentIndex>, true>] :
        T :
      CurrentIndex extends Start ? Fill<T, N, Start, End, CurrentIndex, true> :
        T extends [infer F, ...infer R] ?
            [F, ...Fill<R, N, Start, End, PlusOne<CurrentIndex>, Started>] :
          T
