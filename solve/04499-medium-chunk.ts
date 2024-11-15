// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>,
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

type UnknownTuple<N extends number> = N extends 0 ? [] : [unknown, ...UnknownTuple<MinusOne<N>>]

type Chunk<T extends readonly any[], D extends number> =
  T extends [] ? [] :
    T extends [unknown] ? [T] :
      T extends [...UnknownTuple<D>, ...infer R] ?
        T extends [...infer F, ...R] ? [F, ...Chunk<R, D>] : never :
          [T]
