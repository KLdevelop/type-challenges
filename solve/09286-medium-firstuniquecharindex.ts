// ============= Test Cases =============
import type { Equal, Expect, UnionToIntersection } from './test-utils'

type cases = [
  Expect<Equal<FirstUniqueCharIndex<'leetcode'>, 0>>,
  Expect<Equal<FirstUniqueCharIndex<'loveleetcode'>, 2>>,
  Expect<Equal<FirstUniqueCharIndex<'aabb'>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<''>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<'aaa'>, -1>>,
]

// ============= Your Code Here =============
type ParseInt<T> =
  T extends '0' ? 0 :
    T extends `0${infer N}` ? ParseInt<N> :
      T extends `${infer N extends number}` ? N : never

type CharArray<T extends string> =
  T extends `${infer C extends string}${infer S extends string}` ? [C, ...CharArray<S>] : []

type ReverseArrayToDict<T extends string[]> =
  { [K in keyof T as Extract<T[K], string>]: Exclude<K, number> }

type ReverseDict<T> =
  { [K in keyof T as Extract<UnionToIntersection<T[K]>, string>]: K }

type FilterUnionValues<T> = ReverseDict<ReverseDict<T>>

type FindCharIndex<L extends string[], R extends Record<string, string>, C extends string = L[0]> =
  R[C] extends string ? ParseInt<R[C]> :
    L extends [infer Q extends string, ...infer W extends string[]] ?
      FindCharIndex<W, R, Q> :
        -1

type FirstUniqueCharIndex<T extends string> =
  FindCharIndex<CharArray<T>, FilterUnionValues<ReverseArrayToDict<CharArray<T>>>>
