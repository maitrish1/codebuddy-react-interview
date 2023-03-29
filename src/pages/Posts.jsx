import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { API_URL } from '../mocks/handlers';
import Fallback from '../Fallback';

// import FavoriteIcon from '@mui/icons-material/Favorite';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

function Posts() {
  const [loading, setloading] = useState(true);
  const [allPosts, setPosts] = useState([]);
  const fetchh = async () => {
    const temp = await fetch(`${API_URL}/posts`);
    const res = await temp.json();
    setPosts(res.data.posts);
    setloading(false);
    console.log(res);
    console.log(allPosts);
  };

  useEffect(() => {
    fetchh();
  }, [loading]);

  return loading ? (
    <Fallback />
  ) : (
    <Grid
      container
      width="100vw"
      display="flex"
      flexWrap="wrap"
      spacing={2}
      justifyContent="center"
    >
      {allPosts?.map(each => (
        <Grid item xl={3} lg={4} md={6} sm={12}>
          <Card sx={{ width: '300px' }}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" src={each.avatar} sx={{ width: 56, height: 56 }} />
              }
              title={`${each.firstName} ${each.lastName}`}
              subheader="September 14, 2016"
            />
            <CardMedia component="img" height="194" image={each.image} alt="Paella dish" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {each.writeup}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Posts;
