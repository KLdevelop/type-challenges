// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
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

type Plus<A extends number, B extends number> =
  A extends 0 ? B :
    B extends 0 ? A :
      Plus<PlusOne<A>, MinusOne<B>>

type Fibonacci<T extends number> =
  T extends 1 ? 1 :
    T extends 2 ? 1 :
      MinusOne<T> extends infer M extends number ?
        Plus<Fibonacci<M>, Fibonacci<MinusOne<M>>> :
        never
