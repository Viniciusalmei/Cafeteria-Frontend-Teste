import { useState } from "react";
import type { CSSProperties } from "react";

type LoginProps = {
  onLogin: () => void;
};

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    onLogin();
  }

  return (
    <div style={styles.page}>
      <section style={styles.panel}>
        <div style={styles.logo}>☕</div>

        <p style={styles.eyebrow}>BEM-VINDO DE VOLTA</p>

        <h1 style={styles.title}>Grão & Prosa</h1>

        <p style={styles.subtitle}>
          Entre para gerenciar sua cafeteria.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>E-mail</label>

          <input
            data-cy="email"
            style={styles.input}
            type="email"
            placeholder="seuemail@exemplo.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label style={styles.label}>Senha</label>

          <input
            data-cy="password"
            style={styles.input}
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button
            data-cy="login-button"
            type="submit"
            style={styles.button}
          >
            Entrar no painel <span>→</span>
          </button>
        </form>

        <p style={styles.footer}>
          Sistema de gerenciamento • Cafeteria
        </p>
      </section>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: 20,
    background: "linear-gradient(135deg, #30251f, #60452f)",
  },
  panel: {
    width: "100%",
    maxWidth: 420,
    boxSizing: "border-box",
    background: "#fff",
    borderRadius: 18,
    padding: "42px 42px 30px",
    boxShadow: "0 22px 70px #160d0870",
  },
  logo: {
    width: 54,
    height: 54,
    borderRadius: 16,
    background: "#f3e7dc",
    display: "grid",
    placeItems: "center",
    fontSize: 28,
    marginBottom: 27,
  },
  eyebrow: {
    color: "#b27a4c",
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: 1.8,
    margin: "0 0 8px",
  },
  title: {
    fontSize: 29,
    color: "#30251f",
    margin: "0 0 8px",
  },
  subtitle: {
    color: "#8a817a",
    fontSize: 14,
    margin: "0 0 28px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: 700,
    color: "#55483e",
    marginTop: 7,
  },
  input: {
    border: "1px solid #e7e0da",
    borderRadius: 9,
    padding: "13px 14px",
    fontSize: 14,
  },
  button: {
    marginTop: 15,
    background: "#9b633b",
    color: "#fff",
    border: 0,
    borderRadius: 9,
    padding: 14,
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 14,
  },
  footer: {
    textAlign: "center",
    color: "#aaa19a",
    fontSize: 11,
    margin: "27px 0 0",
  },
};