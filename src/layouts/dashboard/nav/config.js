// component
import SvgColor from '../../../components/svg-color';
import suitcase from './suitcase.png'
import transaction from './transaction.png';
import target from './target.png'
// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_user'),
  },
  {
    title: 'Transactions',
    path: '/dashboard/user',
    icon: <img src={transaction} alt='suitcase' style={{ width: '1.5rem', height: '1.5rem', opacity: '0.5' }} />
  },
  {
    title: 'Deep Analysis',
    path: '/dashboard/analysis',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Accounts',
    path: '/dashboard/accounts',
    icon: <img src={suitcase} alt='suitcase' style={{ width: '1.5rem', height: '1.5rem', opacity: '0.5' }} />
  },
  {
    title: 'Goals',
    path: '/dashboard/goals',
    icon: <img src={target} alt='target' style={{ width: '1.5rem', height: '1.5rem', opacity: '0.5' }} />
  }
];

export default navConfig;
