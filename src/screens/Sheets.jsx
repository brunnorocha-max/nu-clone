// Telas abertas como bottom sheet (context.showBottomSheet no Flutter)
import { Editable } from '../components/editable';
import { LabelButton, MenuRow, NuInputField, NuOutlinedButton, SheetClose } from '../components/widgets';
import { Icon, Mdi, Nu, React_ } from '../icons';
import { useNav } from '../state';
import './screens.css';

// lib/pages/pix/pix_screen.dart
export function Pix() {
  return (
    <>
      <SheetClose />
      <div className="sheet-pad" style={{ flex: 1, paddingTop: 15 }}>
        <img src="./images/pix.jpg" alt="" style={{ height: 150 }} />
        <h1 className="headline-medium" style={{ marginTop: 30 }}>Minha área Pix</h1>
        <p className="title-medium" style={{ margin: '10px 0 45px' }}>
          Tudo o que você precisa para pagar, transferir ou cobrar.
        </p>
        <div className="row" style={{ justifyContent: 'space-around', alignItems: 'flex-start', marginBottom: 20 }}>
          <LabelButton label="Pagar" icon={Mdi.arrangeSendToBack} onPressed={() => {}} />
          <LabelButton label="Transferir" icon={Mdi.cubeSend} onPressed={() => {}} />
          <LabelButton label="Cobrar" icon={Mdi.messageAlertOutline} onPressed={() => {}} />
        </div>
      </div>
      <div className="divider" />
      {[
        ['Minhas chaves', Mdi.keyChain],
        ['Meu limite Pix', Mdi.tuneVariant],
        ['Me ajuda', Mdi.helpCircleOutline],
      ].map(([text, icon]) => (
        <MenuRow key={text} icon={icon} className="pix-menu">
          <span className="label-large">{text}</span>
        </MenuRow>
      ))}
    </>
  );
}

// lib/pages/payment/payment_screen.dart
export function Payment() {
  const items = [
    ['Pagar com Pix', 'Leia um QR Code ou cole o código.', Nu.rewards_ic_empty_state_other],
    ['Pagar fatura do cartão', 'Libera o limite do seu Cartão de Crédito.', Nu.ic_savings_global_action_pay],
    ['Pagar um boleto', 'Contas de luz, água, etc.', Nu.nuds_ic_receipt],
  ];
  return (
    <>
      <SheetClose />
      <div className="col" style={{ flex: 1, justifyContent: 'space-evenly', paddingTop: 10 }}>
        {items.map(([title, sub, icon], i) => (
          <div key={title}>
            {i > 0 && <div className="divider unview" />}
            <MenuRow title={title} subTitle={sub} icon={icon} iconColor="var(--primary)" />
          </div>
        ))}
      </div>
    </>
  );
}

// lib/pages/deposit/deposit_screen.dart
export function Deposit() {
  const items = [
    ['Pix', 'Sem custo e cai na hora, mesmo de madrugada e fim de semana.', Nu.rewards_ic_empty_state_other],
    ['Boleto', 'Sem custo e pode levar 3 dias úteis para o dinheiro cair.', Nu.ic_savings_global_action_pay],
    ['TED/DOC', 'Pode ter custo e cai somente em horário comercial de dias úteis.', Nu.nuds_ic_receipt],
    ['Trazer seu salário', 'Receba todo mês direto aqui na sua conta, sem custo.', Nu.ic_savings_global_action_transfer_in],
  ];
  return (
    <>
      <SheetClose />
      <h1 className="headline-medium sheet-pad" style={{ margin: '15px 0 10px' }}>
        Como você quer depositar na sua conta do Nubank
      </h1>
      {items.map(([title, sub, icon]) => (
        <div key={title}>
          <MenuRow title={title} subTitle={sub} icon={icon} className="deposit-menu" />
          <div className="divider unview" />
        </div>
      ))}
    </>
  );
}

// lib/pages/transfer/transfer_screen.dart
export function Transfer() {
  return (
    <>
      <header className="app-bar">
        <SheetClose material />
        <button className="icon-btn" aria-label="QR Code">
          <Icon icon={React_.qrCode} color="var(--primary)" />
        </button>
      </header>
      <div className="sheet-pad" style={{ paddingTop: 10 }}>
        <h1 className="headline-medium">Qual é o valor da transferência?</h1>
        <p className="body-medium" style={{ margin: '15px 0 32px' }}>
          Saldo disponível em conta <span className="body-large">
            <Editable field="balance" kind="money" label="saldo" />
          </span>
        </p>
        <NuInputField mask="money" autoFocus />
      </div>
    </>
  );
}

// lib/pages/recharge/recharge_screen.dart
export function Recharge() {
  return (
    <>
      <header className="app-bar">
        <SheetClose material />
      </header>
      <div className="sheet-pad" style={{ paddingTop: 10 }}>
        <h1 className="headline-small" style={{ textAlign: 'center', margin: '0 0 30px' }}>
          Qual número você quer recarregar?
        </h1>
        <NuInputField mask="phone" hint="(DDD) + Número" autoFocus />
      </div>
    </>
  );
}

// lib/pages/charge/charge_screen.dart
export function Charge() {
  return (
    <>
      <header className="app-bar">
        <SheetClose material />
      </header>
      <div className="sheet-pad">
        <h1 className="headline-medium" style={{ marginBottom: 30 }}>Qual valor você quer receber?</h1>
        <NuInputField mask="money" autoFocus />
        <p className="body-medium c-primary" style={{ marginTop: 20 }}>Não especificar um valor &gt;</p>
      </div>
    </>
  );
}

// lib/pages/refer/refer_screen.dart
export function Refer() {
  return (
    <>
      <SheetClose />
      <div className="sheet-pad" style={{ paddingTop: 15 }}>
        <h1 className="title-large" style={{ margin: 0 }}>Resgate seus amigos da fila do banco</h1>
        <p className="title-small" style={{ margin: '10px 0 20px' }}>
          Para cada indicação aceita, um amigo salvo da burocracia
        </p>
        <NuOutlinedButton>Indicar amigos</NuOutlinedButton>
        <img src="./images/refer_friend.jpg" alt="" style={{ width: '100%' }} />
      </div>
    </>
  );
}

// lib/pages/block/block_screen.dart
export function Block() {
  const { pop } = useNav();
  return (
    <div className="col" style={{ alignItems: 'center' }}>
      <div style={{ height: 40 }} />
      <Icon icon={Nu.ic_virtual_card_blocked} color="var(--secondary-text)" />
      <p className="body-medium" style={{ lineHeight: 1.8, textAlign: 'center', margin: '20px 50px 40px' }}>
        Você quer <b>bloquear temporariamente</b> o seu cartão?
      </p>
      <div className="divider" style={{ width: '100%' }} />
      <div className="row" style={{ width: '100%' }}>
        <button className="block-btn c-secondary" onClick={pop}>Cancelar</button>
        <div style={{ width: 1, height: 62, margin: '1px 0', background: 'var(--line)' }} />
        <button className="block-btn c-primary" onClick={pop}>Bloquear</button>
      </div>
    </div>
  );
}
Block.fullHeight = false;
