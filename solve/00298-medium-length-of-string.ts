// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
]

// ============= Your Code Here =============
type StringToTuple<S extends string> = S extends `${infer Q}${infer W}` ? [Q, ...StringToTuple<W>] : []
type LengthOfString<S extends string> = StringToTuple<S>['length']
