export const sliderStyle = {
  padding: '12px 0',
  '& .MuiSlider-thumb': {
    width: '12px',
    height: '12px',
    visibility: 'hidden',
    boxShadow: 'none !important',
    backgroundColor: '#fff',
    transition: 'none !important',

    // },
  },
  '& .MuiSlider-rail': {
    height: '3px',
    transition: 'none !important',
    color: 'transparent !important',
    background: 'hsla(0,0%,100%,0.3)',
    borderRadius: '999px',
    opacity: '1',
  },
  '& .MuiSlider-track': {
    height: '3px',
    backgroundColor: '#fff',
    color: 'transparent !important',
    boxShadow: 'none !important',
    borderRadius: '999px',
    transition: 'none !important',
  },
  '&:hover': {
    '& .MuiSlider-thumb': {
      visibility: 'visible',
    },
    '& .MuiSlider-rail': {
      height: '5px',
    },
    '& .MuiSlider-track': {
      height: '5px',
    },
  },
};
