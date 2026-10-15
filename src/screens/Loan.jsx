// lib/pages/loan/loan_screen.dart
import { Editable } from '../components/editable';
import { NuAppBar, NuOutlinedButton } from '../components/widgets';
import { Mdi } from '../icons';

export default function Loan() {
  return (
    <div>
      <NuAppBar actions={[{ icon: Mdi.helpCircleOutline, label: 'Ajuda' }]} />

      <section style={{ padding: '30px 25px 20px' }}>
        <h1 className="title-large" style={{ margin: 0, lineHeight: 1.3 }}>
          O valor disponível no momento é de <Editable field="loan" kind="money" label="valor do empréstimo" />
        </h1>
        <p className="title-small" style={{ margin: '15px 0 0', lineHeight: 1.3 }}>
          Este valor pode mudar diariamente devido à nossa análise de crédito.
        </p>
        <p className="body-medium c-primary" style={{ margin: '20px 0 45px' }}>Entenda como funciona &gt;</p>
        <NuOutlinedButton>Novo empréstimo</NuOutlinedButton>
      </section>

      <div className="divider" />
      <p className="title-small" style={{ textAlign: 'center', marginTop: 30 }}>
        Você não possui nenhum empréstimo ativo.
      </p>
    </div>
  );
}
