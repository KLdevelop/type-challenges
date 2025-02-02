// ============= Test Cases =============
import type { Equal, Expect, UnionToIntersection } from './test-utils'

type cases = [
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', 'Type'>, [14]>>,
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', 'pe'>, [16, 27]>>,
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', ''>, []>>,
  Expect<Equal<FindAll<'', 'Type'>, []>>,
  Expect<Equal<FindAll<'', ''>, []>>,
  Expect<Equal<FindAll<'AAAA', 'A'>, [0, 1, 2, 3]>>,
  Expect<Equal<FindAll<'AAAA', 'AA'>, [0, 1, 2]>>,
]

// ============= Your Code Here =============
type CharArray<T extends string> =
  T extends `${infer C}${infer S}` ? [C, ...CharArray<S>] : []

type Length<T extends string> = CharArray<T>['length']

type FindAll<T extends string, P extends string, S extends string = ''> =
  P extends '' ? [] :
    T extends `${infer Z}${P}${infer R}` ?
      P extends `${infer Q}${infer W}` ?
          [Length<`${S}${Z}`>, ...FindAll<`${W}${R}`, P, `${S}${Z}${Q}`>] :
          [Length<`${S}${Z}`>, ...FindAll<R, P, `${S}${Z}${P}`>] :
        []
