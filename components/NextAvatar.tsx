// Modules
import React from 'react';
import Image from 'next/image';
import Blockies from 'react-blockies';

// UI
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  identicon: {
    width: '100% !important',
    height: '100% !important'
  }
}));

const NextAvatar = React.forwardRef((props: any, ref) => {
  const classes = useStyles();
  const { alt, className, src, placeholder, imageProps, data, ...other } = props;

  return (
    <Avatar className={className} ref={ref} {...other}>
      {
        src || !data || data?.blockAvatar === null ?
          <Image
            src={src ?? placeholder}
            alt={alt}
            className={imageProps ? imageProps : null}
            layout='fill'
            placeholder='blur'
          />
          :
          <Blockies
            seed={data?._id?.toLowerCase() || 'Portfolio'} /* the only required prop; determines how the image is generated */
            size={10} /* number of squares wide/tall the image will be; default = 15 */
            scale={7} /* width/height of each square in pixels; default = 4 */
            color={data?.blockAvatar?.color || '#dfe'} /* normal color; random by default */
            bgColor={data?.blockAvatar?.bgColor || '#ffe'} /* background color; random by default */
            spotColor={data?.blockAvatar?.spotColor || '#abc'} /* color of the more notable features; random by default */
            className={imageProps ? imageProps : classes.identicon} /* optional class name for the canvas element; 'identicon' by default */
          />
      }
    </Avatar>
  );
});

NextAvatar.displayName = 'NextAvatar';

export default NextAvatar;