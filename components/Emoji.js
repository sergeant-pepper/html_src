import React from 'react';
import { Twemoji } from 'react-emoji-render';

window._sneezed = 0;

const Emoji = ({name, path, alt, svg}) => {
  console.log('Emoji:' + window._sneezed);
  if(window._sneezed < 2) {
    window._sneezed++;
    return (<Twemoji className={'responsive-emoji'} svg={true} text={'🤧'} />);
  } else {
    return name ? (<Twemoji className={'responsive-emoji'} svg={!!svg} text={name} />) : (<img className={'responsive-img'} src={path} alt={alt} />);
  }
};

export default Emoji;