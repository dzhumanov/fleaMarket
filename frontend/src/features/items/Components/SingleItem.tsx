import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Item } from "../../../types";

interface Props {
  item: Item;
}

const SingleItem: React.FC<Props> = ({ item }) => (
  <Card sx={{ maxWidth: 270, width: "100%", mb: "15px" }}>
    <CardMedia
      component="img"
      height="140"
      image="/path/to/your/image.jpg"
      alt="Your Image"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {item.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {item.price} SOM
      </Typography>
    </CardContent>
  </Card>
);
export default SingleItem;
