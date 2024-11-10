// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>,
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

type GreaterThan<T extends number, U extends number> =
  T extends U | 0 ? false :
    MinusOne<T> extends infer MOT extends number ?
      U extends MOT ? true :
        GreaterThan<MOT, U> :
      never
