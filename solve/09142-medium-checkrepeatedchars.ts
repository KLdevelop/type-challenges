// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

type cases = [
  Expect<Equal<CheckRepeatedChars<'abc'>, false>>,
  Expect<Equal<CheckRepeatedChars<'abb'>, true>>,
  Expect<Equal<CheckRepeatedChars<'cbc'>, true>>,
  Expect<Equal<CheckRepeatedChars<''>, false>>,
]

// ============= Your Code Here =============
type CheckRepeatedChars<T extends string> =
  T extends `${infer Q}${infer W}${infer E}` ?
    Equal<Q, W> extends true ? true :
      Equal<Q, E> extends true ? true :
        Equal<W, E> extends true ? true :
          CheckRepeatedChars<W> extends true ? true :
            CheckRepeatedChars<Q> extends true ? true :
              CheckRepeatedChars<E> extends true ? true :
                CheckRepeatedChars<`${Q}${E}`> extends true ? true :
                  CheckRepeatedChars<`${W}${E}`> extends true ? true :
                    false :
    false
