// ** MUI Imports
import Divider from '@mui/material/Divider'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Styled Components
const ListSubheader = styled('li')(({ theme }) => ({
  lineHeight: 1,
  display: 'flex',
  position: 'relative',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  backgroundColor: 'transparent',
  transition: 'padding-left .25s ease-in-out'
}));

const TypographyHeaderText = styled(Typography)(({ theme }) => ({
  fontSize: '13px',
  lineHeight: 'normal',
  letterSpacing: '0.21px',
  textTransform: 'uppercase',
  color: theme.palette.text.disabled,
  fontWeight: theme.typography.fontWeightMedium
}));

const CartListSection = ({ children }) => {
  // ** Hook
  const theme = useTheme();

  return (
    <ListSubheader
      className='nav-section-title'
      sx={{
        px: 0,
        py: 0,
        color: theme.palette.text.disabled,
        '& .MuiDivider-root:before, & .MuiDivider-root:after, & hr': {
          borderColor: `rgba(${theme.palette.customColors.main}, 0.12)`
        }
      }}
    >
      <Divider
        textAlign='left'
        sx={{
          m: 0,
          width: '100%',
          lineHeight: 'normal',
          textTransform: 'uppercase',
          '&:before, &:after': { top: 7, transform: 'none' },
          '&:before':{width: '1%'},
          '& .MuiDivider-wrapper': { px: 2.5, fontSize: '0.75rem', letterSpacing: '0.21px' }
        }}
      >
        <TypographyHeaderText noWrap>{children}</TypographyHeaderText>
      </Divider>
    </ListSubheader>
  );
};

export default CartListSection;
