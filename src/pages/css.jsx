import React, { useRef, useEffect, useState } from 'react';
import { Page, Range, List, ListItem, Block, Button, Toggle, BlockTitle, ListInput, Icon, Segmented, Col, f7} from 'framework7-react';

import { copyToClipboard } from '../js/helpers';

const CatalogPage = () => {
  // shadow
  const cssShadowResultRef = useRef(null);
  const resultShadowBox = useRef(null);

  const cssShadowResult = {
    computed: 'box-shadow: 0 0 20px rgba(0,0,0,.5);',
    inset: false,
    h: 0,
    v: 0,
    blur: 20,
    spread: 0,
    color: 'rgba(0,0,0,.5)'
  }

  const refreshCssShadow = () => {
    cssShadowResult.computed = `box-shadow: ${cssShadowResult.inset ? 'inset ' : ''}${cssShadowResult.h === 0 ? '0' : cssShadowResult.h + 'px'} ${cssShadowResult.v === 0 ? '0' : cssShadowResult.v + 'px'} ${cssShadowResult.blur === 0 ? '0' : cssShadowResult.blur + 'px'} ${cssShadowResult.spread === 0 ? '' : cssShadowResult.spread + 'px '}${cssShadowResult.color};`;

    cssShadowResultRef.current.value = cssShadowResult.computed;
    resultShadowBox.current.style.boxShadow = cssShadowResult.computed.split(':')[1].trim().replace(';','');
  }

  // gradient
  const cssGradientResultRef = useRef(null);
  const resultGradientBox = useRef(null);
  const degRef = useRef(null);
  const degRangeRef = useRef(null);

  const [activeColors, setActiveColors] = useState([]);

  const [computedGradient, setComputedGradient] = useState('background: linear-gradient(300deg, rgba(51,115,183,1) 0%, rgba(51,183,176,1) 100%);')

  const [cssGradientResult, setCssGradientResult] = useState({
    type: 'linear',
    deg: 300,
    colors: [
      { id: 1, color: 'rgba(51,115,183,1)', range: 0 },
      { id: 2, color: 'rgba(51,183,176,1)', range: 100 }
    ]
  });

  const computeGradient = () => {
    let computed = `background: ${cssGradientResult.type}-gradient(${cssGradientResult.type === 'linear' ? cssGradientResult.deg + 'deg' : 'circle'}, `;

    cssGradientResult.colors.forEach(c => {
      computed += `${c.color} ${String(c.range).trim()}%, `;
    })

    setComputedGradient(computed.slice(0, -2) + ');');
  }

  const addColor = () => {
    const newColor = { id: f7.utils.id(), color: 'rgba(255,183,176,1)', range: 100 };
    setActiveColors(c => [...c, newColor]);
  }

  const removeColor = (id) => {
    setActiveColors(prev => prev.filter(c=>c.id!==id));
  }

  const pickColor = (cid) => {
    let {color} = activeColors.find(c => c.id === cid);
    const rgba = color.match(/^(?:rgba?)?[\s]?[\(]?[\s+]?(\d+)[(\s)|(,)]+[\s+]?(\d+)[(\s)|(,)]+[\s+]?(\d+)[(\s)|(,)]+[\s+]?([0-1]?(?:\.\d+)?)/);
    var colorPicker = f7.colorPicker.create({
      inputEl: `.cid-${cid}`,
      openIn: 'popover',
      targetElSetBackgroundColor: true,
      modules: ['initial-current-colors', 'sb-spectrum', 'rgb-sliders', 'alpha-slider', 'hex', ],
      openIn: 'popover',
      sliderValue: true,
      sliderValueEditable: true,
      sliderLabel: true,
      hexLabel: true,
      hexValueEditable: true,
      groupedModules: true,
      targetElSetBackgroundColor: true,
      value: { rgba: [parseInt(rgba[1]), parseInt(rgba[2]), parseInt(rgba[3]), parseFloat(rgba[4])] },
      formatValue (value) {
        setActiveColors(old => old.map(el => (
          el.id === cid ? { ...el, color: `rgba(${value.rgba.join(', ')})` } : el
        )))
      },
    });
    colorPicker.open()
    colorPicker.on('closed',()=>colorPicker.destroy())
  }

  useEffect(() => setActiveColors(cssGradientResult.colors), [])

  useEffect(() => computeGradient(),[cssGradientResult])

  useEffect(() => setCssGradientResult(prev => ({ ...prev, colors: activeColors})), [activeColors])

  return (
    <Page name="css">
      <BlockTitle>Box shadow</BlockTitle>
      <Block>
        <div className='container'>
          <div ref={resultShadowBox} className="container__box"></div>
          <List className='flex-shrink no-margin'>
            <li>
              <div className="item-content item-input item-input-outline">
                <div className="item-inner">
                  <div className="item-title item-label">Click to copy CSS</div>
                  <div className="item-input-wrap">
                    <input type="text" ref={cssShadowResultRef} readOnly onClick={(e) => copyToClipboard(e.target.value)}></input>
                  </div>
                </div>
              </div>
            </li>

            <li className='row'>
              <div className='col-50 large-25'>
                <ListInput
                  label="Horizontal"
                  input={false}
                  wrap={false}
                >
                  <Range slot="input" value={0} min={-50} max={50} step={1} onRangeChange={v => { cssShadowResult.h = parseInt(v);refreshCssShadow() } }/>
                </ListInput>
              </div>
              <div className='col-50 large-25'>
                <ListInput
                  label="Vertical"
                  input={false}
                  wrap={false}
                >
                  <Range slot="input" value={0} min={-50} max={50} step={1} onRangeChange={v => { cssShadowResult.v = parseInt(v);refreshCssShadow() } }/>
                </ListInput>
              </div>
              <div className='col-50 large-25'>
                <ListInput
                  label="Blur"
                  input={false}
                  wrap={false}
                >
                  <Range slot="input" value={20} min={0} max={100} step={1} onRangeChange={v => { cssShadowResult.blur = parseInt(v);refreshCssShadow() } }/>
                </ListInput>
              </div>
              <div className='col-50 large-25'>
                <ListInput
                  label="Spread"
                  input={false}
                  wrap={false}
                >
                  <Range slot="input" value={0} min={-50} max={50} step={1} onRangeChange={v => { cssShadowResult.spread = parseInt(v);refreshCssShadow() } }/>
                </ListInput>
              </div>
            </li>

            <ListInput
              label="Browse color"
              outline
              type="colorpicker"
              value={{ rgba: [0, 0, 0, 0.5] }}
              readonly
              colorPickerParams={{
                modules: ['initial-current-colors', 'sb-spectrum', 'rgb-sliders', 'alpha-slider', 'hex', ],
                openIn: 'popover',
                sliderValue: true,
                sliderValueEditable: true,
                sliderLabel: true,
                hexLabel: true,
                hexValueEditable: true,
                groupedModules: true,
                targetElSetBackgroundColor: true,
                targetEl: `.css-list-icon`,
                formatValue (value) {
                  cssShadowResult.color = `rgba(${value.rgba.join(', ')})`;
                  refreshCssShadow()
                  return `rgba(${value.rgba.join(', ')})`;
                },
              }}
            >
              <Icon icon="list-icon css-list-icon" slot="media" />
            </ListInput>

            <ListItem>
              <span>Inset</span>
              <Toggle onToggleChange={v => { cssShadowResult.inset = v;refreshCssShadow() }}></Toggle>
            </ListItem>

          </List>
        </div>
      </Block>

      <BlockTitle>Gradient</BlockTitle>
      <Block>
        <div className='container'>
          <div ref={resultGradientBox} className="container__box alpha" style={{background: `${computedGradient.split(':')[1].trim().replace(';', '')}`}}></div>
          <List className='flex-shrink no-margin no-hairlines'>
            <li>
              <div className="item-content item-input item-input-outline">
                <div className="item-inner">
                  <div className="item-title item-label">Click to copy CSS</div>
                  <div className="item-input-wrap">
                    <input ref={cssGradientResultRef} type="text" value={computedGradient} readOnly onClick={(e) => copyToClipboard(e.target.value)}></input>
                  </div>
                </div>
              </div>
            </li>
            <li className='row align-items-center margin-left'>


            </li>
            <li className='row padding'>
              <Col width="100" large="60" className='row'>
                <div className='col-100 large-40'>
                  <Segmented raised tag="p">
                  <Button active={cssGradientResult.type==='linear'} onClick={()=>setCssGradientResult(prev => ({ ...prev, type: cssGradientResult.type === 'linear' ? 'radial' : 'linear'}))}>Linear</Button>
                  <Button active={cssGradientResult.type==='radial'} onClick={()=>setCssGradientResult(prev => ({ ...prev, type: cssGradientResult.type === 'linear' ? 'radial' : 'linear'}))}>Radial</Button>
                </Segmented>
              </div>
              {cssGradientResult.type==='linear' && (
                <div className='col-100 large-60 display-flex justify-content-flex-end flex-direction-row'>
                  <ListInput
                    className='w200'
                    style={{width: '150px'}}
                    label="Degrees"
                    input={false}
                    wrap={false}
                  >
                    <Range ref={degRangeRef} scale={true} slot="input" value={cssGradientResult.deg} min={0} max={360} step={1} onRangeChange={v => { cssGradientResult.deg = parseInt(v);computeGradient() } }/>
                  </ListInput>
                  <div className='item-content item-input item-input-outline item-input-context w100'>
                    <div className="item-inner">
                      <div className="item-input-wrap">
                        <input ref={degRef} type="number" value={cssGradientResult.deg} onChange={e => { cssGradientResult.deg = parseInt(e.target.value); degRangeRef.current.f7Range().setValue(cssGradientResult.deg); computeGradient() } }/>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              </Col>
              <Col width="100" large="40" className='colorContainer'>
                {activeColors.map(c => (
                  <div className='display-flex align-items-center' key={c.id}>
                    <div onClick={() => pickColor(c.id)}>
                      <Icon icon={`list-icon color-icons no-margin margin-left cid-${c.id}`} style={{ backgroundColor: `${c.color}` }} slot="media" onClick={() => pickColor(c.id)}/>
                    </div>

                    <ListInput
                      className='w200'
                      style={{width: '150px'}}
                      input={false}
                      wrap={false}
                    >
                      <Range scale={true} slot="input" value={c.range} min={0} max={100} step={1} onRangeChange={v => { cssGradientResult.colors.find(color=>color.id===c.id).range = parseInt(v);computeGradient() } }/>
                    </ListInput>
                    <div><Button type='button' onClick={()=>removeColor(c.id)}>
                      <Icon aurora='f7:trash_circle_fill' color='red'/>
                    </Button></div>
                  </div>
                ))}

                <div className='row'>
                  <button className='button margin-left-half col-50 button-outline' onClick={addColor}>Add new color</button>
                </div>

              </Col>
            </li>
          </List>
        </div>
      </Block>
    </Page>
  );
}

export default CatalogPage;
