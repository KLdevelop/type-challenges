// ============= Test Cases =============
import type { Equal, Expect, MergeInsertions } from './test-utils'

type cases = [
  Expect<Equal<TupleToNestedObject<['a'], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b'], number>, { a: { b: number } }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b', 'c'], boolean>, { a: { b: { c: boolean } } }>>,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>,
]

// ============= Your Code Here =============
type Key = string | number | symbol

type TupleToNestedObject<T extends readonly Key[], U> =
  T extends [infer F extends Key, ...infer R extends readonly Key[]] ?
    MergeInsertions<Record<F, TupleToNestedObject<R, U>>> :
    U
