// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>,
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
