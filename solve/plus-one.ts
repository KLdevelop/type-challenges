type ParseInt<T extends string> =
    T extends `0${infer N}` ? ParseInt<N> :
      T extends `${infer N extends number}` ? N : never

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

type GetLastDigit<T extends string | number> =
    `${T}` extends `${infer Q extends Digit}${infer R}` ?
      R extends '' ? Q : GetLastDigit<R> :
      never

type IncDigit<D extends Digit> =
    D extends 0 ? 1 :
      D extends 1 ? 2 :
        D extends 2 ? 3 :
          D extends 3 ? 4 :
            D extends 4 ? 5 :
              D extends 5 ? 6 :
                D extends 6 ? 7 :
                  D extends 7 ? 8 :
                    D extends 8 ? 9 :
                      D extends 9 ? 10 :
                        never

type PlusOne<T extends number, D extends Digit = GetLastDigit<T>> =
    T extends Digit ?
      IncDigit<T> :
    `${T}` extends `${infer S extends number}${D}` ?
      D extends 9 ?
        ParseInt<`${PlusOne<S>}0`> :
        ParseInt<`${S}${IncDigit<D>}`> :
      never
