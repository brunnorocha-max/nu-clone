# Nubank Clone — versão web (React)

Reescrita em React + Vite do app Flutter [ricardodalarme/Nubank-Clone](https://github.com/ricardodalarme/Nubank-Clone).
Assim como o original, é **apenas para estudo**: logo, ícones (NuIcons), imagens e a fonte Gotham pertencem ao Nubank/donos das licenças e não devem ser publicados.

## Rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera a pasta dist/ (site estático)
```

## Modo edição

Toque no **lápis** no topo da home para ligar. Os itens editáveis piscam com contorno tracejado; toque para editar (Enter ou tocar fora salva, Esc cancela).

- **Foto:** toque no círculo do perfil (funciona sempre). No iPhone o sistema oferece Fototeca / Tirar foto / Escolher arquivo. No modo edição aparece um "×" para remover.
- **Nome**, **saldo**, **valor do empréstimo**, **fatura atual** e **limite disponível** — cada valor é o mesmo em todas as telas onde aparece.
- **Extrato do cartão** (tela do Cartão de Crédito): nome do lugar e valor de cada transação; "+ Adicionar transação" e "×" para remover. A tela do cartão também tem o lápis na barra superior.
- **Restaurar** (na barra de edição) volta tudo ao padrão.

As edições ficam no `localStorage` do navegador (chave `nubank-clone:profile`): valem só naquele navegador/aparelho e somem se os dados do site forem limpos. O código fica em `src/components/editable.jsx` e o estado em `src/state.jsx`.

## Mapa Flutter → React

| Flutter (`lib/`)                          | React (`src/`)                         |
| ----------------------------------------- | -------------------------------------- |
| `constants/app_colors.dart`, `theme/texts.dart` | `theme.css` (variáveis e classes de texto) |
| `constants/nu_icons.dart` + ícones MDI/Bootstrap | `icons.jsx`                      |
| `core/app_state.dart`, `constants/mocked_values.dart` | `state.jsx` (`useAppState`, `MockedValues`) |
| `utils/extensions/router_context_extension.dart` | `state.jsx` (`useNav`: `push`, `pop`, `showBottomSheet`) |
| `widgets/*`, `HistoricCard`, menus        | `components/widgets.jsx`               |
| `pages/home/*`                            | `screens/Home.jsx`                     |
| `pages/account`, `credit`, `loan`, `easyinvest` | `screens/Account.jsx`, `Credit.jsx`, `Loan.jsx`, `EasyInvest.jsx` |
| `pages/pix`, `payment`, `deposit`, `transfer`, `recharge`, `charge`, `refer`, `block` | `screens/Sheets.jsx` |

`pages/old_home` (a home antiga) e `pages/rewards` não são acessíveis pela home nova do app original e não foram portadas.
