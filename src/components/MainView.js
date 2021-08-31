import biglogo from '../justbig.png';
import Image from 'react-bootstrap/Image'

export default function MainView() {
  return (
    <div>
      This is The Home Page<br/>
      <Image
                src={biglogo}
                width="400"
                height="120"
                alt="JUST logo big"
              />
    </div>
  )
}