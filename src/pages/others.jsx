import React, { useRef, useState } from 'react';
import { Page, BlockTitle, List, ListInput, Card, Block, f7} from 'framework7-react';
import { copyToClipboard } from '../js/helpers';

const AboutPage = () => {
  const maskRef = useRef(null);
  const charRef = useRef(null);

  const [generatedNumber, setGeneratedNumber] = useState(' ');

  const generateId = () => {
    let char = charRef.current.el.querySelector('input').value;
    let patt = maskRef.current.el.querySelector('input').value;

    char = char === '' ? '0123456789abcdef' : char;
    patt = patt === '' ? 'xxxxxxxxxx' : patt;

    setGeneratedNumber(f7.utils.id(patt, char))
  }

  return (
    <Page>
      <BlockTitle>Unique id generator</BlockTitle>
      <Card>
        <List>
          <ListInput ref={maskRef} className='col-40' outline label='Mask' placeholder='id-xxx-xxx-xx'/>
          <ListInput ref={charRef} className='col-40' outline label='Characters' placeholder='abc' />
          <li className='padding'>
            <button className='button button-fill' onClick={generateId}>Generate</button>
          </li>
        </List>
      </Card>
      <Card>
        <h1 className='toCopy text-align-center' onClick={(e) => copyToClipboard(generatedNumber)}>{generatedNumber}</h1>
      </Card>
      <Block>
        <p>
          Default mask is <strong>xxxxxxxxxx</strong>. In place of „x” generated characters will be used.
        </p>
        <p>
          Characters, which will be used for generation, default characters are: <strong>0123456789abcdef</strong>
        </p>
        <p>
          If you don't fill mask or characters box, then default values will be used.
        </p>
      </Block>
    </Page>
  )
};

export default AboutPage;
