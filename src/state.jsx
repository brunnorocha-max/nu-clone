import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

// lib/constants/mocked_values.dart
export const MockedValues = {
  username: 'Ricardo',
  limit: '806,78',
  balance: '181,79',
  saved: '240,02',
  invoice: '780,72',
  loan: '10.000,00',
  income: '0,20',
};

// Campos que o usuário pode editar no modo edição (salvos no navegador)
const DEFAULT_PROFILE = {
  photo: null,
  username: MockedValues.username,
  balance: MockedValues.balance,
  loan: MockedValues.loan,
  invoice: MockedValues.invoice,
  limit: MockedValues.limit,
  // extrato da tela do cartão (lib/pages/credit/credit_screen.dart)
  creditTransactions: [
    { id: 1, title: 'Pagamento recebido', detail: 'Você pagou R$ 50,00', value: '30,00' },
    { id: 2, title: 'Supermercado', detail: 'Ricardo Dalarme', value: '30,00' },
    { id: 3, title: 'Transferência enviada', detail: 'Ricardo Dalarme', value: '30,00' },
  ],
};
const STORAGE_KEY = 'nubank-clone:profile';

function loadProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { ...DEFAULT_PROFILE, ...saved };
  } catch {
    return DEFAULT_PROFILE;
  }
}

// lib/core/app_state.dart — mostrar/ocultar valores (+ perfil editável)
const AppStateContext = createContext(null);

export function AppStateProvider({ children }) {
  const [viewValues, setViewValues] = useState(true);
  const switchView = useCallback(() => setViewValues((v) => !v), []);

  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = useCallback(() => setEditMode((v) => !v), []);

  const [profile, setProfile] = useState(loadProfile);
  const setField = useCallback((field, value) => setProfile((p) => ({ ...p, [field]: value })), []);
  const resetProfile = useCallback(() => setProfile(DEFAULT_PROFILE), []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // armazenamento indisponível (aba anônima, cota cheia): segue só em memória
    }
  }, [profile]);

  return (
    <AppStateContext.Provider
      value={{ viewValues, switchView, editMode, toggleEditMode, profile, setField, resetProfile }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export const useAppState = () => useContext(AppStateContext);

// lib/utils/extensions/router_context_extension.dart
// push()  → nova tela deslizando da direita
// showBottomSheet() → modal que sobe de baixo
// pop()   → fecha o topo (também funciona com o botão "voltar" do navegador)
const NavContext = createContext(null);
let nextId = 1;

export function NavigatorProvider({ home, screens, children }) {
  const [stack, setStack] = useState([{ id: 0, name: home }]);
  const [sheets, setSheets] = useState([]);
  const [leaving, setLeaving] = useState(null);
  const stateRef = useRef({ stack, sheets });
  stateRef.current = { stack, sheets };

  const push = useCallback((name, props = {}) => {
    window.history.pushState({ nav: true }, '');
    setStack((s) => [...s, { id: nextId++, name, props }]);
  }, []);

  const showBottomSheet = useCallback((name, props = {}) => {
    window.history.pushState({ nav: true }, '');
    setSheets((s) => [...s, { id: nextId++, name, props }]);
  }, []);

  const pop = useCallback(() => window.history.back(), []);

  useEffect(() => {
    const onPop = () => {
      const { stack: st, sheets: sh } = stateRef.current;
      const top = sh.length ? sh[sh.length - 1] : st.length > 1 ? st[st.length - 1] : null;
      if (!top) return;
      setLeaving(top.id);
      setTimeout(() => {
        if (sh.length) setSheets((s) => s.filter((x) => x.id !== top.id));
        else setStack((s) => s.filter((x) => x.id !== top.id));
        setLeaving(null);
      }, 280);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  return (
    <NavContext.Provider value={{ push, pop, showBottomSheet }}>
      {stack.map((entry, i) => {
        const Screen = screens[entry.name];
        const cls = ['screen', i > 0 ? 'enter' : '', leaving === entry.id ? 'leave' : ''].join(' ');
        return (
          <div key={entry.id} className={cls} style={{ zIndex: i + 1 }}>
            <Screen {...entry.props} />
          </div>
        );
      })}
      {sheets.map((entry) => {
        const Screen = screens[entry.name];
        const full = Screen.fullHeight !== false;
        return (
          <div
            key={entry.id}
            className={`sheet-backdrop ${leaving === entry.id ? 'leave' : ''}`}
            onClick={(e) => e.target === e.currentTarget && pop()}
          >
            <div className={`sheet ${full ? 'full' : ''}`} role="dialog" aria-modal="true">
              <Screen {...entry.props} />
            </div>
          </div>
        );
      })}
      {children}
    </NavContext.Provider>
  );
}

export const useNav = () => useContext(NavContext);
