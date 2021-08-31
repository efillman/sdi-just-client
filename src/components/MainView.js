import biglogo from '../justpurplebig.png';
import Image from 'react-bootstrap/Image'

export default function MainView() {
  return (
    <div>
      This is The Home Page<br/>
      <Image
                src={biglogo}
                width="600"
                height="140"
                alt="JUST logo big"
              />
    </div>
  )
}