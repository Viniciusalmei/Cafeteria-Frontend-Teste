import { useMemo, useState } from "react";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import ProductForm, { type Product } from "./pages/ProductForm.tsx";
import type { CSSProperties } from "react";

type Screen = "home" | "new" | "edit";

const initialProducts: Product[] = [
  { id: 1, name: "Café expresso", category: "Cafés", price: 6.5, stock: 32 },
  { id: 2, name: "Cappuccino", category: "Cafés", price: 11, stock: 18 },
  { id: 3, name: "Pão de queijo", category: "Salgados", price: 7, stock: 25 },
  { id: 4, name: "Brownie", category: "Doces", price: 9.5, stock: 12 },
  { id: 5, name: "Suco de laranja", category: "Bebidas", price: 8, stock: 15 },
];

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const nextId = useMemo(
    () => Math.max(0, ...products.map((product) => product.id)) + 1,
    [products]
  );

  function handleCreate(product: Omit<Product, "id">) {
    setProducts((current) => [
      ...current,
      { ...product, id: nextId },
    ]);
    setScreen("home");
  }

  function handleUpdate(updated: Omit<Product, "id">) {
    if (!selectedProduct) return;

    setProducts((current) =>
      current.map((product) =>
        product.id === selectedProduct.id
          ? { ...updated, id: selectedProduct.id }
          : product
      )
    );

    setSelectedProduct(null);
    setScreen("home");
  }

  function handleDelete(id: number) {
    setProducts((current) =>
      current.filter((product) => product.id !== id)
    );
  }

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div style={styles.app}>
      <aside style={styles.sidebar}>
        <div style={styles.brand}>
          <div style={styles.brandIcon}>☕</div>
          <div>
            <strong style={styles.brandName}>Grão & Prosa</strong>
            <small style={styles.brandCaption}>PAINEL DA CAFETERIA</small>
          </div>
        </div>

        <div style={styles.navLabel}>MENU PRINCIPAL</div>

        <button
          style={styles.navActive}
          onClick={() => setScreen("home")}
        >
          <span>▦</span> Visão geral
        </button>

        <button
          style={styles.navButton}
          onClick={() => setScreen("new")}
        >
          <span>＋</span> Novo produto
        </button>

        <div style={styles.sidebarBottom}>
          <div style={styles.userAvatar}>A</div>

          <div style={{ flex: 1 }}>
            <strong style={{ display: "block", fontSize: 13 }}>
              Administrador
            </strong>
            <small style={{ color: "#b8a99b" }}>
              Acesso à loja
            </small>
          </div>

          <button
            title="Sair"
            style={styles.logout}
            onClick={() => setLoggedIn(false)}
          >
            ↪
          </button>
        </div>
      </aside>

      <main style={styles.main}>
        <header style={styles.topbar}>
          <div>
            <span style={styles.breadcrumb}>Cafeteria / </span>
            <strong>
              {screen === "home"
                ? "Visão geral"
                : screen === "new"
                ? "Novo produto"
                : "Editar produto"}
            </strong>
          </div>

          <div style={styles.topRight}>
            <span style={styles.statusDot} />
            Loja aberta
            <div style={styles.topAvatar}>A</div>
          </div>
        </header>

        {screen === "home" && (
          <Home
            products={products}
            onNew={() => setScreen("new")}
            onEdit={(product) => {
              setSelectedProduct(product);
              setScreen("edit");
            }}
            onDelete={handleDelete}
          />
        )}

        {screen === "new" && (
          <ProductForm
            title="Adicionar produto"
            description="Preencha as informações para incluir um item no cardápio."
            onCancel={() => setScreen("home")}
            onSave={handleCreate}
          />
        )}

        {screen === "edit" && selectedProduct && (
          <ProductForm
            title="Editar produto"
            description="Atualize as informações deste item do cardápio."
            initialProduct={selectedProduct}
            onCancel={() => setScreen("home")}
            onSave={handleUpdate}
          />
        )}
      </main>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  app: {
    minHeight: "100vh",
    display: "flex",
    background: "#f7f5f1",
    color: "#302820",
    fontFamily: "Arial, sans-serif",
  },
  sidebar: {
    width: 248,
    background: "#30251f",
    color: "#fff",
    padding: "28px 18px",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "0 8px 38px",
  },
  brandIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    background: "#c78b55",
    display: "grid",
    placeItems: "center",
    fontSize: 23,
  },
  brandName: {
    display: "block",
    fontSize: 17,
  },
  brandCaption: {
    color: "#b8a99b",
    fontSize: 9,
    letterSpacing: 1.4,
  },
  navLabel: {
    color: "#9d8d80",
    fontSize: 10,
    fontWeight: 700,
    padding: "0 10px 12px",
  },
  navActive: {
    background: "#514035",
    color: "#fff",
    border: 0,
    borderRadius: 9,
    padding: "13px 14px",
    textAlign: "left",
    fontSize: 14,
    display: "flex",
    gap: 12,
    cursor: "pointer",
    marginBottom: 7,
  },
  navButton: {
    background: "transparent",
    color: "#d8ccc2",
    border: 0,
    borderRadius: 9,
    padding: "13px 14px",
    textAlign: "left",
    fontSize: 14,
    display: "flex",
    gap: 12,
    cursor: "pointer",
  },
  sidebarBottom: {
    marginTop: "auto",
    borderTop: "1px solid #51463f",
    padding: "20px 5px 0",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  userAvatar: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    background: "#c78b55",
    display: "grid",
    placeItems: "center",
    fontWeight: 700,
  },
  logout: {
    background: "transparent",
    border: 0,
    color: "#cbbeb3",
    cursor: "pointer",
    fontSize: 22,
  },
  main: {
    flex: 1,
    minWidth: 0,
  },
  topbar: {
    height: 72,
    background: "#fff",
    borderBottom: "1px solid #eee8e2",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 38px",
  },
  breadcrumb: {
    color: "#9b9188",
    fontSize: 13,
  },
  topRight: {
    display: "flex",
    alignItems: "center",
    gap: 9,
    fontSize: 12,
    color: "#6c625a",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#54a477",
  },
  topAvatar: {
    marginLeft: 12,
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: "#ead9c8",
    color: "#704c32",
    display: "grid",
    placeItems: "center",
    fontWeight: 700,
  },
};