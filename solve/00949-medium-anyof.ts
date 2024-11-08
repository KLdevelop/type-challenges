// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<AnyOf<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[1, '', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, 'test', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], {}, undefined, null]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>,
]

// ============= Your Code Here =============

type FilterFalse<T> =
  T extends infer Q ?
    false extends Q ?
      never :
      0 extends Q ?
        never :
        null extends Q ?
          never :
          undefined extends Q ?
            never :
              {} extends Q ?
                never :
                  [] extends Q ?
                    never :
                    '' extends Q ?
                      never :
                      T :
    T
type AnyOf<T extends readonly any[]> = FilterFalse<T[number]> extends never ? false : true
