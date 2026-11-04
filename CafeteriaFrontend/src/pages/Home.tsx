import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { Product } from "./ProductForm.tsx";

type HomeProps = {
  products: Product[];
  onNew: () => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
};

export default function Home({
  products,
  onNew,
  onEdit,
  onDelete,
}: HomeProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesName = product.name.includes(search);

      const matchesCategory =
        category === "Todas" || product.category === category;

      return matchesName && matchesCategory;
    });
  }, [products, search, category]);

  const totalValue = products.reduce(
    (sum, product) => sum + product.price * product.stock,
    0
  );

  const totalStock = products.reduce(
    (sum, product) => sum + product.stock,
    0
  );

  return (
    <div style={styles.content}>
      <div style={styles.headingRow}>
        <div>
          <p style={styles.kicker}>RESUMO DA OPERAÇÃO</p>

          <h1 style={styles.heading}>Visão geral</h1>

          <p style={styles.description}>
            Acompanhe os produtos disponíveis na sua cafeteria.
          </p>
        </div>

        <button
          data-cy="new-product"
          onClick={onNew}
          style={styles.primaryButton}
        >
          ＋ Novo produto
        </button>
      </div>

      <div style={styles.stats}>
        <Stat
          label="Produtos cadastrados"
          value={String(products.length)}
          detail="Itens no cardápio"
          symbol="▦"
        />

        <Stat
          label="Unidades em estoque"
          value={String(totalStock)}
          detail="Quantidade disponível"
          symbol="▤"
        />

        <Stat
          label="Valor em estoque"
          value={totalValue.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
          detail="Preço × quantidade"
          symbol="R$"
        />
      </div>

      <section style={styles.card}>
        <div style={styles.cardHeader}>
          <div>
            <h2 style={styles.cardTitle}>Produtos</h2>

            <p style={styles.cardSubtitle}>
              Gerencie os itens do cardápio.
            </p>
          </div>

          <span style={styles.counter}>
            {filteredProducts.length} itens
          </span>
        </div>

        <div style={styles.filters}>
          <input
            data-cy="search"
            style={styles.search}
            placeholder="⌕  Buscar produto..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            style={styles.select}
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="Todas">Todas</option>
            <option value="Cafés">Cafés</option>
            <option value="Bebidas">Bebidas</option>
            <option value="Salgados">Salgados</option>
            <option value="Doces">Doces</option>
          </select>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>PRODUTO</th>
                <th style={styles.th}>CATEGORIA</th>
                <th style={styles.th}>PREÇO</th>
                <th style={styles.th}>ESTOQUE</th>
                <th style={{ ...styles.th, textAlign: "right" }}>
                  AÇÕES
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td style={styles.td}>
                    <div style={styles.productCell}>
                      <div style={styles.productIcon}>
                        {product.category === "Cafés"
                          ? "☕"
                          : product.category === "Doces"
                          ? "▧"
                          : "◇"}
                      </div>

                      <strong>{product.name}</strong>
                    </div>
                  </td>

                  <td style={styles.td}>
                    <span style={styles.category}>
                      {product.category}
                    </span>
                  </td>

                  <td style={styles.td}>
                    {product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>

                  <td style={styles.td}>
                    <span
                      style={{
                        color:
                          product.stock < 10 ? "#bd704b" : "#5d7764",
                        fontWeight: 700,
                      }}
                    >
                      {product.stock} un.
                    </span>
                  </td>

                  <td
                    style={{
                      ...styles.td,
                      textAlign: "right",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <button
                      data-cy={`edit-${product.id}`}
                      title="Editar"
                      style={styles.iconButton}
                      onClick={() => onEdit(product)}
                    >
                      ✎
                    </button>

                    <button
                      data-cy={`delete-${product.id}`}
                      title="Remover"
                      style={{
                        ...styles.iconButton,
                        color: "#b75e50",
                      }}
                      onClick={() => onDelete(product.id)}
                    >
                      ⌫
                    </button>
                  </td>
                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    style={{
                      ...styles.td,
                      textAlign: "center",
                      padding: 35,
                      color: "#938980",
                    }}
                  >
                    Nenhum produto encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  detail,
  symbol,
}: {
  label: string;
  value: string;
  detail: string;
  symbol: string;
}) {
  return (
    <div style={styles.stat}>
      <div style={styles.statTop}>
        <span>{label}</span>
        <span style={styles.statIcon}>{symbol}</span>
      </div>

      <strong style={styles.statValue}>{value}</strong>

      <small style={styles.statDetail}>{detail}</small>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  content: {
    padding: "34px 38px 50px",
    maxWidth: 1300,
    margin: "0 auto",
  },
  headingRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    marginBottom: 27,
  },
  kicker: {
    color: "#b27a4c",
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: 1.5,
    margin: "0 0 7px",
  },
  heading: {
    fontSize: 27,
    margin: "0 0 7px",
    color: "#302820",
  },
  description: {
    color: "#8b8179",
    margin: 0,
    fontSize: 13,
  },
  primaryButton: {
    background: "#9b633b",
    color: "#fff",
    border: 0,
    borderRadius: 8,
    padding: "12px 17px",
    cursor: "pointer",
    fontWeight: 700,
    whiteSpace: "nowrap",
  },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 16,
    marginBottom: 25,
  },
  stat: {
    background: "#fff",
    border: "1px solid #eee8e2",
    borderRadius: 12,
    padding: 19,
  },
  statTop: {
    display: "flex",
    justifyContent: "space-between",
    color: "#837970",
    fontSize: 12,
  },
  statIcon: {
    background: "#f6eee7",
    color: "#9b633b",
    borderRadius: 8,
    padding: "6px 8px",
    fontWeight: 800,
  },
  statValue: {
    display: "block",
    fontSize: 25,
    margin: "13px 0 5px",
    color: "#302820",
  },
  statDetail: {
    color: "#a39a92",
    fontSize: 11,
  },
  card: {
    background: "#fff",
    border: "1px solid #eee8e2",
    borderRadius: 12,
    overflow: "hidden",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "21px 23px 16px",
  },
  cardTitle: {
    margin: 0,
    fontSize: 17,
  },
  cardSubtitle: {
    margin: "5px 0 0",
    color: "#978d84",
    fontSize: 12,
  },
  counter: {
    color: "#8b8179",
    background: "#f7f4f0",
    borderRadius: 20,
    padding: "6px 10px",
    fontSize: 11,
  },
  filters: {
    display: "flex",
    gap: 10,
    padding: "0 23px 17px",
  },
  search: {
    flex: 1,
    border: "1px solid #e9e2dc",
    borderRadius: 8,
    padding: "10px 12px",
    fontSize: 13,
    minWidth: 120,
  },
  select: {
    border: "1px solid #e9e2dc",
    borderRadius: 8,
    padding: "10px 12px",
    background: "#fff",
    color: "#55483e",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
    fontSize: 13,
  },
  th: {
    background: "#faf8f6",
    color: "#9b9188",
    fontSize: 9,
    letterSpacing: 1,
    padding: "12px 18px",
    borderTop: "1px solid #f0ebe6",
  },
  td: {
    padding: "14px 18px",
    borderTop: "1px solid #f1ede9",
    color: "#5e554e",
  },
  productCell: {
    display: "flex",
    alignItems: "center",
    gap: 11,
    color: "#39302a",
  },
  productIcon: {
    width: 34,
    height: 34,
    borderRadius: 9,
    background: "#f6eee7",
    display: "grid",
    placeItems: "center",
    fontSize: 17,
  },
  category: {
    background: "#f6f2ee",
    color: "#806a58",
    padding: "5px 9px",
    borderRadius: 20,
    fontSize: 11,
  },
  iconButton: {
    background: "#f8f5f2",
    border: 0,
    borderRadius: 7,
    width: 31,
    height: 31,
    marginLeft: 6,
    cursor: "pointer",
    color: "#82664f",
    fontSize: 17,
  },
};