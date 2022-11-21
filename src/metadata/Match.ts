import { MatchParams } from "../adapters";

export default function Match(query: string) {
  return (target: any, property: string, descriptor: PropertyDescriptor) => {
    const previous = descriptor.value;
    descriptor.value = async ({ message }: Partial<MatchParams> = {}) => {
      try {
        const matches = message?.includes(query);
        const value = previous();
        const isPromise = typeof value === "object" && typeof value.then === "function";
        return {
          query,
          matches,
          message: matches ? (isPromise ? await value : value) : null,
        };
      } catch {
        return {
          query,
          matches: false,
          message: null,
        };
      }
    };
    return descriptor;
  };
}
