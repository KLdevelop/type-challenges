// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>
type Z1 = Promise<Promise<Promise<string | boolean>>>
type T = { then: (onfulfilled: (arg: number) => any) => any }

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>,
]

// @ts-expect-error
type error = MyAwaited<number>

// ============= Your Code Here =============
type Thenable = { then: (onfulfilled: (arg: any) => any) => any }
type MyAwaited<T extends Thenable> =
  T extends { then: (onfulfilled: (arg: infer Q) => any) => any } ?
    Q extends Thenable ? MyAwaited<Q> : Q :
    T
