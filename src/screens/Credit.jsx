// lib/pages/credit/credit_screen.dart
import { Editable } from '../components/editable';
import { HistoricCard, NuAppBar } from '../components/widgets';
import { Icon, Mdi, Nu, React_ } from '../icons';
import { useAppState, useNav } from '../state';
import './screens.css';

export default function Credit() {
  const { showBottomSheet } = useNav();
  const { editMode, toggleEditMode } = useAppState();

  const menu = [
    { title: 'Pagar fatura', icon: Nu.ic_savings_global_action_pay, onTap: () => showBottomSheet('Payment') },
    { title: 'Resumo de faturas', icon: Nu.nuds_ic_list },
    { title: 'Ajustar limites', icon: Nu.cc_ic_limit_adjustment },
    { title: 'Cartão virtual', icon: Nu.ic_virtual_card },
    { title: 'Bloquear cartão', icon: Nu.ic_virtual_card_blocked, onTap: () => showBottomSheet('Block') },
    { title: 'Indicar amigos', icon: Nu.ic_refer_friend, onTap: () => showBottomSheet('Refer') },
  ];

  return (
    <div>
      <NuAppBar
        actions={[
          {
            icon: React_.edit,
            label: editMode ? 'Sair do modo edição' : 'Modo edição',
            color: editMode ? 'var(--primary)' : 'var(--secondary-text)',
            onClick: toggleEditMode,
          },
          { icon: Nu.nuds_ic_search, label: 'Buscar' },
          { icon: Nu.help, label: 'Ajuda' },
        ]}
      />

      <section className="credit-summary">
        <div className="col">
          <span className="body-small">Fatura atual</span>
          <span className="headline-small c-invoice" style={{ marginTop: 13 }}>
            <Editable field="invoice" kind="money" label="fatura atual" />
          </span>
          <span className="body-medium" style={{ marginTop: 5 }}>
            Limite disponível <b className="c-limit">
              <Editable field="limit" kind="money" label="limite disponível" />
            </b>
          </span>
        </div>
        <div className="credit-bar" aria-hidden="true">
          <div style={{ height: 300, background: 'var(--limit)', borderRadius: '10px 10px 0 0' }} />
          <div style={{ height: 50, background: 'var(--invoice)' }} />
          <div style={{ height: 150, background: 'var(--next-invoice)', borderRadius: '0 0 10px 10px' }} />
        </div>
      </section>

      <div className="credit-menu-line" style={{ marginTop: 35 }} />
      <div className="hscroll">
        {menu.map((m, i) => (
          <div key={m.title} className="row" style={{ alignItems: 'stretch' }}>
            {i > 0 && <div className="credit-menu-sep" />}
            <button className="credit-menu ripple" onClick={m.onTap}>
              <Icon icon={m.icon} color="var(--primary)" size={25} />
              <span className="label-large w400">{m.title}</span>
            </button>
          </div>
        ))}
      </div>
      <div className="credit-menu-line" />

      <CreditTransactions />
    </div>
  );
}

// Extrato do cartão: no modo edição dá para trocar o lugar e o valor de cada
// transação, remover e adicionar novas
function CreditTransactions() {
  const { editMode, profile, setField } = useAppState();
  const transactions = profile.creditTransactions;

  const update = (id, patch) =>
    setField('creditTransactions', transactions.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  const remove = (id) => setField('creditTransactions', transactions.filter((t) => t.id !== id));
  const add = () =>
    setField('creditTransactions', [
      { id: Date.now(), title: 'Nova compra', detail: '', value: '0,00' },
      ...transactions,
    ]);

  return (
    <div style={{ background: 'var(--label-button)', paddingTop: 20, minHeight: 120 }}>
      {editMode && (
        <button className="credit-add" onClick={add}>
          + Adicionar transação
        </button>
      )}
      {transactions.map((t) => (
        <HistoricCard
          key={t.id}
          icon={Mdi.cubeSend}
          title={<Editable value={t.title} onSave={(title) => update(t.id, { title })} label="nome do lugar" />}
          subTitle={t.detail}
          value={<Editable value={t.value} onSave={(value) => update(t.id, { value })} kind="money" label="valor da transação" />}
          onRemove={editMode ? () => remove(t.id) : undefined}
        />
      ))}
    </div>
  );
}
