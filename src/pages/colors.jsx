import React, { useRef } from 'react';
import {
  Page,
  List,
  f7,
  ListInput,
  Icon
} from 'framework7-react';

import { copyToClipboard } from '../js/helpers';

const Colors = () => {
  const colorRGBA = useRef(null);
  const colorHSLA = useRef(null);
  const colorHEX = useRef(null);
  const colorHSB = useRef(null);

  const tintButton = useRef(null);
  const shadeButton = useRef(null);

  return (
    <Page className='' name="colors">
      <List>
        <ListInput
          label="Browse color"
          outline
          type="colorpicker"
          value={{ hex: '#3373b7' }}
          readonly
          colorPickerParams={{
            modules: ['initial-current-colors', 'sb-spectrum', 'hsb-sliders', 'rgb-sliders', 'alpha-slider', 'hex', 'palette'],
            openIn: 'popover',
            sliderValue: true,
            sliderValueEditable: true,
            sliderLabel: true,
            hexLabel: true,
            hexValueEditable: true,
            groupedModules: true,
            palette: [
              ['#FFEBEE', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350', '#F44336', '#E53935', '#D32F2F', '#C62828', '#B71C1C'],
              ['#F3E5F5', '#E1BEE7', '#CE93D8', '#BA68C8', '#AB47BC', '#9C27B0', '#8E24AA', '#7B1FA2', '#6A1B9A', '#4A148C'],
              ['#E8EAF6', '#C5CAE9', '#9FA8DA', '#7986CB', '#5C6BC0', '#3F51B5', '#3949AB', '#303F9F', '#283593', '#1A237E'],
              ['#E1F5FE', '#B3E5FC', '#81D4FA', '#4FC3F7', '#29B6F6', '#03A9F4', '#039BE5', '#0288D1', '#0277BD', '#01579B'],
              ['#E0F2F1', '#B2DFDB', '#80CBC4', '#4DB6AC', '#26A69A', '#009688', '#00897B', '#00796B', '#00695C', '#004D40'],
              ['#F1F8E9', '#DCEDC8', '#C5E1A5', '#AED581', '#9CCC65', '#8BC34A', '#7CB342', '#689F38', '#558B2F', '#33691E'],
              ['#FFFDE7', '#FFF9C4', '#FFF59D', '#FFF176', '#FFEE58', '#FFEB3B', '#FDD835', '#FBC02D', '#F9A825', '#F57F17'],
              ['#FFF3E0', '#FFE0B2', '#FFCC80', '#FFB74D', '#FFA726', '#FF9800', '#FB8C00', '#F57C00', '#EF6C00', '#E65100'],
            ],
            targetElSetBackgroundColor: true,
            targetEl: `.colors-list-icon`,
            formatValue (value) {
              colorHEX.current.defaultValue = value.hex;
              colorRGBA.current.defaultValue = `rgba(${value.rgba.join(', ')})`;
              colorHSLA.current.defaultValue = `hsla(${value.hsla[0]}, ${value.hsla[1] * 1000 / 10}%, ${value.hsla[2] * 1000 / 10}%, ${value.hsla[3]})`
              colorHSB.current.defaultValue = `hsb(${value.hsb[0]}, ${value.hsb[1] * 1000 / 10}%, ${value.hsb[2] * 1000 / 10}%)`

              const theme = f7.utils.colorThemeCSSProperties(value.hex);

              tintButton.current.style.backgroundColor = `${theme['--f7-theme-color-tint']}`;
              shadeButton.current.style.backgroundColor = `${theme['--f7-theme-color-shade']}`;
              tintButton.current.dataset.color = `${theme['--f7-theme-color-tint']}`;
              shadeButton.current.dataset.color = `${theme['--f7-theme-color-shade']}`;

              //textAreaContent.current.el.innerText = value.rgba;
              return `rgba(${value.rgba.join(', ')})`;
            },
          }}
        >
          <Icon icon="list-icon colors-list-icon" slot="media" />
        </ListInput>

        <li className='row margin-left '>
          <div className='item-content item-input item-input-outline item-input-context col-25'>
            <div className="item-inner col-25">
              <div className="item-title item-label">HEX</div>
              <div className="item-input-wrap">
                <input ref={colorHEX} type="text" readOnly onClick={(e) => copyToClipboard(e.target.value)}/>
              </div>
            </div>
          </div>

          <div className='item-content item-input item-input-outline item-input-context col-25'>
            <div className="item-inner col-25">
              <div className="item-title item-label">RGBA</div>
              <div className="item-input-wrap">
                <input ref={colorRGBA} type="text" readOnly onClick={(e) => copyToClipboard(e.target.value)}/>
              </div>
            </div>
          </div>

          <div className='item-content item-input item-input-outline item-input-context col-25'>
            <div className="item-inner col-25">
              <div className="item-title item-label">HSLA</div>
              <div className="item-input-wrap">
                <input ref={colorHSLA} type="text" readOnly onClick={(e) => copyToClipboard(e.target.value)}/>
              </div>
            </div>
          </div>

          <div className='item-content item-input item-input-outline item-input-context col-25'>
            <div className="item-inner col-25">
              <div className="item-title item-label">HSB</div>
              <div className="item-input-wrap">
                <input ref={colorHSB} type="text" readOnly onClick={(e) => copyToClipboard(e.target.value)}/>
              </div>
            </div>
          </div>
        </li>

      </List>

      <List className='row padding'>
        <div className='col-100'>
          Click buttons to copy HEX values for tint and shade color.
        </div>
        <button ref={tintButton} className="button col button-fill" onClick={(e) => copyToClipboard(e.target.dataset.color)}>Tint</button>
        <button ref={shadeButton} className="button col button-fill" onClick={(e) => copyToClipboard(e.target.dataset.color)}>Shade</button>
      </List>

    </Page>
  );
}
export default Colors;