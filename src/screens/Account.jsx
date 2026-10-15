// lib/pages/account/account_screen.dart
import { Editable } from '../components/editable';
import { HistoricCard, LabelButton, NuAppBar } from '../components/widgets';
import { Icon, Mdi, Nu, React_ } from '../icons';
import { MockedValues, useNav } from '../state';
import './screens.css';

export default function Account() {
  const { push, showBottomSheet } = useNav();

  return (
    <div>
      <NuAppBar actions={[{ icon: Mdi.helpCircleOutline, label: 'Ajuda' }]} />

      <section style={{ padding: 20 }}>
        <div style={{ height: 20 }} />
        <span className="title-small w500">Saldo disponível</span>
        <div className="display-small" style={{ marginTop: 7 }}>
          <Editable field="balance" kind="money" label="saldo" />
        </div>

        <div style={{ height: 50 }} />
        <AccountMenu title="Dinheiro guardado" icon={React_.piggyBank}>
          <span className="body-medium w500" style={{ fontSize: 16 }}>R$ {MockedValues.saved}</span>
        </AccountMenu>
        <div style={{ height: 38 }} />
        <AccountMenu title="Rendimento total da conta" icon={Mdi.signal}>
          <span className="title-medium w500 c-limit">
            +R$ {MockedValues.income}
            <span className="w400 c-text"> este mês</span>
          </span>
        </AccountMenu>
      </section>

      <div className="hscroll" style={{ padding: '15px 0 0 20px' }}>
        <LabelButton label="Depositar" icon={React_.cash} onPressed={() => showBottomSheet('Deposit')} />
        <LabelButton label="Pagar" icon={Mdi.barcode} onPressed={() => showBottomSheet('Payment')} />
        <LabelButton label="Transferir" icon={Mdi.cubeSend} onPressed={() => showBottomSheet('Transfer')} />
        <LabelButton label="Empréstimos" icon={React_.bank} onPressed={() => push('Loan')} />
        <LabelButton label="Cobrar" icon={Mdi.messageAlertOutline} onPressed={() => showBottomSheet('Charge')} />
        <div style={{ flex: '0 0 20px' }} />
      </div>

      <div className="divider" style={{ marginTop: 25 }} />

      <h2 className="title-large w500" style={{ margin: '50px 20px 30px' }}>Histórico</h2>
      <HistoricCard title="Transferência enviada" subTitle="Ricardo Dalarme de Oliveira Filho" icon={Mdi.cubeSend} />
      <HistoricCard title="Transferência enviada" subTitle="Ricardo Dalarme" icon={Mdi.cubeSend} />
      <HistoricCard title="Transferência enviada" subTitle="Ricardo Dalarme" icon={Mdi.cubeSend} />
    </div>
  );
}

// lib/pages/account/widgets/account_menu.dart
function AccountMenu({ title, icon, children }) {
  return (
    <button className="account-menu">
      <Icon icon={icon} />
      <div className="col" style={{ flex: 1, gap: 7 }}>
        <span className="title-small">{title}</span>
        {children}
      </div>
      <Icon icon={Nu.abc_ic_go_search_api_material} color="var(--secondary-text)" />
    </button>
  );
}
