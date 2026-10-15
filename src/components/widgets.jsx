// Equivalente a lib/widgets/* e widgets comuns das telas
import { useState } from 'react';
import { Icon, Nu, React_ } from '../icons';
import { useNav } from '../state';
import './widgets.css';

// lib/widgets/circle_button.dart
export function CircleButton({ icon, onTap, label }) {
  return (
    <button className="circle-button" onClick={onTap} aria-label={label}>
      <Icon icon={icon} color="#fff" />
    </button>
  );
}

// lib/widgets/filled_chip.dart
export function FilledChip({ children }) {
  return <span className="filled-chip">{children}</span>;
}

// lib/widgets/label_button.dart
export function LabelButton({ label, icon, onPressed, tag }) {
  return (
    <div className="label-button">
      <div className="label-button__circle-wrap">
        <button className="label-button__circle" onClick={onPressed} aria-label={label}>
          <Icon icon={icon} color="var(--text)" />
        </button>
        {tag && <span className="label-button__tag">{tag}</span>}
      </div>
      <span className="label-button__label">{label}</span>
    </div>
  );
}

// lib/widgets/nu_outlined_button.dart
export function NuOutlinedButton({ children, onClick }) {
  return (
    <button className="nu-outlined-button" onClick={onClick}>
      {children}
    </button>
  );
}

// lib/widgets/nu_input_field.dart (+ máscaras do flutter_masked_text2)
export function NuInputField({ mask, hint, autoFocus }) {
  const initial = mask === 'money' ? formatMoney('') : '';
  const [value, setValue] = useState(initial);

  const onChange = (e) => {
    const raw = e.target.value;
    if (mask === 'money') setValue(formatMoney(raw));
    else if (mask === 'phone') setValue(formatPhone(raw));
    else setValue(raw);
  };

  return (
    <div className="nu-input">
      <input
        className="display-small"
        value={value}
        onChange={onChange}
        placeholder={hint}
        autoFocus={autoFocus}
        inputMode={mask ? 'numeric' : 'text'}
      />
      <div className="divider thin" />
    </div>
  );
}

export function formatMoney(raw) {
  const digits = raw.replace(/\D/g, '').replace(/^0+/, '').slice(0, 13) || '0';
  const cents = digits.padStart(3, '0');
  const int = cents.slice(0, -2).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `R$ ${int},${cents.slice(-2)}`;
}

function formatPhone(raw) {
  const d = raw.replace(/\D/g, '').slice(0, 11);
  if (!d) return '';
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

// AppBar branca usada nas telas empilhadas (Conta, Crédito, Empréstimo…)
export function NuAppBar({ actions = [], leadingIcon = Nu.nuds_ic_chevron_left }) {
  const { pop } = useNav();
  return (
    <header className="app-bar">
      <button className="icon-btn" onClick={pop} aria-label="Voltar">
        <Icon icon={leadingIcon} color="var(--secondary-text)" />
      </button>
      <div className="actions">
        {actions.map(({ icon, label, color = 'var(--secondary-text)', onClick }) => (
          <button key={label} className="icon-btn" onClick={onClick} aria-label={label}>
            <Icon icon={icon} color={color} />
          </button>
        ))}
      </div>
    </header>
  );
}

// Botão "X" no topo dos bottom sheets
export function SheetClose({ material }) {
  const { pop } = useNav();
  return (
    <button className="icon-btn" onClick={pop} aria-label="Fechar" style={{ margin: material ? 4 : 0 }}>
      <Icon icon={material ? React_.close : Nu.close} color="var(--secondary-text)" />
    </button>
  );
}

// lib/pages/account/widgets/historic_card.dart
// title/value podem ser texto ou um campo <Editable>; onRemove mostra o botão de excluir
export function HistoricCard({ title, subTitle, icon, value = 'R$ 30,00', onRemove }) {
  return (
    <div className="historic-card">
      <div className="historic-card__row">
        <div className="historic-card__icon">
          <Icon icon={icon} />
        </div>
        <div className="col" style={{ flex: 1, minWidth: 0 }}>
          <div className="row between" style={{ gap: 8 }}>
            <span className="body-medium w500">{title}</span>
            <span className="row" style={{ gap: 8 }}>
              <span className="body-small">Ontem</span>
              {onRemove && (
                <button className="historic-card__remove" onClick={onRemove} aria-label="Remover transação">
                  <Icon icon={React_.close} size={16} color="var(--secondary-text)" />
                </button>
              )}
            </span>
          </div>
          {subTitle && (
            <span className="title-small" style={{ marginTop: 10, lineHeight: 1.6 }}>
              {subTitle.toUpperCase()}
            </span>
          )}
          <span className="title-small" style={{ marginTop: 5 }}>{value}</span>
          <span className="body-small" style={{ marginTop: 5 }}>Pix</span>
        </div>
      </div>
      <div className="divider unview" />
    </div>
  );
}

// Linha de menu genérica: PaymentMenu, DepositMenu, PixMenu, AccountMenu
export function MenuRow({ icon, iconColor = 'var(--secondary-text)', title, subTitle, children, className = '', onClick }) {
  return (
    <button className={`menu-row ripple ${className}`} onClick={onClick}>
      <Icon icon={icon} color={iconColor} />
      <div className="menu-row__text">
        {children ?? (
          <>
            <span className="body-medium w700">{title}</span>
            {subTitle && <span className="body-small">{subTitle}</span>}
          </>
        )}
      </div>
      <Icon icon={Nu.abc_ic_go_search_api_material} color="var(--secondary-text)" />
    </button>
  );
}
