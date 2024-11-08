// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Foo = {
  a: number
  b: string
}
type Bar = {
  b: number
  c: boolean
}

type cases = [
  Expect<Equal<Merge<Foo, Bar>, {
    a: number
    b: number
    c: boolean
  }>>,
]

// ============= Your Code Here =============
type Unite<F, S> = Omit<F, keyof S> & S
type Merge<F, S> = { [K in keyof Unite<F, S>]: Unite<F, S>[K] }
