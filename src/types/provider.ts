export type Provider<T> = () => T
export type Consumer<T> = (value: T) => void
export type ProvideAndConsume<P, C> = (value: C) => P
