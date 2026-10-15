// Edição direto na tela: campos de texto/valor e foto de perfil.
// Só ficam editáveis com o modo edição ligado (lápis no topo da home).
import { useRef, useState } from 'react';
import { Icon, React_ } from '../icons';
import { useAppState } from '../state';
import { formatMoney } from './widgets';
import './editable.css';

/**
 * Mostra profile[field] (ou `value`, salvando por `onSave`).
 * No modo edição, um clique vira um input no mesmo lugar.
 * kind="money" → valor guardado como "1.234,56" e exibido como "R$ 1.234,56".
 */
export function Editable({ field, value: valueProp, onSave, kind = 'text', label }) {
  const { editMode, profile, setField } = useAppState();
  const [draft, setDraft] = useState(null);
  const value = field ? profile[field] : valueProp;
  const save = onSave ?? ((v) => setField(field, v));
  const display = kind === 'money' ? `R$ ${value}` : value;

  if (!editMode) return <span>{display}</span>;

  const stop = (e) => {
    // impede que o card em volta navegue para outra tela
    e.stopPropagation();
    e.preventDefault();
  };

  if (draft === null) {
    return (
      <span
        className="editable"
        role="button"
        tabIndex={0}
        aria-label={`Editar ${label}`}
        onClick={(e) => {
          stop(e);
          setDraft(display);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            stop(e);
            setDraft(display);
          }
        }}
      >
        {display}
      </span>
    );
  }

  const commit = () => {
    if (kind === 'money') save(draft.replace(/^R\$\s*/, ''));
    else if (draft.trim()) save(draft.trim());
    setDraft(null);
  };

  return (
    <input
      className="editable-input"
      autoFocus
      value={draft}
      maxLength={kind === 'money' ? 20 : 24}
      inputMode={kind === 'money' ? 'numeric' : 'text'}
      aria-label={label}
      style={{ width: `${Math.max(draft.length, 3) + 1}ch` }}
      onFocus={(e) => e.target.select()}
      onClick={stop}
      onChange={(e) => setDraft(kind === 'money' ? formatMoney(e.target.value) : e.target.value)}
      onKeyDown={(e) => {
        e.stopPropagation();
        if (e.key === 'Enter') commit();
        if (e.key === 'Escape') setDraft(null);
      }}
      onBlur={commit}
    />
  );
}

/**
 * Botão redondo do topo (CircleButton). Clicar abre o seletor de imagem:
 * no iPhone o sistema oferece Fototeca / Tirar foto / Escolher arquivo.
 */
export function Avatar() {
  const { profile, setField, editMode } = useAppState();
  const inputRef = useRef(null);

  const onPick = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      setField('photo', await squareThumbnail(file, 320));
    } catch {
      alert('Não foi possível abrir essa imagem. Tente uma foto JPG ou PNG.');
    }
  };

  return (
    <div className="avatar-wrap">
      <button className="circle-button avatar" onClick={() => inputRef.current.click()} aria-label="Trocar foto de perfil">
        {profile.photo ? <img src={profile.photo} alt="" /> : <Icon icon={React_.person} color="#fff" />}
      </button>
      {editMode && profile.photo && (
        <button className="avatar-remove" onClick={() => setField('photo', null)} aria-label="Remover foto">
          <Icon icon={React_.close} size={14} color="#fff" />
        </button>
      )}
      <input ref={inputRef} type="file" accept="image/*" hidden onChange={onPick} />
    </div>
  );
}

// Recorta o centro da imagem e reduz, para caber no armazenamento do navegador
async function squareThumbnail(file, size) {
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });
    const side = Math.min(img.naturalWidth, img.naturalHeight);
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    canvas
      .getContext('2d')
      .drawImage(img, (img.naturalWidth - side) / 2, (img.naturalHeight - side) / 2, side, side, 0, 0, size, size);
    return canvas.toDataURL('image/jpeg', 0.85);
  } finally {
    URL.revokeObjectURL(url);
  }
}

/** Barra flutuante enquanto o modo edição está ligado */
export function EditBar() {
  const { editMode, toggleEditMode, resetProfile } = useAppState();
  if (!editMode) return null;
  return (
    <div className="edit-bar" role="status">
      <span className="edit-bar__text">
        <Icon icon={React_.edit} size={18} color="#fff" />
        Modo edição
      </span>
      <button
        className="edit-bar__link"
        onClick={() => confirm('Voltar todos os valores, o nome e a foto ao padrão?') && resetProfile()}
      >
        Restaurar
      </button>
      <button className="edit-bar__done" onClick={toggleEditMode}>
        Concluir
      </button>
    </div>
  );
}
