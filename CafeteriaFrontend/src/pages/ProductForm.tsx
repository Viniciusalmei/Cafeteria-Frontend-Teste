import { useState } from "react";
import type { CSSProperties, FormEvent } from "react";

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
};

type ProductFormProps = {
  title: string;
  description: string;
  initialProduct?: Product;
  onCancel: () => void;
  onSave: (product: Omit<Product, "id">) => void;
};

export default function ProductForm({
  title,
  description,
  initialProduct,
  onCancel,
  onSave,
}: ProductFormProps) {
  const [name, setName] = useState(initialProduct?.name ?? "");
  const [category, setCategory] = useState(
    initialProduct?.category ?? "Cafés"
  );
  const [price, setPrice] = useState(
    String(initialProduct?.price ?? "")
  );
  const [stock, setStock] = useState(
    String(initialProduct?.stock ?? "")
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSave({
      name: name.trim(),
      category,
      price: Number(price),
      stock: Number(stock),
    });
  }

  return (
    <div style={styles.content}>
      <div style={styles.heading}>
        <div>
          <p style={styles.kicker}>CARDÁPIO DA CAFETERIA</p>

          <h1 style={styles.title}>{title}</h1>

          <p style={styles.description}>{description}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={styles.card}>
        <div style={styles.sectionTitle}>
          Informações do produto
        </div>

        <div style={styles.grid}>
          <label style={styles.field}>
            <span>Nome do produto</span>

            <input
              data-cy="product-name"
              style={styles.input}
              placeholder="Ex.: Café coado"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>

          <label style={styles.field}>
            <span>Categoria</span>

            <select
              data-cy="product-category"
              style={styles.input}
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option>Cafés</option>
              <option>Bebidas</option>
              <option>Salgados</option>
              <option>Doces</option>
            </select>
          </label>

          <label style={styles.field}>
            <span>Preço (R$)</span>

            <input
              data-cy="product-price"
              style={styles.input}
              type="number"
              step="0.01"
              placeholder="0,00"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </label>

          <label style={styles.field}>
            <span>Quantidade em estoque</span>

            <input
              data-cy="product-stock"
              style={styles.input}
              type="number"
              placeholder="0"
              value={stock}
              onChange={(event) => setStock(event.target.value)}
            />
          </label>
        </div>

        <div style={styles.tip}>
          Dica: mantenha as informações atualizadas para facilitar
          o controle do cardápio.
        </div>

        <div style={styles.actions}>
          <button
            type="button"
            onClick={onCancel}
            style={styles.cancel}
          >
            Cancelar
          </button>

          <button
            data-cy="save-product"
            type="submit"
            style={styles.save}
          >
            Salvar produto →
          </button>
        </div>
      </form>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  content: {
    padding: "34px 38px",
    maxWidth: 1050,
    margin: "0 auto",
  },
  heading: {
    marginBottom: 25,
  },
  kicker: {
    color: "#b27a4c",
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: 1.5,
    margin: "0 0 7px",
  },
  title: {
    fontSize: 27,
    margin: "0 0 7px",
    color: "#302820",
  },
  description: {
    color: "#8b8179",
    margin: 0,
    fontSize: 13,
  },
  card: {
    background: "#fff",
    border: "1px solid #eee8e2",
    borderRadius: 12,
    padding: 25,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 700,
    paddingBottom: 18,
    borderBottom: "1px solid #f0ebe6",
    marginBottom: 21,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "20px 18px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    color: "#5d5148",
    fontSize: 12,
    fontWeight: 700,
  },
  input: {
    border: "1px solid #e7e0da",
    borderRadius: 8,
    padding: "12px 13px",
    fontSize: 13,
    color: "#42382f",
    background: "#fff",
  },
  tip: {
    background: "#faf6f1",
    color: "#92795f",
    borderRadius: 8,
    padding: 13,
    fontSize: 11,
    marginTop: 25,
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 27,
    paddingTop: 20,
    borderTop: "1px solid #f0ebe6",
  },
  cancel: {
    border: "1px solid #e5ddd6",
    background: "#fff",
    color: "#76695e",
    borderRadius: 8,
    padding: "11px 17px",
    cursor: "pointer",
    fontWeight: 600,
  },
  save: {
    border: 0,
    background: "#9b633b",
    color: "#fff",
    borderRadius: 8,
    padding: "11px 17px",
    cursor: "pointer",
    fontWeight: 700,
  },
};