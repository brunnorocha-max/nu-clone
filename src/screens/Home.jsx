// lib/pages/home/home_screen.dart + home/cards/* + home/widgets/*
import { Avatar, Editable } from '../components/editable';
import { FilledChip, LabelButton } from '../components/widgets';
import { Icon, Mdi, Nu, React_ } from '../icons';
import { useAppState, useNav } from '../state';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      <Header />
      <Body />
    </div>
  );
}

function Header() {
  const { viewValues, switchView, editMode, toggleEditMode } = useAppState();
  const { showBottomSheet } = useNav();

  return (
    <header className="home-header">
      <div className="row between">
        <Avatar />
        <div className="row">
          <button
            className={`icon-btn on-primary ${editMode ? 'is-active' : ''}`}
            onClick={toggleEditMode}
            aria-label={editMode ? 'Sair do modo edição' : 'Modo edição'}
            aria-pressed={editMode}
          >
            <Icon icon={React_.edit} color="#fff" />
          </button>
          <button className="icon-btn on-primary" onClick={switchView} aria-label={viewValues ? 'Ocultar valores' : 'Mostrar valores'}>
            <Icon icon={viewValues ? React_.visibility : React_.visibilityOff} color="#fff" />
          </button>
          <button className="icon-btn on-primary" aria-label="Ajuda">
            <Icon icon={React_.help} color="#fff" />
          </button>
          <button className="icon-btn on-primary" onClick={() => showBottomSheet('Refer')} aria-label="Indicar amigos">
            <Icon icon={React_.forwardToInbox} color="#fff" />
          </button>
        </div>
      </div>
      <h1 className="title-medium w600 c-white home-header__hello">
        Olá, <Editable field="username" label="nome" />
      </h1>
    </header>
  );
}

function Body() {
  const { push, showBottomSheet } = useNav();

  return (
    <main className="home-body">
      <AccountCard />

      <div className="hscroll home-actions">
        <LabelButton label="Pix" icon={Nu.rewards_ic_empty_state_other} onPressed={() => showBottomSheet('Pix')} />
        <LabelButton label="Pagar" icon={Nu.ic_savings_global_action_pay} onPressed={() => showBottomSheet('Payment')} />
        <LabelButton label="Transferir" icon={Nu.ic_savings_global_action_transfer_out} onPressed={() => showBottomSheet('Transfer')} />
        <LabelButton label="Depositar" icon={Nu.ic_savings_global_action_transfer_in} onPressed={() => showBottomSheet('Deposit')} />
        <LabelButton label="Empréstimos" icon={Nu.nuds_ic_personal_loan} onPressed={() => push('Loan')} />
        <LabelButton label="Recarga de celular" icon={Nu.ic_phone} onPressed={() => showBottomSheet('Recharge')} />
        <LabelButton label="Cobrar" icon={Nu.nuds_ic_request_money} onPressed={() => showBottomSheet('Charge')} />
        <LabelButton label="Doação" icon={Nu.nuds_ic_personal_loan} onPressed={() => {}} />
        <LabelButton label="Encontrar atalhos" icon={Nu.help} onPressed={() => {}} tag="Dica" />
      </div>

      <div className="home-my-cards">
        <button className="home-my-cards__btn ripple">
          <Icon icon={Nu.ic_card_nu} color="var(--text)" />
          <span className="w500" style={{ fontSize: 13 }}>Meus cartões</span>
        </button>
      </div>

      <div className="hscroll home-text-cards">
        <TextCard highlight="empréstimo." onTap={() => push('Loan')}>
          Você tem <Editable field="loan" kind="money" label="valor do empréstimo" /> disponíveis para{' '}
        </TextCard>
        <TextCard highlight="guardar dinheiro." onTap={() => {}}>
          Conquiste planos futuros: conheça as opções para{' '}
        </TextCard>
      </div>

      <div className="divider thin" style={{ marginTop: 20 }} />

      <CreditCard />
      <LoanCard />
      <InvestmentsCard />
      <InsuranceCard />

      <h2 className="title-large w500 home-discover-title">Descubra mais</h2>
      <div className="hscroll home-discover">
        <DiscoverCard
          title="WhatsApp"
          content="Pagamentos seguros, rápidos e sem tarifa. A experiência Nubank sem nem sair da conversa."
          buttonText="Quero conhecer"
          isNew
          onTap={() => {}}
        />
        <DiscoverCard
          title="Indique seus amigos"
          content="Mostre aos seus amigos como é fácil ter uma vida sem burocracia."
          buttonText="Indicar amigos"
          onTap={() => showBottomSheet('Refer')}
        />
      </div>
    </main>
  );
}

/* ---------- home/widgets/main_card.dart ---------- */
function MainCard({ title, icon, children, hideDivider, onTap }) {
  return (
    <>
      <div className="main-card ripple" {...pressable(onTap)}>
        {icon && <Icon icon={icon} />}
        <div className="row between main-card__title">
          <span className="title-large w500">{title}</span>
          <Icon icon={Nu.abc_ic_go_search_api_material} />
        </div>
        <div className="main-card__body">{children}</div>
      </div>
      {!hideDivider && <div className="divider thin" />}
    </>
  );
}

const Hidden = ({ height }) => <div className="placeholder" style={{ height }} />;

// Cards clicáveis viram <div role="button"> para poder conter os campos editáveis
const pressable = (onTap) => ({
  role: 'button',
  tabIndex: 0,
  onClick: onTap,
  onKeyDown: (e) => {
    if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onTap();
    }
  },
});

/* ---------- home/cards/*.dart ---------- */
function AccountCard() {
  const { viewValues } = useAppState();
  const { push } = useNav();
  return (
    <MainCard title="Conta" hideDivider onTap={() => push('Account')}>
      {viewValues ? <span className="headline-small"><Editable field="balance" kind="money" label="saldo" /></span> : <Hidden height={29} />}
    </MainCard>
  );
}

function CreditCard() {
  const { viewValues } = useAppState();
  const { push } = useNav();
  return (
    <MainCard title="Cartão de Crédito" icon={Nu.ic_card_nu} onTap={() => push('Credit')}>
      <span className="title-small w600">Fatura atual</span>
      <div style={{ height: 13 }} />
      {viewValues ? (
        <>
          <span className="headline-small"><Editable field="invoice" kind="money" label="fatura atual" /></span>
          <span className="body-small w500" style={{ marginTop: 5 }}>
            Limite disponível <Editable field="limit" kind="money" label="limite disponível" />
          </span>
        </>
      ) : (
        <Hidden height={51} />
      )}
    </MainCard>
  );
}

function LoanCard() {
  const { viewValues } = useAppState();
  const { push } = useNav();
  return (
    <MainCard title="Empréstimo" icon={Nu.nuds_ic_personal_loan} onTap={() => push('Loan')}>
      {viewValues ? (
        <>
          <span className="body-small w500">Valor disponível de até</span>
          <span className="body-small w500" style={{ marginTop: 5 }}>
            <Editable field="loan" kind="money" label="valor do empréstimo" />
          </span>
        </>
      ) : (
        <Hidden height={39} />
      )}
    </MainCard>
  );
}

function InvestmentsCard() {
  const { push } = useNav();
  return (
    <MainCard title="Investimentos" icon={Mdi.signal} onTap={() => push('EasyInvest')}>
      <span className="body-small w500">
        A revolução roxa começou. Invista de maneira simples, sem burocracia e 100% digital.
      </span>
      <div style={{ height: 15 }} />
      <FilledChip>Conhecer</FilledChip>
    </MainCard>
  );
}

function InsuranceCard() {
  return (
    <MainCard title="Seguro de vida" icon={Mdi.heartOutline} onTap={() => {}}>
      <span className="body-small w500">Conheça Nubank Vida: um seguro simples e que cabe no bolso.</span>
    </MainCard>
  );
}

/* ---------- home/widgets/text_card.dart ---------- */
function TextCard({ children, highlight, onTap }) {
  return (
    <div className="text-card ripple" {...pressable(onTap)}>
      <span className="body-medium">
        {children}
        <span className="c-primary">{highlight}</span>
      </span>
    </div>
  );
}

/* ---------- home/widgets/discover_card.dart ---------- */
function DiscoverCard({ title, content, buttonText, isNew, onTap }) {
  return (
    <button className="discover-card ripple" onClick={onTap}>
      <div className="row" style={{ gap: 5 }}>
        <span className="title-medium w500 c-text">{title}</span>
        {isNew && <span className="discover-card__new">Novo</span>}
      </div>
      <p className="body-medium discover-card__content">{content}</p>
      <FilledChip>{buttonText}</FilledChip>
    </button>
  );
}
