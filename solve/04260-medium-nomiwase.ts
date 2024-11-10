// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<AllCombinations<''>, ''>>,
  Expect<Equal<AllCombinations<'A'>, '' | 'A'>>,
  Expect<Equal<AllCombinations<'AB'>, '' | 'A' | 'B' | 'AB' | 'BA'>>,
  Expect<Equal<AllCombinations<'ABC'>, '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'>>,
  Expect<Equal<AllCombinations<'ABCD'>, '' | 'A' | 'B' | 'C' | 'D' | 'AB' | 'AC' | 'AD' | 'BA' | 'BC' | 'BD' | 'CA' | 'CB' | 'CD' | 'DA' | 'DB' | 'DC' | 'ABC' | 'ABD' | 'ACB' | 'ACD' | 'ADB' | 'ADC' | 'BAC' | 'BAD' | 'BCA' | 'BCD' | 'BDA' | 'BDC' | 'CAB' | 'CAD' | 'CBA' | 'CBD' | 'CDA' | 'CDB' | 'DAB' | 'DAC' | 'DBA' | 'DBC' | 'DCA' | 'DCB' | 'ABCD' | 'ABDC' | 'ACBD' | 'ACDB' | 'ADBC' | 'ADCB' | 'BACD' | 'BADC' | 'BCAD' | 'BCDA' | 'BDAC' | 'BDCA' | 'CABD' | 'CADB' | 'CBAD' | 'CBDA' | 'CDAB' | 'CDBA' | 'DABC' | 'DACB' | 'DBAC' | 'DBCA' | 'DCAB' | 'DCBA'>>,
]

// ============= Your Code Here =============
type Reverse<T extends string> = T extends `${infer F}${infer R}` ? `${Reverse<R>}${F}` : T
type ReverseUnion<T extends string> = T | Reverse<T>

type AllCombinations<S extends string, C extends string = ''> =
  ReverseUnion<S> extends infer RUS extends string ?
    S extends `${infer F extends string}${infer R extends string}` ?
      ReverseUnion<R> extends infer RUR extends string ?
        ReverseUnion<F> extends infer RUF extends string ?
          ReverseUnion<C> extends infer RUC extends string ?
          ReverseUnion<`${RUR}${RUC}${RUF}`> |
          ReverseUnion<`${AllCombinations<RUR, RUC>}${RUF}`> |
          ReverseUnion<AllCombinations<RUR, RUF> | RUC> :
            never : never : never : RUS | C : S | C
