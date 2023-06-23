import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
const BootstrapTooltip = styled((props) => (
  <Tooltip {...props} arrow classes={{ popper: props.className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: '#410099',
    transition: '.8s',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: '0.9rem',
    fontWeight: 700,
    opacity: 1,
    color: '#fff',
    background: '#410099',
    textAlign: 'center',
    minHeight: '4em',
    maxWidth: '12em',
    padding: '1em',
    borderRadius: '0.5em',
    cursor: 'pointer',
    transition: 'opacity 1.5s',
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
}));
export default function CustomizedTooltips({
  title,
  placement,
  children,
  open,
}) {
  return (
    <div>
      <BootstrapTooltip
        PopperProps={{
          disablePortal: true,
        }}
        sx={{ p: '0', m: '0' }}
        title={title}
        placement={placement}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        TransitionComponent={Zoom}
        TransitionProps={{ timeout: 600 }}
      >
        {React.cloneElement(children, { ...children.props })}
      </BootstrapTooltip>
    </div>
  );
}
