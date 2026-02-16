/**
 * COMPONENTE: Header
 *
 * Muestra el título y descripción de la aplicación.
 * Adaptado al dominio de logística y transporte.
 */

const Header: React.FC = () => {
  return (
    <header className="header">
      {/* Título adaptado */}
      <h1>📦 Sistema de Seguimiento de Paquetes</h1>

      {/* Descripción adaptada */}
      <p>
        Gestiona envíos, destinatarios y estados de entrega con React + TypeScript
      </p>
    </header>
  );
};

export default Header;
