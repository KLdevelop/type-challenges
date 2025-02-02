// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type ModifierKeys = ['cmd', 'ctrl', 'opt', 'fn']
type CaseTypeOne = 'cmd ctrl' | 'cmd opt' | 'cmd fn' | 'ctrl opt' | 'ctrl fn' | 'opt fn'

type cases = [
  Expect<Equal<Combs<ModifierKeys>, CaseTypeOne>>,
]

// ============= Your Code Here =============
type Combs<T extends string[]> =
  T extends [infer Q extends string, infer W extends string, ...infer E extends string[]] ?
  `${Q} ${W}` | Combs<[Q, ...E]> | Combs<[W, ...E]> :
    never

type A = Combs<ModifierKeys>
