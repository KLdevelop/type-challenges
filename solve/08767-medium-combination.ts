// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Combination<['foo', 'bar', 'baz']>, 'foo' | 'bar' | 'baz' | 'foo bar' | 'foo bar baz' | 'foo baz' | 'foo baz bar' | 'bar foo' | 'bar foo baz' | 'bar baz' | 'bar baz foo' | 'baz foo' | 'baz foo bar' | 'baz bar' | 'baz bar foo'>>,
]

// ============= Your Code Here =============
type Combination<T extends string[]> =
  T[number] |
  (T extends [infer Q extends string, ...infer W extends string[]] ?
  `${Q} ${Combination<W>}` |
  `${Combination<W>} ${Q}` :
    never) |
    (T extends [...infer Q extends string[], infer W extends string] ?
    `${W} ${Combination<Q>}` |
    `${Combination<Q>} ${W}` :
      never
  )
