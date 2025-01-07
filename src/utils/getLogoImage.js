import aws from '../assets/aws.png'
import docker from '../assets/docker.png'
import springboot from '../assets/springboot.png'
import react from '../assets/react.png'
import programming_language from '../assets/programming_language.png'


export function getLogoImage(logoId) {
  switch (logoId) {
    case 1: return react;
    case 2: return springboot;
    case 3: return aws;
    case 4: return docker;
    case 5: return programming_language;
    default: return null;
  }
}

