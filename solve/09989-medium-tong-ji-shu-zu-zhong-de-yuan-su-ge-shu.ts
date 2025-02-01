// ============= Test Cases =============
import type { Equal, Expect, MergeInsertions } from './test-utils'

type cases = [
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5]>, {
    1: 1
    2: 1
    3: 1
    4: 1
    5: 1
  } >>,
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3]]>, {
    1: 2
    2: 2
    3: 2
    4: 1
    5: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3, [4, 4, 1, 2]]]>, {
    1: 3
    2: 3
    3: 2
    4: 3
    5: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<[never]>, {}>>,
  Expect<Equal<CountElementNumberToObject<['1', '2', '0']>, {
    0: 1
    1: 1
    2: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<['a', 'b', ['c', ['d']]]>, {
    'a': 1
    'b': 1
    'c': 1
    'd': 1
  }>>,
]

// ============= Your Code Here =============
type ParseInt<T extends string> =
  T extends '0' ? 0 :
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

type Key = string | number | symbol

type CountRecord<T extends unknown[], RC extends Record<Key, number>> =
  T extends [infer Q extends Key, ...infer W extends Key[]] ?
    CountRecord<W, Omit<RC, Q> & Record<Q, PlusOne<RC[Q]>>> :
    RC

type ArrayToRecord<T extends unknown[]> =
  T extends [infer Q extends Key, ...infer W extends Key[]] ?
    MergeInsertions<Record<Q, 0> & ArrayToRecord<W>> :
      {}

type Flatten<T extends unknown[]> =
  T extends [infer Q, ...infer W] ?
      [Q] extends [never] ? [never, ...Flatten<W>] :
        Q extends unknown[] ?
            [...Flatten<Q>, ...Flatten<W>] :
            [Q, ...Flatten<W>] :
    T

type CountElementNumberToObject<T extends unknown[]> =
  MergeInsertions<CountRecord<Flatten<T>, ArrayToRecord<Flatten<T>>>>
