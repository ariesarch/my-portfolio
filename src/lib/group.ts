// type Grouped<T> = Record<string, T[]>;

// export function groupBy<T>(array: T[], key: keyof T): Grouped<T> {
//   return array.reduce((result: Grouped<T>, item: T) => {
//     const group = item[key] as string | number;
//     result[group] = result[group] || [];
//     result[group].push(item);
//     return result;
//   }, {} as Grouped<T>);
// }

type Grouped<T> = { key: string; items: T[] }[];

export function groupBy<T>(array: T[], key: keyof T): Grouped<T> {
  const grouped: Record<string, T[]> = {};

  array.forEach((item) => {
    const group = item[key] as string;
    grouped[group] = grouped[group] || [];
    grouped[group].push(item);
  });

  return Object.keys(grouped).map((key) => ({ key, items: grouped[key] }));
}
