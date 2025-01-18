// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Zip<[], []>, []>>,
  Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip<[1, 2, 3], ['1', '2']>, [[1, '1'], [2, '2']]>>,
  Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>,
]

// ============= Your Code Here =============
type Zip<T extends readonly any[], U extends readonly any[]> =
  T extends [infer TF, ...infer TR] ?
    U extends [infer UF, ...infer UR] ?
        [[TF, UF], ...Zip<TR, UR>] :
        [] :
      []