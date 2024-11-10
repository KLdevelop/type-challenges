// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
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

type DecDigit<T extends Digit> =
  T extends 0 ? -1 :
    T extends 1 ? 0 :
      T extends 2 ? 1 :
        T extends 3 ? 2 :
          T extends 4 ? 3 :
            T extends 5 ? 4 :
              T extends 6 ? 5 :
                T extends 7 ? 6 :
                  T extends 8 ? 7 :
                    T extends 9 ? 8 :
                      never

type MinusOne<T extends number, D extends Digit = GetLastDigit<T>> =
  T extends Digit ? DecDigit<T> :
  `${T}` extends `${infer S extends number}${D}` ?
    D extends 0 ?
      ParseInt<`${MinusOne<S>}9`> :
      ParseInt<`${S}${DecDigit<D>}`> :
    never

type FlattenDepth<T extends readonly any[], D extends number = 1> =
  D extends 0 ? T :
    T extends [infer F, ...infer R] ?
      F extends readonly any[] ?
          [...FlattenDepth<F, MinusOne<D>>, ...FlattenDepth<R, D>] :
          [F, ...FlattenDepth<R, D>] :
      T
