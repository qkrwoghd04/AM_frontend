import './css/LogoSelector.css';
import LogoItem from './LogoItem';
import { LogoList } from '../utils/constants';

const LogoSelector = ({ selectedLogoId, onLogoSelect }) => {
  return (
    <div className="LogoSelector">
      {LogoList.map((company) => (
        <LogoItem
          key={company.logoId}
          isSelected={company.logoId === selectedLogoId}
          onClick={() => onLogoSelect(company.logoId)}
          logoId={company.logoId}
        />
      ))}
    </div>
  );
};

export default LogoSelector;
