export type ProductErrors = Partial<
  Record<"name" | "description" | "price" | "quantity", string>
>;
