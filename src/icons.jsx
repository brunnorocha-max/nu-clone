// Ícones usados pelo app original:
// - NuIcons.ttf (lib/constants/nu_icons.dart) → componente NuIcon pelo codepoint
// - material_design_icons_flutter (MdiIcons) → @mdi/js
// - bootstrap_icons e Icons do Material → react-icons
import {
  mdiArrangeSendToBack,
  mdiArrowRight,
  mdiBarcode,
  mdiCubeSend,
  mdiHeartOutline,
  mdiHelpCircleOutline,
  mdiKeyChain,
  mdiMessageAlertOutline,
  mdiSignal,
  mdiTuneVariant,
} from '@mdi/js';
import { BsBank, BsCash, BsPerson, BsPiggyBank } from 'react-icons/bs';
import {
  MdClose,
  MdOutlineEdit,
  MdHelpOutline,
  MdOutlineForwardToInbox,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdQrCode,
} from 'react-icons/md';

export const Nu = {
  rewards_ic_empty_state_other: 0xe86c,
  ic_savings_global_action_pay: 0xe959,
  ic_savings_global_action_transfer_out: 0xe95d,
  ic_savings_global_action_transfer_in: 0xe95c,
  nuds_ic_personal_loan: 0xe833,
  nuds_ic_request_money: 0xe83d,
  nuds_ic_receipt: 0xe838,
  nuds_ic_chevron_left: 0xe807,
  nuds_ic_search: 0xe841,
  nuds_ic_list: 0xe828,
  ic_phone: 0xe935,
  ic_card_nu: 0xe8e2,
  ic_virtual_card: 0xe96e,
  ic_virtual_card_blocked: 0xe970,
  ic_refer_friend: 0xe93d,
  cc_ic_limit_adjustment: 0xe8b0,
  abc_ic_go_search_api_material: 0xe88f,
  help: 0xe8c1,
  close: 0xe8b8,
};

export const Mdi = {
  arrangeSendToBack: mdiArrangeSendToBack,
  arrowRight: mdiArrowRight,
  barcode: mdiBarcode,
  cubeSend: mdiCubeSend,
  heartOutline: mdiHeartOutline,
  helpCircleOutline: mdiHelpCircleOutline,
  keyChain: mdiKeyChain,
  messageAlertOutline: mdiMessageAlertOutline,
  signal: mdiSignal,
  tuneVariant: mdiTuneVariant,
};

export const React_ = {
  person: BsPerson,
  piggyBank: BsPiggyBank,
  cash: BsCash,
  bank: BsBank,
  visibility: MdOutlineVisibility,
  visibilityOff: MdOutlineVisibilityOff,
  help: MdHelpOutline,
  forwardToInbox: MdOutlineForwardToInbox,
  close: MdClose,
  edit: MdOutlineEdit,
  qrCode: MdQrCode,
};

/**
 * Ícone genérico. `icon` pode ser:
 *  - número (codepoint do NuIcons)
 *  - string (path SVG do MDI)
 *  - componente React (react-icons)
 */
export function Icon({ icon, color, size = 24, className = '' }) {
  const style = { color, width: size, height: size, fontSize: size };

  if (typeof icon === 'number') {
    return (
      <span className={`icon nu-icon ${className}`} style={style} aria-hidden="true">
        {String.fromCodePoint(icon)}
      </span>
    );
  }
  if (typeof icon === 'string') {
    return (
      <span className={`icon ${className}`} style={style} aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d={icon} fill="currentColor" />
        </svg>
      </span>
    );
  }
  const Cmp = icon;
  return (
    <span className={`icon ${className}`} style={style} aria-hidden="true">
      <Cmp />
    </span>
  );
}
