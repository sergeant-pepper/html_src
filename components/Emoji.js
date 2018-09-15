import React from 'react';
import { Twemoji } from 'react-emoji-render';

const Emoji = ({name, path, alt, svg}) => {
  return name ? (<Twemoji className={'responsive-emoji'} svg={!!svg} text={name} />) : (<img className={'responsive-img'} src={path} alt={alt} />);
};

export default Emoji;