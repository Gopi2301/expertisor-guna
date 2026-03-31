import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

interface CardProps {
    title: string;
    cta: string;
    highlightWord: string;

}

export default function BasicCard({title, cta, highlightWord}: CardProps) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        {/* <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          {title}
        </Typography> */}
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{highlightWord}</Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{cta}</Button>
      </CardActions>
    </Card>
  );
}
