export interface UseCaseInterface<I, O> {
  execute(input: I): Promise<O>;
}