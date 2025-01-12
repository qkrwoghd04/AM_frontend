import aws from '../assets/aws.png'
import carrot from '../assets/carrot.png'
import woowa from '../assets/woowa.png'
import toss from '../assets/toss.png'
import infcon from '../assets/infcon.png'


export function getLogoImage(logoId) {
  switch (logoId) {
    case 1: return toss;
    case 2: return woowa;
    case 3: return aws;
    case 4: return carrot;
    case 5: return infcon;
    default: return null;
  }
}

