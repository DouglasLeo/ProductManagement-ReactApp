import Button from "../../../shared/components/Button.tsx";
import Textarea from "../../../shared/components/TextareaInput.tsx";
import MoneyInput from "../../../shared/components/MoneyInput.tsx";
import NumberInput from "../../../shared/components/NumberInput.tsx";
import type { InputProduct } from "../types/product.ts";
import type { ProductErrors } from "../types/ProductErrors.ts";
import TextInput from "../../../shared/components/TextInput.tsx";
import CheckboxInput from "../../../shared/components/CheckBoxInput.tsx";

interface ProductFormProps {
  title: string;
  product: InputProduct;
  saving: boolean;
  errors?: ProductErrors;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onPriceChange: (value: number) => void;
  onPriceBlur: () => void;
  onQuantityChange: (value: string) => void;
  onQuantityBlur: () => void;
  onCheckBoxChange: (value: boolean) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
const ProductForm = ({
  title,
  product,
  saving,
  errors,
  onChange,
  onBlur,
  onPriceChange,
  onPriceBlur,
  onQuantityChange,
  onQuantityBlur,
  onCheckBoxChange,
  onSubmit,
}: ProductFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-5 m-8"
    >
      <h1 className="text-2xl font-semibold text-slate-800">{title}</h1>

      <TextInput
        labelName="Nome"
        name="name"
        error={errors?.name}
        value={product.name}
        onChange={onChange}
        onBlur={onBlur}
      />

      <Textarea
        labelName="Descrição"
        name="description"
        value={product.description}
        error={errors?.description}
        rows={5}
        onChange={onChange}
        onBlur={onBlur}
      />

      <div className="grid grid-cols-2 gap-4">
        <MoneyInput
          name="price"
          labelName="Preço"
          value={product.price}
          error={errors?.price}
          onChange={onPriceChange}
          onBlur={onPriceBlur}
        />

        <NumberInput
          name="quantity"
          labelName="Quantidade"
          value={product.quantity}
          error={errors?.quantity}
          onChange={onQuantityChange}
          onBlur={onQuantityBlur}
        />
      </div>

      <CheckboxInput
        labelName="Produto Disponível"
        name="active"
        type="checkbox"
        checked={product.active}
        onChange={onCheckBoxChange}
        className="mx-2"
      />

      <Button
        disabled={saving}
        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 rounded transition-colors"
      >
        {saving ? "Salvando..." : "Salvar"}
      </Button>
    </form>
  );
};

export default ProductForm;
