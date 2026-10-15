// lib/pages/easyinvest/easyinvest_screen.dart
import { NuAppBar } from '../components/widgets';
import { Icon, Mdi } from '../icons';
import './screens.css';

export default function EasyInvest() {
  return (
    <div className="col" style={{ minHeight: '100%' }}>
      <NuAppBar />
      <section style={{ padding: '20px 25px', flex: 1 }}>
        <img src="./images/easyinvest.jpg" alt="" style={{ height: 118 }} />
        <h1 className="headline-medium" style={{ marginTop: 47 }}>Invista sem taxas e burocracia!</h1>
        <p className="title-medium w300" style={{ margin: '10px 0 0', lineHeight: 1.35 }}>
          Estamos convidando alguns clientes do Nubank para serem os primeiros a fazer parte desta revolução roxa
          nos investimentos, e você é um deles!
        </p>
        <p className="title-medium w300" style={{ margin: '25px 0 0', lineHeight: 1.35 }}>
          Além de não pagar nada para abrir a conta, você terá taxa zero na corretagem de ações!
        </p>
      </section>
      <button className="fab" aria-label="Continuar">
        <Icon icon={Mdi.arrowRight} color="#fff" />
      </button>
    </div>
  );
}
